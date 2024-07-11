package com.ssafy.minuet.newsDislike.service;

import com.ssafy.minuet.bookMark.entity.BookMark;
import com.ssafy.minuet.bookMark.repository.BookMarkRepository;
import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.news.reposiroty.NewsRepository;
import com.ssafy.minuet.newsDislike.dto.NewsDislikeRequestDto;
import com.ssafy.minuet.newsDislike.dto.NewsDislikeResponseDto;
import com.ssafy.minuet.newsDislike.entity.NewsDislike;
import com.ssafy.minuet.newsDislike.repository.NewsDislikeRepository;
import com.ssafy.minuet.newsLike.dto.NewsLikeReponseDto;
import com.ssafy.minuet.newsLike.entity.NewsLike;
import com.ssafy.minuet.newsLike.repository.NewsLikeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class NewsDislikeServiceImpl implements NewsDislikeService{

    private final NewsDislikeRepository newsDislikeRepository;
    private final MemberRepository memberRepository;
    private final NewsRepository newsRepository;

    private final NewsLikeRepository newsLikeRepository;
    private final BookMarkRepository bookMarkRepository;

    //===========싫어요 추가==========//
    @Transactional
    @Override
    public void addDislike(NewsDislikeRequestDto.reqDislikeDto reqDto) {
        log.info("[NewsDislikeServiceImpl.addDislike] start...");

        //연관된 member, news찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsDislikeServiceImpl.addDislike] 해당 Id와 일치하는 member가 존재하지 않습니다."));

        News news = newsRepository.findById(reqDto.getNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsDislikeServiceImpl.addDislike] 해당 Id와 일치하는 news가 존재하지 않습니다."));

        //이미 존재하면 추가x
        if(newsDislikeRepository.findByMemberAndNews(member, news).isPresent())
            throw new IllegalArgumentException("이미 존재하는 싫어요입니다. ");
        //dislike생성
        NewsDislike dislike = NewsDislike.builder()
                .news(news)
                .build();

        //member에 dislikelist추가
        member.addDislikeList(dislike);

        //newsDislike저장
        newsDislikeRepository.save(dislike);

        //news가 싫어요 된 횟수 감소
        news.plusDislikeCount();

        //좋아요에 있으면 함께 삭제
        if(newsLikeRepository.findByMemberAndNews(member, news).isPresent()){
            NewsLike newsLike = newsLikeRepository.findByMemberAndNews(member, news)
                    .orElseThrow(() -> new IllegalArgumentException("[NewsDislikeServiceImpl.addDislike] 해당 newslike없음"));

            //삭제
            member.deleteNewsLike(newsLike);
            newsLikeRepository.delete(newsLike);
        }

        //북마크에 있으면 함께 삭제
        if(bookMarkRepository.findByMemberAndNews(member, news).isPresent()){
            BookMark bookMark = bookMarkRepository.findByMemberAndNews(member, news)
                    .orElseThrow(() -> new IllegalArgumentException("[NewsDislikeServiceImpl.addDislike] 해당 bookmark없음"));

            member.deleteBookMarkList(bookMark);
            bookMarkRepository.delete(bookMark);
        }

        log.info("[NewsDislikeServiceImpl.addDislike] end...");
    }

    //=======싫어요 삭제==========//
    @Transactional
    @Override
    public void deleteDislike(NewsDislikeRequestDto.reqDislikeDto reqDislikeDto) {
        log.info("[NewsDislikeServiceImpl.deleteDislike] start...");

        //count값들을 지우기 위해 연관된 news, member 찾기
        News news = newsRepository.findById(reqDislikeDto.getNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsDislikeServiceImpl.deleteDislike] 해당 Id와 일치하는 news 이 존재하지 않습니다."));

        Member member = memberRepository.findById(reqDislikeDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsDislikeServiceImpl.deleteDislike] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        //해당 dislike찾기
        NewsDislike newsDislike = newsDislikeRepository.findByMemberAndNews(member, news)
                .orElseThrow(()-> new IllegalArgumentException("[NewsDislikeServiceImpl.deleteDislike] 해당 Id와 일치하는 newsDislike 이 존재하지 않습니다."));

        //member의 list에서 삭제
        member.deleteNewsDislike(newsDislike);

        //dislike삭제
        newsDislikeRepository.delete(newsDislike);

        //news의 dislike횟수 감소
        news.minusDislikeCount();

        log.info("[NewsDislikeServiceImpl.deleteDislike] end...");
    }

    //==========뉴스 조회시 하트 유무를 표시하기 위한 dislike list 조회//
    @Override
    public List<NewsDislikeResponseDto.list> dislikeList(Long memberId) {
        log.info("[NewsDislikeServiceImpl.dislikeList] start...");

        //member찾기
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()-> new IllegalArgumentException("[NewsDislikeServiceImpl.dislikeList] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        //member의 dislike목록 찾기
        List<NewsDislike> newsLikeList = member.getDislikeList();

        //to Dto
        List<NewsDislikeResponseDto.list> list = new ArrayList<>();

        for(NewsDislike newsDisLike : newsLikeList){
            list.add(NewsDislikeResponseDto.list.builder()
                    .id(newsDisLike.getId())
                    .newsId(newsDisLike.getNews().getId())
                    .build());
        }
        log.info("[NewsDislikeServiceImpl.dislikeList] end...");
        return list;
    }

}
