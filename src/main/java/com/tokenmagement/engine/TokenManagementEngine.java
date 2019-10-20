package com.tokenmagement.engine;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tokenmagement.constants.ApplicationConstant;
import com.tokenmagement.entity.ServiceCounter;
import com.tokenmagement.entity.Token;
import com.tokenmagement.entity.TokenCounter;

public class TokenManagementEngine {

	private static int TOKEN_NUMBER;
	private static int TOTAL_TOKEN_COUNTERS;
	private static int TOTAL_PREMIUM_SERVICE_COUNTERS;
	private static int TOTAL_NORMAL_SERVICE_COUNTERS;

	private static final Map<Integer, TokenCounter> TOKEN_COUNTERS = new HashMap<>();
	private static final Map<Integer, ServiceCounter> NORMAL_SERVICE_COUNTERS = new HashMap<>();
	private static final Map<Integer, ServiceCounter> PREMIUM_SERVICE_COUNTERS = new HashMap<>();

	private static final List<Token> AUDIT_TOKEN_LIST = new ArrayList<>();

	private TokenDistributer normalTokenDistributer;
	private TokenDistributer premiumTokenDistributer;

	public TokenManagementEngine(int tokenCounters, int normalServiceCounters, int premiumServiceCounters) {
		TOKEN_NUMBER = 1;
		TOTAL_TOKEN_COUNTERS = tokenCounters;
		TOTAL_PREMIUM_SERVICE_COUNTERS = premiumServiceCounters;
		TOTAL_NORMAL_SERVICE_COUNTERS = normalServiceCounters;

		premiumTokenDistributer = new TokenDistributer(TOTAL_PREMIUM_SERVICE_COUNTERS);
		normalTokenDistributer = new TokenDistributer(TOTAL_NORMAL_SERVICE_COUNTERS);

		for (int i = 0; i < TOTAL_TOKEN_COUNTERS; i++) {
			TOKEN_COUNTERS.put(i, new TokenCounter());
		}

		for (int i = 0; i < TOTAL_PREMIUM_SERVICE_COUNTERS; i++) {
			PREMIUM_SERVICE_COUNTERS.put(i, new ServiceCounter(i, true));
		}

		for (int i = 0; i < TOTAL_NORMAL_SERVICE_COUNTERS; i++) {
			NORMAL_SERVICE_COUNTERS.put(i, new ServiceCounter(i, false));
		}

	}

	public synchronized Token assignNewTokenToServiceCounter(Token token) {
		int counterId = -1;
		if (ApplicationConstant.TOKEN_TYPE_PREMIUM.equals(token.getType())) {
			counterId = premiumTokenDistributer.getNextCounterId();
			PREMIUM_SERVICE_COUNTERS.get(counterId).assignToken(token);
		} else {
			counterId = normalTokenDistributer.getNextCounterId();
			NORMAL_SERVICE_COUNTERS.get(counterId).assignToken(token);
		}
		token.setAssignedCounterId(counterId);

		return token;
	}

	public synchronized int getNextTokenNumber() {
		return TOKEN_NUMBER++;
	}

	public synchronized Token generateToken() {
		int tokenNumber = getNextTokenNumber();
		TOKEN_NUMBER++;
		Token token = new Token();
		token.setTokenNumber(tokenNumber);
		token.setCreatedTimestamp(System.currentTimeMillis());
		return token;
	}

	public synchronized Token getServiceCounterNextToken(int id, String type) {
		Token token = null;
		if (ApplicationConstant.TOKEN_TYPE_PREMIUM.equals(type)) {
			token = PREMIUM_SERVICE_COUNTERS.get(id).peekNextToken();
		} else {
			token = NORMAL_SERVICE_COUNTERS.get(id).peekNextToken();
		}
		if (token == null) {
			token = new Token();
			return token;
		} else {
			return token;
		}

	}

	public synchronized Token completeWork(Token token) {
		if (token.getTokenName() == null) {
			token = new Token();
			return token;
		} else {
			if (ApplicationConstant.TOKEN_TYPE_PREMIUM.equals(token.getType())) {
				PREMIUM_SERVICE_COUNTERS.get(token.getAssignedCounterId()).getNextToken();
			} else {
				NORMAL_SERVICE_COUNTERS.get(token.getAssignedCounterId()).getNextToken();
			}

			AUDIT_TOKEN_LIST.add(token);
			token.setCompletedTimestamp(System.currentTimeMillis());
			return token;
		}
	}

	public List<Token> getTokenAudit() {
		return AUDIT_TOKEN_LIST;
	}

	public List<Token> getAssignedTokenList() {
		List<Token> allAssignedTokens = new ArrayList<>();

		for (int i = 0; i < TOTAL_PREMIUM_SERVICE_COUNTERS; i++) {
			if (PREMIUM_SERVICE_COUNTERS.get(i).peekNextToken() != null) {
				allAssignedTokens.add(PREMIUM_SERVICE_COUNTERS.get(i).peekNextToken());
			}

		}

		for (int i = 0; i < TOTAL_NORMAL_SERVICE_COUNTERS; i++) {
			if (NORMAL_SERVICE_COUNTERS.get(i).peekNextToken() != null) {
				allAssignedTokens.add(NORMAL_SERVICE_COUNTERS.get(i).peekNextToken());
			}
		}

		if (allAssignedTokens.size() == 0) {
			Token token = new Token();
			allAssignedTokens.add(token);
		}

		return allAssignedTokens;
	}

	public int getTotalTokenCounters() {
		return TOTAL_TOKEN_COUNTERS;
	}

	public int getTotalPremiumServiceCounters() {
		return TOTAL_PREMIUM_SERVICE_COUNTERS;
	}

	public int getTotalServiceCounters() {
		return TOTAL_NORMAL_SERVICE_COUNTERS;
	}

}
