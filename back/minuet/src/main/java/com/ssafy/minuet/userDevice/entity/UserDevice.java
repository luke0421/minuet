package com.ssafy.minuet.userDevice.entity;

import com.ssafy.minuet.devices.entity.Devices;
import com.ssafy.minuet.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserDevice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private Devices devices;

    @OneToOne(cascade = CascadeType.ALL)
    private Member member;

    @Builder
    public UserDevice(
            Devices devices,
            Member member
    ){
        this.devices = devices;
        this.member = member;
    }
}
