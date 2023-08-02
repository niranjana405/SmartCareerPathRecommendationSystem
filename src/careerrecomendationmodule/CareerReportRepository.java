package com.niranjana.careerrecomendationmodule;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.niranjana.UserModule.Users;


public interface CareerReportRepository extends JpaRepository<CareerReport, Long>
{
	CareerReport save(CareerReport careerReport);

    // Custom method to find all career reports associated with a user
    List<CareerReport> findByUser(Users user);
}
