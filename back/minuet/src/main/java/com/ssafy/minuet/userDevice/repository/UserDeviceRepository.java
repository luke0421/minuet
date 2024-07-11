package com.ssafy.minuet.userDevice.repository;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.userDevice.entity.UserDevice;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDeviceRepository extends JpaRepository<UserDevice, Long> {

    Optional<UserDevice> findByMember(Member member);
}
