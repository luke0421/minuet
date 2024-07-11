package com.ssafy.minuet.bookMark.service;

import com.ssafy.minuet.bookMark.dto.BookMarkRequestDto;
import com.ssafy.minuet.bookMark.dto.BookMarkResponseDto;
import com.ssafy.minuet.bookMark.entity.AllBookMark;
import com.ssafy.minuet.bookMark.entity.BookMark;
import com.ssafy.minuet.bookMark.repository.AllBookMarkRepository;
import com.ssafy.minuet.bookMark.repository.BookMarkRepository;
import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.news.dto.NewsResponseDto;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.news.reposiroty.NewsRepository;
import com.ssafy.minuet.regionBookMark.entity.RegionBookMark;
import com.ssafy.minuet.regionNews.entity.Region;
import com.ssafy.minuet.regionNews.entity.RegionNews;
import com.ssafy.minuet.userPick.entity.UserPick;
import com.ssafy.minuet.userPick.repository.UserPickRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class BookMarkServiceImpl implements BookMarkService{

    private final BookMarkRepository bookMarkRepository;
    private final MemberRepository memberRepository;
    private final NewsRepository newsRepository;

    private final AllBookMarkRepository allBookMarkRepository;
    private final UserPickRepository userPickRepository;
    //===========bookmark추가==========//
    @Transactional
    @Override
    public void addBookMark(BookMarkRequestDto.addBookMark reqDto) {
        log.info("[BookMarkServiceImpl.addBookMark] start...");

        //해당 member와 news entity 찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[BookMarkServiceImpl.addBookMark] 해당 Id와 일치하는 member가 존재하지 않습니다."));

        News news = newsRepository.findById(reqDto.getNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[BookMarkServiceImpl.addBookMark] 해당 Id와 일치하는 news가 존재하지 않습니다."));

        //이미 존재하는 북마크이면 추가x
        if(bookMarkRepository.findByMemberAndNews(member, news).isPresent())
            throw new IllegalArgumentException("이미 존재하는 북마크입니다.");
        //bookmark 생성
        BookMark bookmark = BookMark.builder()
                                .news(news)
                                .build();

        //member의 bookmarkList 에 bookmark 추가
        member.addBookMarkList(bookmark);

        //bookmark저장
        bookMarkRepository.save(bookmark);

        //news가 bookmark된 횟수 증가시키기
        news.plusBookMark();

        //========통계(user's pick)을 위해 북마크(좋아요)값 추가

        //있는 값이면 수만 증가
        if(userPickRepository.findByAgeAndNewsId(member.getAge(), news.getId()).isPresent()){
            UserPick userPick = userPickRepository.findByAgeAndNewsId(member.getAge(), news.getId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 좋아요입니다."));

            userPick.plusCount();

            userPickRepository.save(userPick);
        }
        //없는 값이면 새로 생성
        else{
            UserPick userPick = UserPick.builder()
                    .newsId(news.getId())
                    .age(member.getAge())
                    .count(1)
                    .build();

            userPickRepository.save(userPick);
        }

        log.info("[BookMarkServiceImpl.addBookMark] end...");
    }

    //==========bookmark 삭제==========//
    @Transactional
    @Override
    public void deleteBookmark(BookMarkRequestDto.addBookMark reqDto) {
        log.info("[BookMarkServiceImpl.deleteBookmark] start...");

        //news 탐색
        News news = newsRepository.findById(reqDto.getNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[BookMarkServiceImpl.deleteBookmark] 해당 Id와 일치하는 news 이 존재하지 않습니다."));

        //member찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[BookMarkServiceImpl.deleteBookmark] 해당 Id와 일치하는 member 이 존재하지 않습니다."));


        //news가 bookmark된 횟수 감소시키기 위해 news찾기
        BookMark bookMark = bookMarkRepository.findByMemberAndNews(member, news)
                .orElseThrow(()-> new IllegalArgumentException("[BookMarkServiceImpl.deleteBookmark] 해당 Id와 일치하는 bookmark 이 존재하지 않습니다."));

        //member의 list에서 bookmark 삭제
        member.deleteBookMarkList(bookMark);

        //bookmark삭제
        bookMarkRepository.delete(bookMark);

        //news가 bookmark된 횟수 감소시키기
        news.minusBookMark();

        //=======통계(user's pick)을 위해 북마크(좋아요) 삭제=======//
        UserPick userPick = userPickRepository.findByAgeAndNewsId(member.getAge(), news.getId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 좋아요입니다."));

        //0이 되면 삭제
        if(userPick.getCount() <= 1){
            userPickRepository.delete(userPick);
        }
        //아니면 걍 감소
        else{
            userPick.minusCount();

            userPickRepository.save(userPick);
        }


        log.info("[BookMarkServiceImpl.deleteBookmark] end...");
    }

    //===========북마크 조회==========//
    @Override
    public BookMarkResponseDto.myBookmark bookMarkList(BookMarkRequestDto.list reqDto) {
        log.info("[BookMarkServiceImpl.bookMarkList] start...");

        //해당 member찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[BookMarkServiceImpl.bookMarkList] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        Pageable pageable = PageRequest.of(reqDto.getPageNo(), 15, Sort.by(Sort.Direction.DESC, "id"));

        //bookmark에서 조회
        Page<AllBookMark> bookMarkList = allBookMarkRepository.findByMember(member, pageable);
        //to dto
        BookMarkResponseDto.myBookmark list = BookMarkResponseDto.myBookmark.builder()
                .totalPage(bookMarkList.getTotalPages())
                .totalLength(member.getBookMarkList().size())
                .build();

        for(AllBookMark allbookMark : bookMarkList){

            if(allbookMark instanceof BookMark){
                BookMark bookMark = (BookMark) allbookMark;

                list.getBookmarks().add(BookMarkResponseDto.toListDto(bookMark));
            }
            else if(allbookMark instanceof RegionBookMark){
                RegionBookMark bookMark = (RegionBookMark) allbookMark;

                list.getBookmarks().add(BookMarkResponseDto.toListDto(bookMark));
            }

        }

        log.info("[BookMarkServiceImpl.bookMarkList] end...");
        return list;
    }


}
