package com.niranjana.careerrecommendedbyotherusers;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.niranjana.UserModule.Users;
import com.niranjana.sqlcareerrecomendationmodule.career;



public interface RecommendedPathDTORepository extends JpaRepository<RecommendedPathDTO, Long>{

    List<RecommendedPathDTO> findByIdIn(List<Long> reportIds);
    Optional<RecommendedPathDTO> findByClusterAndSectorAndOccupationAndJobAndEducation(
            String cluster,
            String sector,
            String occupation,
            String job,
            String education
    );
    boolean existsByClusterAndSectorAndOccupationAndEducationAndJob(
            String cluster, String sector, String occupation, String education, String job
        );
}
