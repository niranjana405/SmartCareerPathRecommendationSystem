package com.niranjana.careerrecomendationmodule;

import org.junit.jupiter.api.BeforeEach;
import com.fasterxml.jackson.core.type.TypeReference;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.classifiers.Classifier;
import weka.core.Instances;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;



import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CareerPredictionService1Test {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testPredictPathwaysAndClusters() throws Exception {
        String interestCodes = "IRC";
        String skills = "Science";
        String abilities = "Deductive Reasoning";

        // Perform an HTTP GET request with query parameters
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders
                .get("/api/auth/predictpathwaysandclusters")
                .param("interestCodes", interestCodes)
                .param("skills", skills)
                .param("abilities", abilities)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        // Extract and parse the JSON response
        String responseJson = result.getResponse().getContentAsString();
        // You can use your own DTO class instead of Map if you have one
        Map<String, Map<String, String>> responseMap = objectMapper.readValue(responseJson, new TypeReference<Map<String, Map<String, String>>>() {});

        // Now you can assert specific values in the responseMap
        // For example, you can assert the existence of certain keys or values:
        assertTrue(responseMap.containsKey("IRC (Science) (Deductive Reasoning)"));
        assertTrue(responseMap.containsKey("IR (Science) (Deductive Reasoning)"));

        // You can also perform more specific assertions on the content of the response
        assertEquals("Animal Scientists", responseMap.get("IR (Science) (Deductive Reasoning)").get("occupation"));
        assertEquals("Thses occupations need graduate school education. Preferably require master s degree. Good if you hold Ph.D M. D ", responseMap.get("IR (Science) (Deductive Reasoning)").get("education"));
        assertEquals("Agriculture  Food & Natural Resources", responseMap.get("IR (Science) (Deductive Reasoning)").get("careerCluster"));

        assertEquals("Chemists", responseMap.get("IRC (Science) (Deductive Reasoning)").get("occupation"));
        assertEquals("Thses occupations need bachelor s degree", responseMap.get("IRC (Science) (Deductive Reasoning)").get("education"));
        assertEquals("Science  Technology  Engineering & Mathematics", responseMap.get("IRC (Science) (Deductive Reasoning)").get("careerCluster"));
    }
}
