package com.ssafy.minuet.security;

import com.ssafy.minuet.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final MemberRepository memberRepository;

    @Bean
    public UserDetailsService userDetailsService(){
        // 람다식 사용
        return email -> memberRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("Member not found"));
//        return new UserDetailsService() {
//            @Override
//            public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//                return memberRepository.findByEmail(email)
//                        .orElseThrow(()-> new UsernameNotFoundException("Member not found"));
//            }
//        };
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
