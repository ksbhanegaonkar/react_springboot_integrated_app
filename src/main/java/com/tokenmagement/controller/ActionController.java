package com.tokenmagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.tokenmagement.engine.TokenManagementEngine;
import com.tokenmagement.entity.Token;
import com.tokenmagement.util.JsonUtil;

@RestController
@RequestMapping("/services")
public class ActionController {

	
	@Autowired
	TokenManagementEngine tokenManagementEngine;
	
    @PostMapping("/assignnewtokentocounter")
    public ObjectNode assignTokenToCounter(@RequestBody ObjectNode body) {
    	Token token = JsonUtil.getTokenFromJsonObject(body);
    	token = tokenManagementEngine.assignNewTokenToServiceCounter(token);
        return JsonUtil.getTokenAsJsonObject(token);
    }

    
    @GetMapping("/generatetoken")
    public ObjectNode generateToken() {
        return JsonUtil.getTokenAsJsonObject(tokenManagementEngine.generateToken());
    }
    
    @PostMapping("/getassignedtoken")
    public ObjectNode getAssignedToken(@RequestBody String body) {
    	
    	int counterId = Integer.parseInt(JsonUtil.getJsonValue(body, "counterId"));
    	String type = JsonUtil.getJsonValue(body, "type");
    	Token token = tokenManagementEngine.getServiceCounterNextToken(counterId, type);
        return JsonUtil.getTokenAsJsonObject(token);
    }
    
    @PostMapping("/completework")
    public ObjectNode completeWork(@RequestBody ObjectNode body) {
    	
    	Token token = tokenManagementEngine.completeWork(JsonUtil.getTokenFromJsonObject(body));
    	return JsonUtil.getTokenAsJsonObject(token);
    }
    
    @GetMapping("/audittoken")
    public ArrayNode getAllActiveTokens() {
        return JsonUtil.createJsonArray(tokenManagementEngine.getTokenAudit());
    }
    
    @GetMapping("/getallassignedtokens")
    public ArrayNode getAllAssignedTokens() {
        return JsonUtil.createJsonArray(tokenManagementEngine.getAssignedTokenList());
    }
    
    @GetMapping("/getcounterinfo")
    public ObjectNode getCounterInfo() {
    	ObjectNode node = JsonUtil.getEmptyJsonObject();
    	node.put("tokenCounter", tokenManagementEngine.getTotalTokenCounters());
    	node.put("serviceCounter", tokenManagementEngine.getTotalServiceCounters());
    	node.put("premiumServiceCounter", tokenManagementEngine.getTotalPremiumServiceCounters());
        return node;
    }

}
