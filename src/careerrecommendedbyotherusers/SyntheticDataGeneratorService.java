
package com.niranjana.careerrecommendedbyotherusers;

import org.springframework.stereotype.Service;
import com.niranjana.UserModule.Users;
import com.niranjana.sqlcareerrecomendationmodule.career;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.*;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class SyntheticDataGeneratorService {

	private final Random random = new Random();

	public List<UserPreferences> generateUserPreferences(List<Users> userProfiles, List<RecommendedPathDTO> careerPaths) 
	{
		if (careerPaths.isEmpty())
		{
			throw new IllegalStateException("No career paths available"); 
		}
		List<UserPreferences> userPreferences = new ArrayList<>();
  
  for (Users userProfile : userProfiles) 
  {
	  int numPreferences =random.nextInt(5) + 1; // Generate 1 to 5 preferences for each user
  
  for (int i = 0; i < numPreferences; i++) { 
	  RecommendedPathDTO careerPath = getRandomCareerPath(careerPaths); 
	  int preferenceValue = random.nextInt(6); 
  //Generates a random integer between 0 and 5 
	  // Set the userProfile using the builder method 
	  UserPreferences userPreference = UserPreferences.builder().userProfile(userProfile)
  .careerPath(careerPath).preferenceValue(preferenceValue).build();
  
  userPreferences.add(userPreference);
  } }
  return userPreferences; 
  }

	private RecommendedPathDTO getRandomCareerPath(List<RecommendedPathDTO> careerPaths) {
		if (careerPaths.isEmpty()) {
			throw new IllegalStateException("No career paths available");
		}
		int index = random.nextInt(careerPaths.size());
		return careerPaths.get(index);
	}
}
