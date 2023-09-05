package com.niranjana.careerrecommendedbyotherusers;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class RecommendedPathDTO {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	private String cluster;
    private String sector;
    private String occupation;
    private String job;
    private String education;

}
