package com.niranjana.sqlcareerrecomendationmodule;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository

	public interface CareerInfoRepository1 extends JpaRepository<career, Long> {
	 @Query("SELECT new com.niranjana.sqlcareerrecomendationmodule.CareerInfoProjection(c.cluster, c.sector, c.occupation, c.job, c.education) " +
	           "FROM career c " +
	           "WHERE c.interest IN :interests AND c.skills = :skills AND c.abilities = :abilities")
	    List<CareerInfoProjection> findCareerInfoByInputs(
	            @Param("interests") String interests,
	            @Param("skills") String skills,
	            @Param("abilities") String abilities
	    );
	 

	 
	}

