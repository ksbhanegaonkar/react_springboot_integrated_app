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
	
	public static ArrayNode createJsonArray(List<String> values) {
		ArrayNode arrayNode = mapper.createArrayNode();
		values.forEach(v->arrayNode.add(v));
		return arrayNode;
	
	}
	
	public static ObjectNode getEmptyJsonObject() {
		return mapper.createObjectNode();
	}
	
	public static ObjectNode getJsonObject(Token token) {
		
		ObjectNode node = getEmptyJsonObject();
		node.put("tokenNumber", token.getTokenNumber());
		node.put("assignedCounter", token.getAssignedCounterId());
		node.put("isPremium", token.isPremium());
		
		
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
	
	public static ArrayNode getJsonArrayFromTokenMap(Map<Integer,Token> map) {
		ArrayNode arrayNode = mapper.createArrayNode();
		for(int key : map.keySet()) {
			
			arrayNode.add(getJsonObject(map.get(key)));
		}
		return arrayNode;
	}
	
	
	public static ObjectNode getJsonObjectFromListMap(Map<String,List<String>> map) {
		ObjectNode obj = getEmptyJsonObject();
		for(String key : map.keySet()) {
			obj.set(key, createJsonArray(map.get(key)));
		}
		return obj;
	}
	
	
	/*
	 * private static void ObjectToJSON(Token employee) { try { JAXBContext
	 * jaxbContext = JAXBContext.newInstance(Token.class); Marshaller jaxbMarshaller
	 * = jaxbContext.createMarshaller();
	 * 
	 * // To format JSON
	 * jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
	 * 
	 * //Set JSON type //jaxbMarshaller.setProperty(MarshallerProperties.MEDIA_TYPE,
	 * "application/json");
	 * //jaxbMarshaller.setProperty(MarshallerProperties.JSON_INCLUDE_ROOT, true);
	 * 
	 * //Print JSON String to Console StringWriter sw = new StringWriter();
	 * jaxbMarshaller.marshal(employee, sw); System.out.println(sw.toString()); }
	 * catch (JAXBException e) { e.printStackTrace(); } }
	 */
	

		
	
}


