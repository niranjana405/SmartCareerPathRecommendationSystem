package com.niranjana.careerrecomendationmodule;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareerInfoRepository extends JpaRepository<CareerReport, Long>
{

}
