package com.uade.tpo.pds;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class PdsApplication {

	public static void main(String[] args) {
		SpringApplication.run(PdsApplication.class, args);
	}

}
