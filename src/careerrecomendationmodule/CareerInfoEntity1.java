
package com.niranjana.careerrecomendationmodule;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity

@Data

@Builder

@NoArgsConstructor

@AllArgsConstructor
public class CareerInfoEntity1 {

	@Id

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String interestCode;
	private String skills;
	private String Abilities;
	private String careerCluster;
	private String Sector;
	private String occupation;
	private String jobZone;
	private String education;
	

}
