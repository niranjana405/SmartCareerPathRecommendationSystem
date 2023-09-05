package com.niranjana.careerrecommendedbyotherusers;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SetUserPreferenceRequest {
	private String cluster;
    private String sector;
    private String occupation;
    private String job;
    private String education;
    private int preferenceValue;
}
