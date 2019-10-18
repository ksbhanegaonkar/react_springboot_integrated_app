package com.tokenmagement.util;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

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
	
	public static ObjectNode getJsonObjectFromMap(Map<String,String> map) {
		ObjectNode obj = getEmptyJsonObject();
		for(String key : map.keySet()) {
			obj.put(key, map.get(key));
		}
		return obj;
	}
	
	public static ObjectNode getJsonObjectFromObjectMap(Map<String,Map<String,String>> map) {
		ObjectNode obj = getEmptyJsonObject();
		for(String key : map.keySet()) {
			obj.set(key, getJsonObjectFromMap(map.get(key)));
		}
		return obj;
	}
	
	
	public static ObjectNode getJsonObjectFromListMap(Map<String,List<String>> map) {
		ObjectNode obj = getEmptyJsonObject();
		for(String key : map.keySet()) {
			obj.set(key, createJsonArray(map.get(key)));
		}
		return obj;
	}
	

		
	
}


