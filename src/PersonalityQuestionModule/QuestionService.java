package com.niranjana.PersonalityQuestionModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.File;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class QuestionService {	
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<PersonalityTestQuestion> getAllQuestions() {
		/*
		 * ObjectMapper objectMapper = new ObjectMapper();
		 * TypeReference<List<PersonalityTestQuestion>> typeReference = new
		 * TypeReference<>() {};
		 * 
		 * try { File file = new
		 * File("/Users/niranjana/Desktop/Datasets/dummyquestion.json");
		 * List<PersonalityTestQuestion> questions = objectMapper.readValue(file,
		 * typeReference); return questions; } catch (IOException e) {
		 * e.printStackTrace(); return null; }
		 */
        return questionRepository.findAll();

    }

    public void saveQuestions(List<PersonalityTestQuestion> questions) {
        questionRepository.saveAll(questions);
    }
}
    
