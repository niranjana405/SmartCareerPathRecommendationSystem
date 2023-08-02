package com.niranjana.careerrecomendationmodule;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.niranjana.UserModule.Users;

@Service
public class CareerReportService {

    private final CareerReportRepository careerReportRepository;

    public CareerReportService(CareerReportRepository careerReportRepository) {
        this.careerReportRepository = careerReportRepository;
    }

    @Transactional
    public CareerReport saveCareerReportForUser(Users user, CareerReport careerReport) {
        careerReport.setUser(user);
        return careerReportRepository.save(careerReport);
    }

    public List<CareerReport> getCareerReportsForUser(Users user) {
        return careerReportRepository.findByUser(user);
    }
    
}
