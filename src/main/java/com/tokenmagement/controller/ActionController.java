package com.tokenmagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.tokenmagement.engine.TokenManagementEngine;
import com.tokenmagement.entity.Token;
import com.tokenmagement.util.JsonUtil;

@RestController
public class ActionController {

	
	@Autowired
	TokenManagementEngine tokenManagementEngine;
	

	
    @PostMapping("/assigntoken")
    public int assignToken(@RequestBody String body) {
    	Token token = new Token();
    	token.setTokenNumber(Integer.parseInt(JsonUtil.getJsonValue(body, "tokenNumber")));
    	token.setPremium(Boolean.parseBoolean(JsonUtil.getJsonValue(body, "isPremium")));
    	token.setOwnerName(JsonUtil.getJsonValue(body, "ownerName"));
    	int counterId = tokenManagementEngine.assignTokenToServiceCounter(token);
        return counterId;
    }

    
    @GetMapping("/gettoken")
    public int getToken() {
        return tokenManagementEngine.getNextTokenNumber();
    }
    
    @PostMapping("/getassignedtoken")
    public ObjectNode getAssignedToken(@RequestBody String body) {
    	
    	int counterId = Integer.parseInt(JsonUtil.getJsonValue(body, "counterId"));
    	boolean isPremium = Boolean.parseBoolean(JsonUtil.getJsonValue(body, "isPremium"));
    	Token token = tokenManagementEngine.getServiceCounterNextToken(counterId, isPremium);
        return JsonUtil.getJsonObject(token);
    }
    
    @GetMapping("/getallactivetokens")
    public ArrayNode getAllActiveTokens() {
        return JsonUtil.createJsonArray(tokenManagementEngine.getAllActiveTokens());
    }
    
    @GetMapping("/getallassignedtokens")
    public ArrayNode getAllAssignedTokens() {
        return JsonUtil.createJsonArray(tokenManagementEngine.getAssignedTokenList());
    }

}
