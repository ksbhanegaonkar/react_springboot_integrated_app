package com.tokenmagement.entity;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Token implements Serializable{

	private int tokenNumber;
	private String tokenName;
	private boolean isPremium;
	private int assignedCounterId;
	private int ownerId;
	private String ownerName;
	private int counterOwnerrId;
	private Long createdTimestamp;
	private Long completedTimestamp;
	private String type;

	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getOwnerName() {
		return ownerName;
	}
	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}
	public int getTokenNumber() {
		return tokenNumber;
	}
	public void setTokenNumber(int tokenNumber) {
		this.tokenNumber = tokenNumber;
	}
	public boolean isPremium() {
		return isPremium;
	}
	public void setPremium(boolean isPremium) {
		this.isPremium = isPremium;
	}
	public int getAssignedCounterId() {
		return assignedCounterId;
	}
	public void setAssignedCounterId(int assignedCounterId) {
		this.assignedCounterId = assignedCounterId;
	}
	public String getTokenName() {
		return tokenName;
	}
	public void setTokenName(String tokenName) {
		this.tokenName = tokenName;
	}
	public int getCounterOwnerrId() {
		return counterOwnerrId;
	}
	public void setCounterOwnerrId(int counterOwnerrId) {
		this.counterOwnerrId = counterOwnerrId;
	}
	public Long getCreatedTimestamp() {
		return createdTimestamp;
	}
	public void setCreatedTimestamp(Long createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}
	public Long getCompletedTimestamp() {
		return completedTimestamp;
	}
	public void setCompletedTimestamp(Long completedTimestamp) {
		this.completedTimestamp = completedTimestamp;
	}
	public int getOwnerId() {
		return ownerId;
	}
	public void setOwnerId(int ownerId) {
		this.ownerId = ownerId;
	}

	@Override
	public boolean equals(Object obj) {
		Token token = (Token)obj;
		return this.getTokenNumber()==token.getTokenNumber();
	}
	

}
