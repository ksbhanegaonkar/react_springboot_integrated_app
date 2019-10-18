package com.tokenmagement.engine;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tokenmagement.entity.ServiceCounter;
import com.tokenmagement.entity.Token;
import com.tokenmagement.entity.TokenCounter;

public class TokenManagementEngine {
	
	private static int TOKEN_NUMBER;
	private static int TOTAL_TOKEN_COUNTERS;
	private static int TOTAL_PREMIUM_SERVICE_COUNTERS;
	private static int TOTAL_NORMAL_SERVICE_COUNTERS;
	
	private static final Map<Integer,TokenCounter> TOKEN_COUNTERS = new HashMap<>();
	private static final Map<Integer,ServiceCounter> NORMAL_SERVICE_COUNTERS  = new HashMap<>();
	private static final Map<Integer,ServiceCounter> PREMIUM_SERVICE_COUNTERS = new HashMap<>();
	
	private static final Map<Integer,Token> ALL_ACTIVE_TOKENS = new HashMap<>();
	
	private TokenDistributer normalTokenDistributer;
	private TokenDistributer premiumTokenDistributer;

	public TokenManagementEngine(int tokenCounters, int normalServiceCounters, int premiumServiceCounters) {
		TOTAL_TOKEN_COUNTERS = tokenCounters;
		TOTAL_PREMIUM_SERVICE_COUNTERS = premiumServiceCounters;
		TOTAL_NORMAL_SERVICE_COUNTERS = normalServiceCounters;
		
		
		premiumTokenDistributer = new TokenDistributer(TOTAL_PREMIUM_SERVICE_COUNTERS);
		normalTokenDistributer = new TokenDistributer(TOTAL_NORMAL_SERVICE_COUNTERS);
		
		for(int i=0;i<TOTAL_TOKEN_COUNTERS;i++) {
			TOKEN_COUNTERS.put(i, new TokenCounter());
		}
		
		for(int i=0;i<TOTAL_PREMIUM_SERVICE_COUNTERS;i++) {
			PREMIUM_SERVICE_COUNTERS.put(i, new ServiceCounter(i,true));
		}
		
		for(int i=0;i<TOTAL_NORMAL_SERVICE_COUNTERS;i++) {
			NORMAL_SERVICE_COUNTERS.put(i, new ServiceCounter(i,false));
		}
		
	}
	
	public synchronized int assignTokenToServiceCounter(Token token) {
		int counterId=-1;
		if(token.isPremium()) {
			counterId = premiumTokenDistributer.getNextCounterId();
			PREMIUM_SERVICE_COUNTERS.get(counterId).assignToken(token);
		}else {
			counterId = normalTokenDistributer.getNextCounterId();
			NORMAL_SERVICE_COUNTERS.get(counterId).assignToken(token);
		}
		token.setAssignedCounterId(counterId);
		ALL_ACTIVE_TOKENS.put(token.getTokenNumber(),token);
		return counterId;
	}
	
	public synchronized int getNextTokenNumber() {
		return TOKEN_NUMBER++;
	}
	
	public synchronized Token getServiceCounterNextToken(int id,boolean isPremium) {
		Token token = null;
		if(isPremium) {
			token = PREMIUM_SERVICE_COUNTERS.get(id).getNextToken();
		}else {
			token = NORMAL_SERVICE_COUNTERS.get(id).getNextToken();
		}
		ALL_ACTIVE_TOKENS.remove(token.getTokenNumber());
		return token;
	}
	
	public Map<Integer,Token> getAllActiveTokens(){
		return ALL_ACTIVE_TOKENS;
	}
	
	
}
