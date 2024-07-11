package com.ssafy.minuet;

import com.ssafy.minuet.news.service.CategoryService;
import com.ssafy.minuet.news.service.CategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MinuetApplication {

	public static void main(String[] args) {

		SpringApplication.run(MinuetApplication.class, args);

	}

}
