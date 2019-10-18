package com.tokenmagement;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.tokenmagement.engine.TokenManagementEngine;

@SpringBootApplication
public class MavenreactjsspringbootApplication implements CommandLineRunner {
	//@Autowired
	//ServiceCounterRepository serviceCounterRepository;
    public static void main(String[] args) {
        SpringApplication.run(MavenreactjsspringbootApplication.class, args);
    }
    
    @Bean
    public TokenManagementEngine createTokenManagementEngine(
    		@Value("${tokencounter.count}") int tokenCounters,
    		@Value("${normal.servicecounter}") int normalServiceCounters,
    		@Value("${premium.servicecounter}") int premiumServiceCounters) {
        TokenManagementEngine engine = new TokenManagementEngine(tokenCounters,normalServiceCounters,premiumServiceCounters);
        return engine;
    }

    
	  @Override public void run(String... args) {
		  //ServiceCounter counter = new ServiceCounter();
		  

	  
	  }
	  

}
