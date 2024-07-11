package com.ssafy.minuet.newsLike.service;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.news.reposiroty.NewsRepository;
import com.ssafy.minuet.newsLike.dto.NewsLikeReponseDto;
import com.ssafy.minuet.newsLike.dto.NewsLikeRequestDto;
import com.ssafy.minuet.newsLike.entity.NewsLike;
import com.ssafy.minuet.newsLike.repository.NewsLikeRepository;
import com.ssafy.minuet.userPick.entity.Age;
import com.ssafy.minuet.userPick.entity.UserPick;
import com.ssafy.minuet.userPick.repository.UserPickRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class NewsLikeServiceImpl implements NewsLikeService{

    private final NewsLikeRepository newsLikeRepository;
    private final MemberRepository memberRepository;
    private final NewsRepository newsRepository;

    private final UserPickRepository userPickRepository;

    //===========좋아요 추가===========//
    @Transactional
    @Override
    public void addLike(NewsLikeRequestDto.reqLikeDto reqDto) {
        log.info("[NewsLikeServiceImpl.addLike] start...");

        //연관시킬 member, news찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsLikeServiceImpl.addLike] 해당 Id와 일치하는 member가 존재하지 않습니다."));

        News news = newsRepository.findById(reqDto.getNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsLikeServiceImpl.addLike] 해당 Id와 일치하는 news가 존재하지 않습니다."));

        //이미 존재하면 추가x
        if(newsLikeRepository.findByMemberAndNews(member, news).isPresent())
            throw new IllegalArgumentException("이미 존재하는 좋아요입니다.");

        //newslike생성
        NewsLike newsLike = NewsLike.builder()
                .news(news)
                .build();

        //member에 likelist추가
        member.addLikeList(newsLike);

        //newsLike 저장
        newsLikeRepository.save(newsLike);

        //news의 좋아요 수 증가
        news.plusLikeCount();

        //=======통계(user's pick)를 위해 mongodb 내 값 추가======//

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
        log.info("[NewsLikeServiceImpl.addLike] end...");
    }

    //=======좋아요 삭제===========//
    @Transactional
    @Override
    public void deleteLike(NewsLikeRequestDto.reqLikeDto reqLikeDto) {
        log.info("[NewsLikeServiceImpl.deleteLike] start...");

        //count수 감소를 위해 news, member찾기
        News news = newsRepository.findById(reqLikeDto.getNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsLikeServiceImpl.deleteLike] 해당 Id와 일치하는 news 이 존재하지 않습니다."));

        Member member = memberRepository.findById(reqLikeDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsLikeServiceImpl.deleteLike] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        //newsLike찾기
        NewsLike newsLike = newsLikeRepository.findByMemberAndNews(member, news)
                .orElseThrow(()-> new IllegalArgumentException("[NewsLikeServiceImpl.deleteLike] 해당 Id와 일치하는 newsLike 이 존재하지 않습니다."));

        //member의 list에 있는 newsLike삭제
        member.deleteNewsLike(newsLike);

        //newsLike삭제
        newsLikeRepository.delete(newsLike);

        //news의 like수 감소
        news.minusLikeCount();

        //=======통계(user's pick)을 위해 좋아요 삭제=======//
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


        log.info("[NewsLikeServiceImpl.deleteLike] end...");
    }

    //==========좋아요 표시를 위해 조회시 likelist 조회==========//
    @Override
    public List<NewsLikeReponseDto.list> likeList(Long memberId) {
        log.info("[NewsLikeServiceImpl.likeList] start...");

        //member찾기
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()-> new IllegalArgumentException("[NewsLikeServiceImpl.likeList] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        //member에서 likelist조회
        List<NewsLike> newsLikeList = member.getLikeList();

        //to Dto
        List<NewsLikeReponseDto.list> list = new ArrayList<>();

        for(NewsLike newsLike : newsLikeList){
            list.add(NewsLikeReponseDto.list.builder()
                    .id(newsLike.getId())
                    .newsId(newsLike.getNews().getId())
                    .build());
        }
        log.info("[NewsLikeServiceImpl.likeList] end...");
        return list;
    }

}
