package com.tokenmagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tokenmagement.entity.Token;
import com.tokenmagement.repository.TokenRepository;
import com.tokenmagement.util.JsonUtil;

@RestController
public class ActionController {
	@Autowired
	TokenRepository TokenRepository;
	
	//@Autowired
	//ServiceCounterRepository serviceCounterRepository;
	
    @PostMapping("/assigntoken")
    public String assignToken(@RequestBody String body) {
    	
        return "assigning token "+JsonUtil.getJsonValue(body, "tokenId")+" to "+JsonUtil.getJsonValue(body, "counterId");
    }
    
    @GetMapping("/gettoken")
    public String getToken() {
    	Token token = new Token();
    	TokenRepository.save(token);
        return token.getId().toString();
    }
    
	/*
	 * @GetMapping("/createservicecounter") public String createServiceCounter() {
	 * ServiceCounter counter = new ServiceCounter();
	 * serviceCounterRepository.save(counter); return counter.getId().toString(); }
	 */
    

}
