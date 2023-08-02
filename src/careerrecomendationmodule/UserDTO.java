package com.niranjana.careerrecomendationmodule;

import java.util.*;

import com.niranjana.UserModule.Users;

import lombok.Data;

@Data
public class UserDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private List<CareerReportDTO> careerReports;

    // Constructor to map from the Users entity
    public UserDTO(Users user) {
        this.userId = user.getUserId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.careerReports = mapCareerReports(user.getCareerReports());

        // Map careerReports using CareerReportDTO
    }

    
    private List<CareerReportDTO> mapCareerReports(List<CareerReport> careerReports) {
        List<CareerReportDTO> careerReportDTOs = new ArrayList<>();
        if (careerReports != null) {
            for (CareerReport careerReport : careerReports) {
                CareerReportDTO careerReportDTO = new CareerReportDTO(careerReport);
                careerReportDTOs.add(careerReportDTO);
            }
        }
        return careerReportDTOs;
    }
}
