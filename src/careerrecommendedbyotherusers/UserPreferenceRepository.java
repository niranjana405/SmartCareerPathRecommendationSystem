package com.niranjana.careerrecommendedbyotherusers;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.niranjana.UserModule.Users;
import com.niranjana.sqlcareerrecomendationmodule.career;



public interface UserPreferenceRepository extends JpaRepository<UserPreferences, Long>{

    List<UserPreferences> findByCareerPath(career careerPath);
    UserPreferences findByUserProfileAndCareerPath(Users userProfile, career careerPath);
    List<UserPreferences> findByUserProfile(Users userProfile);
    Optional<UserPreferences> findByUserProfileAndCareerPath(Users userProfile, RecommendedPathDTO careerPath);

}
