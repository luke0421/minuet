package com.ssafy.minuet.member.entity;

import com.ssafy.minuet.bookMark.entity.AllBookMark;
import com.ssafy.minuet.bookMark.entity.BookMark;
import com.ssafy.minuet.briefing.entity.Briefing;
import com.ssafy.minuet.hotTopic.entity.HotTopic;
import com.ssafy.minuet.member.dto.MemberRequestDto;
import com.ssafy.minuet.newsDislike.entity.NewsDislike;
import com.ssafy.minuet.newsLike.entity.NewsLike;
import com.ssafy.minuet.preSearch.entity.PreSearch;
import com.ssafy.minuet.prefer.entity.PreferCategory;
import com.ssafy.minuet.regionBookMark.entity.RegionBookMark;
import com.ssafy.minuet.regionDisLike.entity.RegionDislike;
import com.ssafy.minuet.regionLike.entity.RegionLike;
import com.ssafy.minuet.userPick.entity.Age;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.awt.print.Book;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member implements UserDetails {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "[Member] email 은 Null 일 수 없습니다.")
    private String email;

    @NotNull(message = "[Member] password 은 Null 일 수 없습니다.")
    private String password;

    @NotNull(message = "[Member] name 은 Null 일 수 없습니다.")
    private String name;

    @NotNull(message = "[Member] birth 은 Null 일 수 없습니다.")
    private LocalDate birth;

    @NotNull(message = "[Member] gender 은 Null 일 수 없습니다.")
    private Boolean gender; //남: 0, 여: 1

    private String profileImgPath;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<HotTopic> myHotTopicList = new ArrayList<>();

//    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
//    private List<BookMark> bookMarkList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<AllBookMark> bookMarkList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<NewsLike> likeList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<NewsDislike> dislikeList = new ArrayList<>();

//    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
//    private List<RegionBookMark> regionBookMarkList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<RegionLike> regionLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<RegionDislike> regionDislikeList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<PreferCategory> preferCategories = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Briefing> briefingList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<PreSearch> preSearches = new ArrayList<>();

    //========생성자========//
    @Builder
    public Member(
            String email,
            String password,
            String name,
            LocalDate birth,
            Boolean gender,
            String profileImgPath
    ){
        this.email = email;
        this.password = password;
        this.name = name;
        this.birth = birth;
        this.gender = gender;
        this.profileImgPath = profileImgPath;
    }

    //==========메소드============//
    public void addHotTopicList(HotTopic hotTopic){
        this.myHotTopicList.add(hotTopic);
        hotTopic.setMember(this);
    }

    //bookmark
/*
    public void addBookMarkList(BookMark bookMark){
        this.bookMarkList.add(bookMark);
        bookMark.setMember(this);
    }

    public void deleteBookMarkList(BookMark bookMark){
        this.bookMarkList.remove(bookMark);
    }
*/
    public void addBookMarkList(AllBookMark bookMark){
        this.bookMarkList.add(bookMark);
        bookMark.setMember(this);
    }

    public void deleteBookMarkList(AllBookMark bookMark){
        this.bookMarkList.remove(bookMark);
    }


    //newsLike
    public void addLikeList(NewsLike newsLike){
        this.likeList.add(newsLike);
        newsLike.setMember(this);
    }

    public void deleteNewsLike(NewsLike newsLike){
        this.likeList.remove(newsLike);
    }

    public void addDislikeList(NewsDislike newsDislike){
        this.dislikeList.add(newsDislike);
        newsDislike.setMember(this);
    }

    public void deleteNewsDislike(NewsDislike newsDislike){
        this.dislikeList.remove(newsDislike);
    }

    public void addBriefing(Briefing briefing){
        this.briefingList.add(briefing);
        briefing.setMember(this);
    }

    public void deleteBriefing(Briefing briefing){
        this.briefingList.remove(briefing);
    }


    public Age getAge(){
        int now = LocalDate.now().getYear();
        int birth = this.birth.getYear();

        int age = now - birth + 1;

        if(10 <= age && age < 20){
            return Age.TEENS;
        }
        else if(20 <= age && age < 30){
            return Age.TWENTIES;
        }
        else if(30 <= age && age < 40){
            return Age.THIRTIES;
        }
        else if(40 <= age && age < 50){
            return Age.FORTIES;
        }
        else if(50 <= age && age < 60){
            return Age.FIFTIES;
        }
        else if(60 <= age && age < 70){
            return Age.SIXTIES;
        }
        else if(70 <= age && age < 80){
            return Age.SEVENTIES;
        }
        else if(80 <= age && age < 90){
            return Age.EIGHTIES;
        }
        else if(90 <= age){
            return Age.EDLERLY;
        }

        return Age.ZERO;

    }


/*    public void addRegionBookMarkList(RegionBookMark regionBookMark){
        this.regionBookMarkList.add(regionBookMark);
        regionBookMark.setMember(this);
    }

    public void deleteRegionBookMarkList(RegionBookMark regionBookMark){
        this.regionBookMarkList.remove(regionBookMark);
    }*/

    public void addRegionLikeList(RegionLike regionLike){
        this.regionLikeList.add(regionLike);
        regionLike.setMember(this);
    }

    public void deleteRegionLike(RegionLike regionLike){
        this.regionLikeList.remove(regionLike);
    }

    public void addRegionDislikeList(RegionDislike regionDislike){
        this.regionDislikeList.add(regionDislike);
        regionDislike.setMember(this);
    }

    public void deleteRegionDislike(RegionDislike regionDislike){
        this.regionDislikeList.remove(regionDislike);
    }

    public void addPreferCategory(PreferCategory preferCategory){
        this.preferCategories.add(preferCategory);
        preferCategory.setMember(this);
    }

    public void deletePreferCategory(PreferCategory preferCategory){
        this.preferCategories.remove(preferCategory);
    }

    public void addPreSearch(PreSearch preSearch){
        this.preSearches.add(preSearch);
        preSearch.setMember(this);
    }

    //member정보 수정
    public void modify(MemberRequestDto.modify reqDto){
        this.name = reqDto.getName();
        this.birth = reqDto.getBirth();
        this.gender = reqDto.getGender();
    }
    //===========jwt관련 설정==============//

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();

        // authorities.add(new SimpleGrantedAuthority("MEMBER"));
        return authorities;
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    //========================================//
}
