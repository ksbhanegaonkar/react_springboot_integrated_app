package com.tokenmagement.entity;

import java.util.ArrayDeque;
import java.util.Queue;


public class ServiceCounter {
	final Queue<Token> assignedToken = new ArrayDeque<>();
	int id;
	int counterOwnerId;
	boolean isPremium;
	public ServiceCounter(int id,boolean isPremium) {
		super();
		this.id = id;
		this.isPremium = isPremium;
	}

	public void assignToken(Token token) {
		assignedToken.add(token);
	}
	
	public Token getNextToken() {
		return assignedToken.poll();
	}
	
	public Token peekNextToken() {
		return assignedToken.peek();
	}

	public int getCounterOwnerId() {
		return counterOwnerId;
	}

	public void setCounterOwnerId(int counterOwnerId) {
		this.counterOwnerId = counterOwnerId;
	}
	
	

	
	
	

	
	
}
