package com.tokenmagement.util;

import java.io.IOException;
import java.io.StringWriter;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.tokenmagement.entity.Token;

public class JsonUtil {
	
	private static ObjectMapper mapper = new ObjectMapper();


	
	
	public static String getJsonValue(String json,String key) {
		try {
			JsonNode node = mapper.readTree(json);
			return node.get(key).asText();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public static ArrayNode createJsonArray(List<Token> values) {
		ArrayNode arrayNode = mapper.createArrayNode();
		values.forEach(v->arrayNode.add(getJsonObject(v)));
		return arrayNode;
	
	}
	
	public static ObjectNode getEmptyJsonObject() {
		return mapper.createObjectNode();
	}
	
	public static ObjectNode getTokenAsJsonObject(Token token) {
		
		ObjectNode node = getEmptyJsonObject();
		node.put("tokenNumber", token.getTokenNumber());
		node.put("tokenName", token.getTokenName());
		node.put("isPremium", token.isPremium());
		node.put("assignedCounterId", token.getAssignedCounterId());
		node.put("ownerId", token.getOwnerId());
		node.put("ownerName", token.getOwnerName());
		node.put("counterOwnerrId", token.getCounterOwnerrId());
		node.put("createdTimestamp", token.getCreatedTimestamp());
		node.put("completedTimestamp", token.getCompletedTimestamp());
		node.put("type", token.getType());
		
		
		return node;
	}
	
	public static Token getTokenFromJsonObject(ObjectNode node) {
		Token token = new Token();
		token.setTokenNumber(node.get("tokenNumber").intValue());
		token.setTokenName(node.get("tokenName").textValue());
		token.setPremium(node.get("isPremium").asBoolean());
		token.setAssignedCounterId(node.get("assignedCounterId").asInt());
		token.setOwnerId(node.get("ownerId").asInt());
		token.setOwnerName(node.get("ownerName").textValue());
		token.setCounterOwnerrId(node.get("counterOwnerrId").asInt());
		token.setCreatedTimestamp(node.get("createdTimestamp").asLong());
		token.setCompletedTimestamp(node.get("completedTimestamp").asLong());
		token.setType(node.get("type").textValue());
		
		return token;
	}
	
	public static ObjectNode getJsonObject(Token token) {
		
		ObjectNode node = getEmptyJsonObject();
		node.put("tokenNumber", token.getTokenNumber());
		node.put("tokenName", token.getTokenName());
		node.put("assignedCounter", token.getAssignedCounterId());
		node.put("isPremium", token.isPremium());
		node.put("ownerName", token.getOwnerName());
		
		
		return node;
	}
	
	public static ObjectNode getJsonObjectFromMap(Map<String,String> map) {
		ObjectNode obj = getEmptyJsonObject();
		for(String key : map.keySet()) {
			obj.put(key, map.get(key));
		}
		return obj;
	}
	
	public static ObjectNode getJsonObjectFromObjectMap(Map<Integer,Token> map) {
		ObjectNode obj = getEmptyJsonObject();
		for(Integer key : map.keySet()) {
			obj.set(key.toString(), getJsonObject(map.get(key)));
		}
		return obj;
	}
	

	
	
	
}


