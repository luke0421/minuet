package com.ssafy.minuet.news.service;

import com.ssafy.minuet.bookMark.repository.BookMarkRepository;
import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.news.dto.NewsRequestDto;
import com.ssafy.minuet.news.dto.NewsResponseDto;
import com.ssafy.minuet.news.entity.Category;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.news.reposiroty.CategoryRepository;
import com.ssafy.minuet.news.reposiroty.NewsRepository;
import com.ssafy.minuet.newsDislike.repository.NewsDislikeRepository;
import com.ssafy.minuet.newsLike.repository.NewsLikeRepository;
import com.ssafy.minuet.preSearch.entity.PreSearch;
import com.ssafy.minuet.preSearch.repository.PreSearchRepository;
import com.ssafy.minuet.regionNews.entity.RegionNews;
import com.ssafy.minuet.regionNews.repository.RegionNewsRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class NewsServiceImpl implements NewsService{

    private final NewsRepository newsRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;

    private final NewsLikeRepository newsLikeRepository;
    private final NewsDislikeRepository newsDislikeRepository;
    private final BookMarkRepository bookMarkRepository;

    private final RegionNewsRepository regionNewsRepository;
    private final PreSearchRepository preSearchRepository;

    @Override
    public List<NewsResponseDto.newsList> userPickNews(NewsRequestDto.userPickNews reqDto) {
        return null;
    }

    //============카테고리 뉴스 조회============//
    @Override
    public NewsResponseDto.newsListWithTotalPage categoryNews(NewsRequestDto.categoryNews reqDto) {
        log.info("[NewsServiceImpl.categoryNews] start...");

        System.out.println(reqDto.getCategory());
        //카테고리 찾기
        Category category = categoryRepository.findByCategoryName(reqDto.getCategory())
                .orElseThrow(()-> new IllegalArgumentException("[NewsServiceImpl.categoryNews] 해당 Id와 일치하는 category 이 존재하지 않습니다."));

        //10개 단위로 페이징을 위해 pageable생성
        //pageNo, 10개 단위, 최신순을 위해 id기준으로 내림차순
        Pageable pageable = PageRequest.of(reqDto.getPageNo(), 10, Sort.by(Sort.Direction.DESC, "id"));

        //news찾기
   //     Page<News> categoryNews = newsRepository.findAllByCategory(category, pageable);
        Page<News> categoryNews = newsRepository.findAll(reqDto.getMemberId(), category, pageable);

        //to Dto
        NewsResponseDto.newsListWithTotalPage newsListWithTotalPage = NewsResponseDto.newsListWithTotalPage.builder()
                .totalPage(categoryNews.getTotalPages())
                .build();

        //List<NewsResponseDto.newsList> list = new ArrayList<>();
        for(News n : categoryNews){
            newsListWithTotalPage.getNewsLists().add(NewsResponseDto.toNewsDto(n));
        }



        log.info("[NewsServiceImpl.categoryNews] end...");
        return newsListWithTotalPage;
    }

    //============기사 검색========//
    @Override
    public NewsResponseDto.newsListWithTotalPage searchNews(NewsRequestDto.searchNews reqDto) {
        log.info("[NewsServiceImpl.searchNews] start...");

        //10개 단위로 페이징을 위해 pageable생성
        //pageNo, 10개 단위, 최신순을 위해 id기준으로 내림차순
        Pageable pageable = PageRequest.of(reqDto.getPageNo(), 10, Sort.by(Sort.Direction.DESC, "id"));

        //내용이나 제목에 word가 있는 기사 검색
        //List<News> newsList = newsRepository.findByTitleContainingOrContentContaining(reqDto.getWord(), reqDto.getWord());
        Page<News> newsList = newsRepository.findByTitleContainingOrContentContaining(reqDto.getWord(), reqDto.getWord(), pageable);

        //new to dto
        NewsResponseDto.newsListWithTotalPage list = NewsResponseDto.newsListWithTotalPage.builder()
                .totalPage(newsList.getTotalPages())
                .build();

        for(News n : newsList){
            list.getNewsLists().add(NewsResponseDto.toNewsDto(n));
        }

        log.info("[NewsServiceImpl.searchNews] end...");
        return list;
    }

    //기사의 좋아요, 북마크 여부
    @Override
    public NewsResponseDto.detail getDetail(NewsRequestDto.detail reqDto) {

        //member찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsServiceImpl.getDetail] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        //news찾기
        News news = newsRepository.findById(reqDto.getNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsServiceImpl.getDetail] 해당 Id와 일치하는 news 이 존재하지 않습니다."));

        //있는지 여부 확인
        boolean isLike = newsLikeRepository.findByMemberAndNews(member, news).isPresent();
        boolean isDislike = newsDislikeRepository.findByMemberAndNews(member, news).isPresent();
        boolean isBookmark = bookMarkRepository.findByMemberAndNews(member, news).isPresent();

        int likeCount = news.getLikeCount();

        NewsResponseDto.detail detail = NewsResponseDto.detail.builder()
                .like(isLike)
                .dislike(isDislike)
                .bookmark(isBookmark)
                .newsLikeCount(likeCount)
                .build();

        return detail;
    }

    //기사 + 지역뉴스에서 word가 있는 기사 검색
    @Transactional
    @Override
    public NewsResponseDto.searchNewsWithTotalPage searchTotalNews(NewsRequestDto.searchNews reqDto) {
        log.info("[NewsServiceImpl.searchTotalNews] start...");

        //=======검색어 저장(없는 단어만 저장)
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("[PreSearchServiceImpl.searchTotalNews] 해당 member가 없습니다."));

        //존재하지 않으면 추가
        if(!preSearchRepository.findByMemberAndWord(member, reqDto.getWord()).isPresent()){
            PreSearch preSearch = PreSearch.builder()
                    .word(reqDto.getWord())
                    .build();

            //10개 이상이면 하나 지우고 하기
            if(member.getPreSearches().size() >= 10){
                PreSearch erase = member.getPreSearches().get(0);

                preSearchRepository.delete(erase);
                member.getPreSearches().remove(0);
            }

            member.addPreSearch(preSearch);

            preSearchRepository.save(preSearch);
        }

        //존재하는 단어면 순서만 바꾸기
        else{
            PreSearch preSearch = preSearchRepository.findByMemberAndWord(member, reqDto.getWord())
                    .orElseThrow(() -> new IllegalArgumentException(""));

            preSearchRepository.delete(preSearch);
            member.getPreSearches().remove(preSearch);
            preSearch.setMember(null);

            PreSearch newPre = PreSearch.builder()
                                .word(preSearch.getWord())
                                .build();

            member.addPreSearch(newPre);
            preSearchRepository.save(newPre);


        }
        //======검색어 저장 end======//


        //10개 단위로 페이징을 위해 pageable생성
        //pageNo, 5개 단위, 최신순을 위해 id기준으로 내림차순
        Pageable pageable = PageRequest.of(reqDto.getPageNo(), 5, Sort.by(Sort.Direction.DESC, "id"));

        //내용이나 제목에 word가 있는 기사 검색
        Page<News> newsList = newsRepository.findByTitleContainingOrContentContaining(reqDto.getWord(), reqDto.getWord(), pageable);

        //지역 뉴스 검색
        Page<RegionNews> regionNews = regionNewsRepository.findByTitleContainingOrContentContaining(reqDto.getWord(), reqDto.getWord(), pageable);

        //2개 뉴스 합하기
        //존재하는 페이지보다 초과하는 페이지이면 마지막 페이지를 출력함
        // -> 뉴스의 페이지 수 보다 pageNo이 크면 돌려주지 말기

        //페이지 수 최댓값
        int totalPage = newsList.getTotalPages() > regionNews.getTotalPages() ? newsList.getTotalPages() : regionNews.getTotalPages();

        //new to dto
        NewsResponseDto.searchNewsWithTotalPage list = NewsResponseDto.searchNewsWithTotalPage.builder()
                .totalPage(totalPage)
                .build();

        //news넣기
        if(newsList.getTotalPages() > reqDto.getPageNo()){
            for(News n : newsList){
                list.getNewsLists().add(NewsResponseDto.toSearchNewsDto(n));
            }
        }

        //지역 뉴스 넣기
        if(regionNews.getTotalPages() > reqDto.getPageNo()){
            for(RegionNews region : regionNews){
                list.getNewsLists().add(NewsResponseDto.toSearchNewsDto(region));
            }
        }

        log.info("[NewsServiceImpl.searchTotalNews] end...");
        return list;
    }

    //해당 날짜 이후의 뉴스 불러오기
    @Override
    public NewsResponseDto.operaList getPeriodList(NewsRequestDto.operaList reqDto) {
        //오늘 기준 day이전 날짜 계산
        LocalDate today = LocalDate.now();

        LocalDate day = today.minusDays(reqDto.getDay());
        //System.out.println(day);

        //해당 날짜의 뉴스 20개 불러오기(좋아요 순)
        List<News> newsList = newsRepository.findByPublishDate(day);

        NewsResponseDto.operaList list = new NewsResponseDto.operaList();

        for(News news : newsList){
            list.getList().add(NewsResponseDto.operaNews.builder()
                    .title(news.getTitle())
                    .content(news.getContent())
                    .build());
        }

        return list;
    }

    //해당 날짜 이후의 word가 들어간 기사 검색
    @Override
    public NewsResponseDto.operaList getPeriodWordList(NewsRequestDto.operaSearchList reqDto) {
        //오늘 기준 day계산
        LocalDate today = LocalDate.now();

        LocalDate day = today.minusDays(reqDto.getDay());

        //해당 날짜 해당 검색어의 뉴스 10개 불러오기(최신순)
        List<News> newsList = newsRepository.findByPublishDateAfterAndTitleContainingOrContentContaining(day, reqDto.getWord(), reqDto.getWord());

        NewsResponseDto.operaList list = new NewsResponseDto.operaList();

        int count = 0;
        for(News news : newsList){
            list.getList().add(NewsResponseDto.operaNews.builder()
                    .title(news.getTitle())
                    .content(news.getContent())
                    .build());
            count++;

            if(count >= 10) break;
        }

        return list;
    }
}
