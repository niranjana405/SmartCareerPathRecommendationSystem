package com.niranjana.careerrecommendedbyotherusers;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import org.apache.mahout.cf.taste.common.TasteException;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import com.niranjana.UserModule.*;
import java.util.*;
import com.niranjana.UserModule.UsersRepo;

@ExtendWith(MockitoExtension.class)
public class CareerPathRecommendationServiceTest {

    @InjectMocks
    private CareerPathRecommendationService careerPathRecommendationService;

    @Mock
    private UsersRepo usersRepo;

    @Mock
    private RecommendedPathDTORepository recommendedPathDTORepository;

    @Mock
    private UserPreferenceRepository userPreferenceRepository;

    @BeforeEach
    public void setUp() {
        // Set up your mock behavior here if needed
    }

    @Test
    public void testRecommendCareerPaths() throws TasteException {
        // Create a sample UserProfile
        Users userProfile = new Users();
        // Set user profile properties
        Users similarUser1 = new Users();
        similarUser1.setSkills("Java, Python, SQL");
        similarUser1.setAbilities("Deductive Reasoning");

        Users similarUser2 = new Users();
        similarUser2.setSkills("C++, JavaScript");
        similarUser2.setAbilities("Problem Solving");

        List<Users> similarUsers = new ArrayList<>();
        similarUsers.add(similarUser1);
        similarUsers.add(similarUser2);

        // Mock the behavior of your repositories
        when(usersRepo.findAll()).thenReturn(similarUsers);

        // Create a sample UserPreferences list for similarUser1
        List<UserPreferences> userPreferences1 = new ArrayList<>();
        // Populate userPreferences1 with sample data

        // Mock the behavior of userPreferenceRepository
        when(userPreferenceRepository.findByUserProfile(similarUser1)).thenReturn(userPreferences1);

        // Mock the behavior of your recommendedPathDTORepository
        when(recommendedPathDTORepository.findById(anyLong())).thenReturn(Optional.of(new RecommendedPathDTO()));

        // Call the method you want to test
        List<RecommendedPathDTO> recommendedPaths = careerPathRecommendationService.recommendCareerPaths(userProfile);

        // Perform assertions on the recommendedPaths or other parts of the code as needed
        // For example, you can check if the expected number of paths were recommended:
        assertEquals(0, recommendedPaths.size()); // Adjust the expected size accordingly

        // You can also check specific properties of the recommended paths
        // RecommendedPathDTO firstRecommendedPath = recommendedPaths.get(0);
        // assertEquals(1, firstRecommendedPath.getId());
        // Add more assertions as needed
    }
}
