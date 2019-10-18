package com.tokenmagement.entity;

import java.util.ArrayDeque;
import java.util.Queue;

import javax.persistence.Entity;

//@Entity
public class ServiceCounter extends BaseEntity {
	Queue<Long> assignedToken = new ArrayDeque<Long>();

	public Queue<Long> getAssignedToken() {
		return assignedToken;
	}

	public void setAssignedToken(Queue<Long> assignedToken) {
		this.assignedToken = assignedToken;
	}
	
	
	
	

	
	
}
