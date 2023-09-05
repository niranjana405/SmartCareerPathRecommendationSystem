
package com.niranjana.careerrecommendedbyotherusers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.niranjana.sqlcareerrecomendationmodule.career;
import com.niranjana.UserModule.Users;
import com.niranjana.UserModule.UsersRepo;
import com.niranjana.sqlcareerrecomendationmodule.CareerInfoRepository1;

import java.util.*;

@Configuration
public class SampleDataConfig {

	@Autowired
	private SyntheticDataGeneratorService dataGeneratorService;

	@Autowired
	private UsersRepo usersRepo;

	@Autowired
	private UserPreferenceRepository userPreferenceRepository;

	@Autowired
	private RecommendedPathDTORepository recommendedPathDTORepository;

	@Bean
	public ApplicationRunner generateSampleData() {
		return args -> {
			List<Users> userProfiles = usersRepo.findAll(); // Get existing user profiles

			List<RecommendedPathDTO> careerPaths = recommendedPathDTORepository.findAll(); // Get existing career paths

			if (userPreferenceRepository.count() == 0) {
				List<UserPreferences> userPreferences = dataGeneratorService.generateUserPreferences(userProfiles,
						careerPaths);
				userPreferenceRepository.saveAll(userPreferences);
			}
		};
	}
}
