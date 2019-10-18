package com.tokenmagement.engine;

public class TokenDistributer {
	private static int noOfCounter;
	private static int lastAssignedCounterId;
	public TokenDistributer(int numberOfCounter) {
		super();
		this.noOfCounter = numberOfCounter;
	}
	
	public synchronized int getNextCounterId() {
		lastAssignedCounterId+=1;
		if(lastAssignedCounterId >= noOfCounter) {
			lastAssignedCounterId = 0;
		}
		return lastAssignedCounterId;
	}
	
}
