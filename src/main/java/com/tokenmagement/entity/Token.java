package com.tokenmagement.entity;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Token implements Serializable{

	private int tokenNumber;
	private boolean isPremium;
	private int assignedCounterId;
	private String ownerName;
	

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


	

}
