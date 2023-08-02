package com.niranjana.Controller;

import java.time.LocalDateTime;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;
import java.util.*;
import java.util.HashSet;

import java.util.Set;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
import weka.classifiers.functions.MultilayerPerceptron;
import weka.core.Debug;
import weka.core.Instances;
import weka.core.converters.ConverterUtils.DataSource;
import weka.filters.Filter;
import weka.filters.unsupervised.attribute.Normalize;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

import com.niranjana.PersonalityQuestionModule.PersonalityTestQuestion;
import com.niranjana.PersonalityQuestionModule.QuestionRepository;
import com.niranjana.PersonalityQuestionModule.QuestionService;
import com.niranjana.UserModule.*;
import com.niranjana.adminmodule.Admin;
import com.niranjana.adminmodule.AuthenticationRequestAdmin;
import com.niranjana.adminmodule.AuthenticationResponseAdmin;
import com.niranjana.adminmodule.AuthenticationServiceAdmin;
import com.niranjana.adminmodule.RegisterRequestAdmin;
import com.niranjana.adminmodule.UserService;
import com.niranjana.careerrecomendationmodule.CareerInfoRepository;
import com.niranjana.careerrecomendationmodule.CareerPredictionService1;
import com.niranjana.careerrecomendationmodule.CareerReport;
import com.niranjana.careerrecomendationmodule.CareerReportDTO;
import com.niranjana.careerrecomendationmodule.CareerReportService;
import com.niranjana.careerrecomendationmodule.UserDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.nio.file.Paths;
import java.io.IOException;
import weka.core.Attribute;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class LoginController {
@Autowired
	private final AuthenticationService service;
	@Autowired
	private final AuthenticationServiceAdmin adminService;

	@Autowired
	private final QuestionService questionService;

	
	@Autowired
	private final UsersRepo usersRepo;

	
	@Autowired
	private final QuestionRepository questRepo;
	
	@Autowired
	private final CareerPredictionService1 careerPredictionService1;
	
	@Autowired
	private final CareerInfoRepository careerInfoRepository;
	
	@Autowired
	private final CareerReportService careerReportService;
	
	
	@Autowired
    private final UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest req) {

		return ResponseEntity.ok(service.register(req));

	}

	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest req) {
		return ResponseEntity.ok(service.authenticate(req));

	}
	@PostMapping("/registeradmin")
	public ResponseEntity<AuthenticationResponseAdmin> register(@RequestBody RegisterRequestAdmin req) {

		return ResponseEntity.ok(adminService.registerAdmin(req));
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
	 
/*
 * @GetMapping("/viewusers") public List<Users> getAllUsersWithCareerReports() {
 * List<Users> allUsers = usersRepo.findAllWithCareerReports(); // Fetch users
 * with their career reports eagerly return allUsers; }
 */
	  
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

}