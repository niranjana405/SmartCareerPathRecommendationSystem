package com.niranjana.sqlcareerrecomendationmodule;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CareerInfoService {

    private final CareerInfoRepository1 careerInfoRepository;

    @Autowired
    public CareerInfoService(CareerInfoRepository1 careerInfoRepository) {
        this.careerInfoRepository = careerInfoRepository;
    }
    public List<CareerInfoProjection> findCareerInfoByInputs(String interestCode, String skills, String abilities) {
        return careerInfoRepository.findCareerInfoByInputs(interestCode, skills, abilities);
    }


    public career saveCareerInfo(career careerInfo) {
        return careerInfoRepository.save(careerInfo);
    }
}
