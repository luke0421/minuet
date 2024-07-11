package com.ssafy.minuet.userPick.service;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.news.dto.NewsResponseDto;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.news.reposiroty.NewsRepository;
import com.ssafy.minuet.userPick.dto.UserPickResponseDto;
import com.ssafy.minuet.userPick.entity.Age;
import com.ssafy.minuet.userPick.entity.UserPick;
import com.ssafy.minuet.userPick.repository.UserPickRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserPickService {

    @Autowired
    private UserPickRepository userPickRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private NewsRepository newsRepository;

    public List<UserPick> findAll(){
        //추가하고
/*        UserPick userPick = UserPick.builder()
                .newsId(1l)
                .age(Age.TWENTIES)
                .count(2)
                .build();

        userPickRepository.save(userPick);*/
        //전체 조회하기
        List<UserPick> list = userPickRepository.findAll();

        //10대만 검색
        //List<UserPick> list = userPickRepository.findByAgeAndNewsId(Age.TWENTIES, 1l);

        return list;
    }

    public List<NewsResponseDto.newsList> getUserPick(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()-> new IllegalArgumentException("[UserPickService.getUserPick] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "count"));

        Page<UserPick> userPickNews = userPickRepository.findALLByAge(member.getAge(), pageable);

        List<NewsResponseDto.newsList> newsList = new ArrayList<>();

        Set<Long> doubleCheck = new HashSet<>();
        for(UserPick userPick : userPickNews){

            //존재하는 뉴스만 가져오기
            if(newsRepository.findById(userPick.getNewsId()).isPresent()){
                News news = newsRepository.findById(userPick.getNewsId())
                        .orElseThrow(()-> new IllegalArgumentException("[UserPickService.getUserPick] 해당 Id와 일치하는 news 이 존재하지 않습니다."));

                newsList.add(NewsResponseDto.toNewsDto(news));
                doubleCheck.add(news.getId());
            }


        }

        if(newsList.size() < 10){//10개가 안 될 경우 최신뉴스에서 뽑아오기 -> 중복 제거도 필요
            Pageable restPageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "id"));

            Page<News> news = newsRepository.findAll(restPageable);


            for(News n : news){
                if(!doubleCheck.contains(n.getId())){
                    newsList.add(NewsResponseDto.toNewsDto(n));
                    if(newsList.size() >= 10) break;
                }
            }
        }

        return newsList;
    }
}
