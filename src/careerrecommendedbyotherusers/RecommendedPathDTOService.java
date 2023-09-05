package com.niranjana.careerrecommendedbyotherusers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class RecommendedPathDTOService {

    private final RecommendedPathDTORepository recommendedPathDTORepository;

    @Autowired
    public RecommendedPathDTOService(RecommendedPathDTORepository recommendedPathDTORepository) {
        this.recommendedPathDTORepository = recommendedPathDTORepository;
    }
    

    public RecommendedPathDTO saveRecommendedPathInfo(RecommendedPathDTO recommendedPathInfo) {
        return recommendedPathDTORepository.save(recommendedPathInfo);
    }
}
