package com.niranjana.careerrecommendedbyotherusers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.niranjana.UserModule.Users;
import com.niranjana.UserModule.UsersRepo;
import org.apache.mahout.cf.taste.common.TasteException;
import java.util.ArrayList;
import java.util.*;

@Service
public class CareerPathRecommendationService {
	@Autowired
	private UsersRepo usersRepo;
	@Autowired
	private RecommendedPathDTORepository recommendedPathDTORepository;
	@Autowired
	private UserPreferenceRepository userPreferenceRepository;
	public List<RecommendedPathDTO> recommendCareerPaths(Users userProfile) throws TasteException {
		List<Users> similarUsers = findSimilarUsers(userProfile);
		//duplicate values cannot be stored in set and to keep track of processed career path IDs
		Set<Long> processedCareerPathIds = new HashSet<>(); 
		List<RecommendedPathDTO> recommendedPaths = new ArrayList<>();
		for (Users similarUser : similarUsers) {
			List<UserPreferences> similarUserPreferences = userPreferenceRepository.findByUserProfile(similarUser);
			for (UserPreferences preference : similarUserPreferences) {
				long careerPathId = preference.getCareerPath().getId();
				int preferenceValue = preference.getPreferenceValue();
		        if (preferenceValue >=3 && !processedCareerPathIds.contains(careerPathId)) {
					RecommendedPathDTO recommendedPath = findCareerPathById(careerPathId);
					if (recommendedPath != null) {
						System.out.println("Similar User: " + similarUser.getUserId());
						System.out.println("Career Path ID: " + recommendedPath.getId());
						System.out.println("Preference Value: " + preferenceValue);
						recommendedPaths.add(recommendedPath);
						// Addded to the set to avoid duplicates
		                processedCareerPathIds.add(careerPathId); 
					}}}}
		return recommendedPaths;
	}
	private RecommendedPathDTO findCareerPathById(long careerPathId) {
		return recommendedPathDTORepository.findById(careerPathId).orElse(null);
	}
	// Implementing the logic to retrieve similar users from the database
	private List<Users> findSimilarUsers(Users userProfile) {
		List<Users> allUsers = usersRepo.findAll();
		List<Users> similarUsers = new ArrayList<>();

		for (Users user : allUsers) {
	        if (user.getUserId() != null) {

			double similarity = calculateEuclideanDistance(userProfile, user);
			if (similarity <= 0.0 && !user.getUserId().equals(userProfile.getUserId())) {
				similarUsers.add(user);
			}	}
		}
		return similarUsers;}
	// Calculate  similarity between two user profiles
	private double calculateEuclideanDistance(Users user1, Users user2) {
	    double sum = 0.0;
	    
	    if (user1.getSkills() != null && user2.getSkills() != null) {
	        sum += Math.pow(user1.getSkills().hashCode() - user2.getSkills().hashCode(), 2);
	    }

	    if (user1.getAbilities() != null && user2.getAbilities() != null) {
	        sum += Math.pow(user1.getAbilities().hashCode() - user2.getAbilities().hashCode(), 2);
	    }
	    
	    return Math.sqrt(sum);
	}

}