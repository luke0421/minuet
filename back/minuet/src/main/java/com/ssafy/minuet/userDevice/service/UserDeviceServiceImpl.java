package com.ssafy.minuet.userDevice.service;

import com.ssafy.minuet.devices.entity.Devices;
import com.ssafy.minuet.devices.repository.DevicesRepository;
import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.userDevice.dto.UserDeviceRequestDto;
import com.ssafy.minuet.userDevice.dto.UserDeviceResponseDto;
import com.ssafy.minuet.userDevice.entity.UserDevice;
import com.ssafy.minuet.userDevice.repository.UserDeviceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserDeviceServiceImpl implements UserDeviceService{

    private final UserDeviceRepository userDeviceRepository;
    private final MemberRepository memberRepository;
    private final DevicesRepository devicesRepository;

    //======기기 연결=======//
    @Override
    @Transactional
    public void connect(UserDeviceRequestDto.connect reqDto) {
        log.info("[UserDeviceServiceImpl.connect] start");

        Member member = memberRepository.findById(reqDto.getMemberId())
                        .orElseThrow(()-> new IllegalArgumentException("[UserDeviceServiceImpl.connect] 해당 member가 없습니다. "));

        Devices devices = devicesRepository.findByUuid(reqDto.getUuid())
                        .orElseThrow(() -> new IllegalArgumentException("[UserDeviceServiceImpl.connect] 해당 uuid가 없습니다. "));

        UserDevice userDevice = UserDevice.builder()
                                    .member(member)
                                    .devices(devices)
                                    .build();

        userDeviceRepository.save(userDevice);

        log.info("[UserDeviceServiceImpl.connect] end");
    }


    //=======사용자의 기기 조회======//
    @Override
    public UserDeviceResponseDto.device getUuid(UserDeviceRequestDto.getUuidDto reqDto) {
        log.info("[UserDeviceServiceImpl.getUuid] start");

        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("[UserDeviceServiceImpl.getUuid] 해당 member가 없습니다. "));


        UserDeviceResponseDto.device device = null;
        //기기 조회, 연결돼 있을 때는 uuid반환, 없을 때는 null반환
        if(userDeviceRepository.findByMember(member).isPresent()){
            UserDevice connect = userDeviceRepository.findByMember(member)
                    .orElseThrow(() -> new IllegalArgumentException("[UserDeviceServiceImpl.getUuid] 해당 member는 연결된 기기가 없습니다. "));

            device = UserDeviceResponseDto.device.builder()
                    .uuid(connect.getDevices().getUuid())
                    .build();
        }

        log.info("[UserDeviceServiceImpl.getUuid] end");
        return device;
    }


}
