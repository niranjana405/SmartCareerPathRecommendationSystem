package com.niranjana.PersonalityQuestionModule;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.niranjana.UserModule.Users;



public interface QuestionRepository extends JpaRepository<PersonalityTestQuestion, Long>{
	

}
