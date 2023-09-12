package com.niranjana.Controller;

import java.io.BufferedReader;

import com.niranjana.UserModule.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.*;
import java.util.HashMap;

import org.apache.mahout.cf.taste.common.TasteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.niranjana.PersonalityQuestionModule.*;
import com.niranjana.Controller.*;
import com.niranjana.UserModule.*;
import com.niranjana.adminmodule.Admin;
import com.niranjana.adminmodule.AuthenticationResponseAdmin;
import com.niranjana.adminmodule.AuthenticationServiceAdmin;
import com.niranjana.adminmodule.RegisterRequestAdmin;
import com.niranjana.adminmodule.UserService;
import com.niranjana.careerrecommendedbyotherusers.*;
import com.niranjana.careerrecomendationmodule.CareerInfoRepository;
import com.niranjana.careerrecomendationmodule.CareerPredictionService1;
import com.niranjana.careerrecomendationmodule.CareerReport;
import com.niranjana.careerrecomendationmodule.CareerReportDTO;
import com.niranjana.careerrecomendationmodule.CareerReportRepository;
import com.niranjana.careerrecomendationmodule.CareerReportService;
import com.niranjana.careerrecomendationmodule.UserDTO;
import com.niranjana.feedback.Feedback;
import com.niranjana.feedback.FeedbackRepository;
import com.niranjana.resumemodel.ResumeService;
import com.niranjana.sqlcareerrecomendationmodule.CareerInfoProjection;
import com.niranjana.sqlcareerrecomendationmodule.CareerInfoRepository1;
import com.niranjana.sqlcareerrecomendationmodule.CareerInfoService;
import com.niranjana.sqlcareerrecomendationmodule.career;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import java.io.IOException;
import java.io.InputStreamReader;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class LoginController {

	
	@Autowired
	private final AuthenticationServiceAdmin adminService;

	@Autowired
	private final QuestionService questionService;
	@Autowired
    private final CareerPathRecommendationService recommendationService;

	
	@Autowired
	private final UsersRepo usersRepo;
	@Autowired
	private final UserProfileService userProfileService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	@Autowired
	private final QuestionRepository questRepo;
	
	@Autowired
	private final CareerPredictionService1 careerPredictionService1;
	
	@Autowired
	private final CareerReportService careerReportService;
	
	
	@Autowired
    private final UserService userService;
	
	
	@Autowired
	private final FeedbackRepository feedbackRepository;
	
	@Autowired
    private final CareerInfoService careerInfoService;

	@Autowired
    private final CareerPredictionService1 careerPredictionService;

	@Autowired
    private final ResumeService resumeService;
	 
//	 @Autowired
//	    private CareerRecommendationService careerRecommendationService;
	 @Autowired
	    private final RecommendedPathDTORepository recommendedPathDTORepository;
	 @Autowired
	    private final EmailService emailService; 
	 
	 @Autowired
	    private final UserPreferenceRepository userPreferenceRepository;
	 @Autowired
	    private  final AuthenticationService authenticationService; 
	 
	   @Autowired
	    private  final RecommendedPathDTOService recommendedPathDTOService;
	  
	@PostMapping("/register")
	public ResponseEntity<?> registerUsers(@RequestBody List<RegisterRequest> registerRequests) {
	    // Iterate through the list of registerRequests and register each user
	    List<AuthenticationResponse> responses = new ArrayList<>();
	    
	    for (RegisterRequest registerRequest : registerRequests) {
	        AuthenticationResponse response = authenticationService.register(registerRequest);
	        responses.add(response);
	    }
	    
	    return ResponseEntity.ok(responses);
	}
	
	
	@PostMapping("/register1")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
		 if (usersRepo.existsByEmail(request.getEmail())) {
		        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email address is already registered.");
		    }

		AuthenticationResponse response = authenticationService.register(request);
        return ResponseEntity.ok(response);
    }
   
	
	@PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest authenticationRequest) {
        AuthenticationResponse response = authenticationService.authenticate(authenticationRequest);
        return ResponseEntity.ok(response);
    }
	@PostMapping("/registeradmin")
	public ResponseEntity<AuthenticationResponseAdmin> register(@RequestBody RegisterRequestAdmin req) {

		return ResponseEntity.ok(adminService.registerAdmin(req));
	}
	
	
	  @PostMapping("/recommend/{userId}") 
	  public ResponseEntity<List<RecommendedPathDTO>> recommendCareerPaths(@PathVariable Long userId) throws TasteException {
		  Users userProfile = getUserProfile(userId);

	        List<RecommendedPathDTO> recommendedPaths = recommendationService.recommendCareerPaths(userProfile);
	        return ResponseEntity.ok(recommendedPaths);
	    }
	  

	  private Users getUserProfile(long userId) {
		    // You can retrieve the user profile from your data source based on the userId
		    // For demonstration purposes, let's assume you have a repository or service to fetch the user profile

		    // Example code using a hypothetical UserProfileRepository
		  Users userProfile = usersRepo.findById(userId)
		            .orElseThrow(() -> new IllegalArgumentException("User profile not found for userId: " + userId));

		    return userProfile;
		}
		
		

	  @PostMapping("/adminlogin") 
	  public ResponseEntity<String> login(@RequestBody
	  Admin admin) { if ("admin405".equals(admin.getUsername()) &&
	  "admin123".equals(admin.getPassword())) { 
		  return
	  ResponseEntity.ok("Login successful"); } else 
	  { return
	  ResponseEntity.status(HttpStatus.UNAUTHORIZED).
	  body("Invalid username or password"); } }

	  
	  @GetMapping("/viewusersandcareerreport")
	    public ResponseEntity<List<UserDTO>> getAllUsersWithCareerReports() {
	        List<UserDTO> usersWithCareerReports = userService.getAllUsersWithCareerReports();
	        return ResponseEntity.ok(usersWithCareerReports);
	    }
	  
	 
    @GetMapping("/personalitytestQuestions")
	public ResponseEntity<List<PersonalityTestQuestion>> getAllQuestions() {
		List<PersonalityTestQuestion> questions = questionService.getAllQuestions();
		return ResponseEntity.ok(questions);
	}

	
    @PostMapping("/save")
    public ResponseEntity<String> saveQuestions(@RequestBody List<PersonalityTestQuestion> questions) {
        
        questionService.saveQuestions(questions);

        return ResponseEntity.ok("Questions saved successfully");
    }

	
    @PutMapping("updatequestions/{id}")
    public PersonalityTestQuestion updateQuestion(@PathVariable Long id, @RequestBody PersonalityTestQuestion questionDetails) {
        PersonalityTestQuestion question = questRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        question.setQuestion(questionDetails.getQuestion());
        question.setCode(questionDetails.getCode());

        return questRepo.save(question);
    }
    @DeleteMapping("deletequestions/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long id) {
    	questRepo.deleteById(id);
        return ResponseEntity.ok("Question deleted successfully");

    }

	 
	    @GetMapping("/predictpathwaysandclusters")
	    public Map<String, Map<String, String>> predictCareer(@RequestParam String interestCodes,
	                                                          @RequestParam List<String> skills,
	                                                          @RequestParam List<String> abilities) {
	        try {
	            return careerPredictionService1.predictCareer(interestCodes, skills, abilities);
	        } catch (Exception e) {
	            e.printStackTrace();
	            // Handle the exception by returning an error message as a response
	            Map<String, String> errorResponse = new HashMap<>();
	            errorResponse.put("error", "Error occurred while predicting career pathways and clusters.");
	            return Collections.singletonMap("error", errorResponse);
	        }
	    }
    
    @GetMapping("/get-report")
    public ResponseEntity<UserDTO> getCareerReportsForUser() {
        // Your existing code to get the authenticated user and fetch the career reports
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication.getPrincipal() instanceof Users)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Users currentUser = (Users) authentication.getPrincipal();
        List<CareerReport> careerReports = careerReportService.getCareerReportsForUser(currentUser);

        // Update the careerReports list in the UserDTO and return it in the response
        UserDTO userDTO = new UserDTO(currentUser);
        userDTO.setCareerReports(mapCareerReportsToDTO(careerReports));
        return ResponseEntity.ok(userDTO);
    }

    // Helper method to map CareerReport entities to CareerReportDTO
    private List<CareerReportDTO> mapCareerReportsToDTO(List<CareerReport> careerReports) {
        List<CareerReportDTO> careerReportDTOs = new ArrayList<>();
        if (careerReports != null) {
            for (CareerReport careerReport : careerReports) {
                CareerReportDTO careerReportDTO = new CareerReportDTO(careerReport);
                careerReportDTOs.add(careerReportDTO);
            }
        }
        return careerReportDTOs;
    }

        @PostMapping("/generate-report")
        public ResponseEntity<UserDTO> generateCareerReport() {
            // Your existing code to get the authenticated user and generate the career report
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication.getPrincipal() instanceof Users)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            Users currentUser = (Users) authentication.getPrincipal();

            // Implement the generateCareerReportLogic method to generate the career report
            CareerReport generatedCareerReport = generateCareerReportLogic(currentUser);

            // Save the generated career report for the user
            CareerReport savedCareerReport = careerReportService.saveCareerReportForUser(currentUser, generatedCareerReport);

            // Create the UserDTO and return it in the response
            UserDTO userDTO = new UserDTO(currentUser);
            return ResponseEntity.ok(userDTO);
        }

        // Implement the method to generate the career report
        private CareerReport generateCareerReportLogic(Users user) {
            // Your logic to generate the career report goes here
            // You can create a new CareerReport object and populate its fields based on the user's information
            CareerReport careerReport = new CareerReport();
            careerReport.setUser(user);
            careerReport.setCareerCluster("Your generated career cluster");
            careerReport.setSector("Your generated sector");
            careerReport.setOccupation("Your generated occupation");
            careerReport.setEducation("Your generated education");
            careerReport.setJobZone("Your generated job preparation needed");

            return careerReport;
        }

        @PostMapping("/save-report")
        public ResponseEntity<UserDTO> saveCareerReport(@RequestBody CareerReport careerReport) {
            // Your existing code to get the authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication.getPrincipal() instanceof Users)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            Users currentUser = (Users) authentication.getPrincipal();

            // Associate the career report with the user
            careerReport.setUser(currentUser);

            // Save the career report
            CareerReport savedCareerReport = careerReportService.saveCareerReportForUser(currentUser, careerReport);

            // Update the UserDTO to include the saved career report
            currentUser.getCareerReports().add(savedCareerReport);
            UserDTO userDTO = new UserDTO(currentUser);

            return ResponseEntity.ok(userDTO);
        }
        
            @PostMapping("/setpreference")
        public ResponseEntity<String> setUserPreference(@RequestBody SetUserPreferenceRequest request) {
            // Your existing code to get the authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication.getPrincipal() instanceof Users)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            Users currentUser = (Users) authentication.getPrincipal();

            // Get the RecommendedPathDTO that matches the request values
            RecommendedPathDTO careerPath = recommendedPathDTORepository.findByClusterAndSectorAndOccupationAndJobAndEducation(
                request.getCluster(),
                request.getSector(),
                request.getOccupation(),
                request.getJob(),
                request.getEducation()
            ).orElseThrow(() -> new EntityNotFoundException("Career path not found"));

            UserPreferences userPreference = userPreferenceRepository.findByUserProfileAndCareerPath(currentUser, careerPath)
                    .orElse(new UserPreferences(currentUser, careerPath, 0)); // Default preference value is 0

            userPreference.setPreferenceValue(request.getPreferenceValue());
            userPreferenceRepository.save(userPreference);

            return ResponseEntity.ok("Preference value set successfully");
        }


		/*
		 * @PostMapping("/recommend-career") public
		 * ResponseEntity<List<CareerPathwayDTO>> recommendCareerPathways() { // Your
		 * existing code to get the authenticated user Authentication authentication =
		 * SecurityContextHolder.getContext().getAuthentication(); if
		 * (!(authentication.getPrincipal() instanceof Users)) { return
		 * ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); } Users currentUser =
		 * (Users) authentication.getPrincipal();
		 * 
		 * // Get career recommendations based on collaborative filtering
		 * List<CareerPathwayDTO> recommendations =
		 * careerRecommendationService.getCollaborativeFilteringRecommendations(
		 * currentUser);
		 * 
		 * return ResponseEntity.ok(recommendations); }
		 */

        @PostMapping("/savefeedback")
        public Feedback addFeedback(@RequestBody Feedback feedback) {
            return feedbackRepository.save(feedback);
        }

        @GetMapping("/getfeedback")
        public List<Feedback> getAllFeedback() {
            return feedbackRepository.findAll();
        }
        @PostMapping("/sqlsavecareer")
        public List<career> saveCareerInfo(@RequestBody List<career> careerInfoList) {
            List<career> savedCareers = new ArrayList<>();
            for (career careerInfo : careerInfoList) {
                savedCareers.add(careerInfoService.saveCareerInfo(careerInfo));
            }
            return savedCareers;
        }

        
        @GetMapping("/sqlrecommend-careers")
        public List<CareerInfoProjection> recommendCareers(
                @RequestParam String interest,
                @RequestParam String skills,
                @RequestParam String abilities
        ) {
            return careerInfoService.findCareerInfoByInputs(interest, skills, abilities);
        }
      
        
        @PostMapping("/save-model/{filename}")
        public ResponseEntity<String> saveModel(@PathVariable String filename) {
            try {
                careerPredictionService.saveModel(filename);
                return ResponseEntity.ok("Model saved successfully.");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving model: " + e.getMessage());
            }
        }
        @PostMapping("/load-model/{filename}")
        public ResponseEntity<String> loadModel(@PathVariable String filename) {
            try {
                careerPredictionService.loadModel(filename);
                return ResponseEntity.ok("Model loaded successfully.");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error loading model: " + e.getMessage());
            }
        }

		
		
	        @PostMapping("/uploadresume")
	        public ResponseEntity<Map<String, Map<String, String>>> uploadAndParseResume(@RequestParam("file") MultipartFile file) throws Exception {
	            List<String> skills = extractSkillsFromResume(file);
	            List<String> abilities = extractAbilitiesFromResume(file);
	
	            Map<String, Map<String, String>> predictionResult = resumeService.predictCareer(skills, abilities);
	            System.out.println(predictionResult);
	
	            return ResponseEntity.ok(predictionResult);
	        }
	        private List<String> extractSkillsFromResume(MultipartFile file) throws IOException {
	            List<String> skills = new ArrayList<>();
	
	            try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
	                String line;
	                boolean isSkillsSection = false;
	                boolean isAbilitiesSection = false; 
	
	                while ((line = reader.readLine()) != null) {
	                    System.out.println("Line: " + line); 
	                    if (line.trim().equalsIgnoreCase("skills")) {
	                        isSkillsSection = true;
	                        isAbilitiesSection = false; 
	                        continue;
	                    }
	                    if (line.trim().equalsIgnoreCase("abilities")) {
	                        isSkillsSection = false;
	                        isAbilitiesSection = true; 
	                        continue; 
	                    }
	
	                    if (isSkillsSection && !line.trim().isEmpty()) {
	                        System.out.println("Adding skill: " + line.trim()); 
	                        skills.add(line.trim());
	                    }
	                }
	            }
	
	            return skills;
	        }
	
	        private List<String> extractAbilitiesFromResume(MultipartFile file) throws IOException {
	            List<String> abilities = new ArrayList<>();
	
	            try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
	                String line;
	                boolean isSkillsSection = false;
	                boolean isAbilitiesSection = false; // Add this line for abilities section
	
	                while ((line = reader.readLine()) != null) {
	                    System.out.println("Line: " + line); // Adding this line for logging
	
	                    if (line.trim().equalsIgnoreCase("skills")) {
	                        isSkillsSection = true;
	                        System.out.println("Skills section started"); // Adding this line for logging
	                        isAbilitiesSection = false; // Reset abilities section flag
	                        continue;
	                    }
	                    if (line.trim().equalsIgnoreCase("abilities")) {
	                        isSkillsSection = false;
	                        System.out.println("Skills section ended"); // Adding this line for logging
	                        isAbilitiesSection = true; // Set abilities section flag
	                        continue; // Skip to next line
	                    }
	
	                    if (isAbilitiesSection && !line.trim().isEmpty()) {
	                        System.out.println("Adding ability: " + line.trim()); // AddING this line for logging
	                        abilities.add(line.trim());
	                    }
	                }
	            }
	
	            return abilities;
	        }


        @GetMapping("/resumepredict")
	    public Map<String, Map<String, String>> predictCareer(
	                                                          @RequestParam List<String> skills,
	                                                          @RequestParam List<String> abilities) {
	        try {
	            return resumeService.predictCareer(skills, abilities);
	        } catch (Exception e) {
	            e.printStackTrace();
	            // Handle the exception by returning an error message as a response
	            Map<String, String> errorResponse = new HashMap<>();
	            errorResponse.put("error", "Error occurred while predicting career pathways and clusters.");
	            return Collections.singletonMap("error", errorResponse);             
        }
        }
        @PostMapping("/forgot-password")
        public void forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) throws Exception {
            Optional<Users> userProfile = usersRepo.findByEmail(forgotPasswordRequest.getEmail());

            if (userProfile.isPresent()) {
                Users user = userProfile.get();
                String email = user.getEmail();
                String resetToken = UUID.randomUUID().toString();

                emailService.sendPasswordResetEmail(email, resetToken);

                // Instead of saving the token to the user's profile, send it to the user's email
                user.setResetToken(resetToken);
                 usersRepo.save(user);
            } else {
                throw new Exception("User not found with username: " + forgotPasswordRequest.getEmail());
            }
        }

        @PostMapping("/reset-password")
        public ResponseEntity<String> resetPassword(@RequestParam(name = "token") String resetToken,
                                                    @RequestParam(name = "newPassword") String newPassword) {
            Optional<Users> userProfileOptional = usersRepo.findByResetToken(resetToken);
            if (userProfileOptional.isPresent()) {
                Users userProfile = userProfileOptional.get();
                
                // Hash the new password
                String hashedPassword = passwordEncoder.encode(newPassword);
                userProfile.setPassword(hashedPassword);
                
                userProfile.setResetToken(null);
                usersRepo.save(userProfile);
                return ResponseEntity.ok("Password reset successful");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid reset token");
            }
        }
        
        @PostMapping("/savecareerdto")
        public ResponseEntity<String> saveCareerPath(@RequestBody List<RecommendedPathDTO> recommendedPathDTO) {
            List<RecommendedPathDTO> pathsToSave = new ArrayList<>();

            for (RecommendedPathDTO pathDTO : recommendedPathDTO) {
                // Check if the same row with the same values is already present
                boolean alreadyExists = recommendedPathDTORepository.existsByClusterAndSectorAndOccupationAndEducationAndJob(
                    pathDTO.getCluster(), pathDTO.getSector(), pathDTO.getOccupation(), pathDTO.getEducation(), pathDTO.getJob());

                if (!alreadyExists) {
                    pathsToSave.add(pathDTO);
                }
            }

            if (!pathsToSave.isEmpty()) {
                recommendedPathDTORepository.saveAll(pathsToSave);
                return ResponseEntity.ok("Career paths saved successfully");
            } else {
                return ResponseEntity.ok("No new career paths to save");
            }
        }
        
        @GetMapping("/viewcareerpath")
    	public ResponseEntity<List<RecommendedPathDTO>> getAllCareerPathsAdmin() {
    		List<RecommendedPathDTO> addcareer = recommendedPathDTORepository.findAll();
    		return ResponseEntity.ok(addcareer);
    	}

    	
        @PostMapping("/savecareerpath")
        public ResponseEntity<String> saveCareerPathAdmin(@RequestBody List<RecommendedPathDTO> careerpaths) {
            
        	recommendedPathDTORepository.saveAll(careerpaths);

            return ResponseEntity.ok(" New Career Path saved successfully");
        }

    	
        @PutMapping("updatcareerpath/{id}")
        public RecommendedPathDTO updateCareerpathAdmin(@PathVariable Long id, @RequestBody RecommendedPathDTO updatecareer) {
        	RecommendedPathDTO careerpath = recommendedPathDTORepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Career Path id not found"));

        	careerpath.setCluster(updatecareer.getCluster());
        	careerpath.setSector(updatecareer.getSector());
        	careerpath.setEducation(updatecareer.getEducation());
        	careerpath.setJob(updatecareer.getJob());
        	careerpath.setOccupation(updatecareer.getOccupation());

            return recommendedPathDTORepository.save(careerpath);
        }
        @DeleteMapping("deletecareerpath/{id}")
        public ResponseEntity<String> deleteCareerPathAdmin(@PathVariable Long id) {
        	recommendedPathDTORepository.deleteById(id);
            return ResponseEntity.ok("Career Path deleted successfully");

        }
        @PostMapping("/top-recommended-paths")
        public ResponseEntity<List<RecommendedPathDTO>> getTopRecommendedPaths(Authentication authentication) throws TasteException {
        	 Authentication authentication1 = SecurityContextHolder.getContext().getAuthentication();

             // Check if the principal of the authentication is of type Users
             if (!(authentication1.getPrincipal() instanceof Users)) {
                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
             }

             // Get the current user if authentication is successful
             Users currentUser = (Users) authentication1.getPrincipal();

             // Use the recommendation service to get the top recommended career paths for the current user
             List<RecommendedPathDTO> recommendedPaths = recommendationService.recommendCareerPaths(currentUser);

             return ResponseEntity.ok(recommendedPaths);
        }
        @PutMapping("/updateprofile")
        public ResponseEntity<String> updateProfile( @RequestBody UpdateProfile request, Authentication authentication) {
            // Get the current user from the authentication object
            Users currentUser = (Users) authentication.getPrincipal();
            // Update the user's profile with the new data
            userProfileService.updateSkillsAbilitiesEducation(
            currentUser.getUserId(), request.getSkills(), request.getAbilities());
            return ResponseEntity.ok("Profile updated successfully");
        }
    
        @PostMapping("/sqlsaveRecommendedPathDTO")
        public List<RecommendedPathDTO> saveRecommendedPathInfo(@RequestBody List<RecommendedPathDTO> careerInfoList) {
            List<RecommendedPathDTO> savedCareers = new ArrayList<>();
            for (RecommendedPathDTO careerInfo : careerInfoList) {
                savedCareers.add(recommendedPathDTOService.saveRecommendedPathInfo(careerInfo));
            }
            return savedCareers;
        }

	}
