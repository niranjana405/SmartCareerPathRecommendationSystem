package com.niranjana.careerrecomendationmodule;

import lombok.Data;

@Data
public class CareerReportDTO {
    private Long id;
    private String careerCluster;
    private String sector;
    private String occupation;
    private String education;
    private String jobZone;

    // Constructor to map from the CareerReport entity
    public CareerReportDTO(CareerReport careerReport) {
        this.id = careerReport.getId();
        this.careerCluster = careerReport.getCareerCluster();
        this.sector = careerReport.getSector();
        this.occupation = careerReport.getOccupation();
        this.education = careerReport.getEducation();
        this.jobZone = careerReport.getJobZone();
    }

    // Add getter and setter methods for other fields (if any)
}
