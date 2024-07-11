package com.ssafy.minuet.devices.repository;

import com.ssafy.minuet.devices.entity.Devices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DevicesRepository extends JpaRepository<Devices, Long> {

    Optional<Devices> findByUuid(String uuid);
}
