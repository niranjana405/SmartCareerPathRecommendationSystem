
package com.niranjana.careerrecommendedbyotherusers;

import com.niranjana.UserModule.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.niranjana.sqlcareerrecomendationmodule.career;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "user_preferences_table")
public class UserPreferences {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private Users userProfile;

	@ManyToOne
	@JoinColumn(name = "career_path_id")
	private RecommendedPathDTO careerPath;

	private int preferenceValue;

	public UserPreferences(Users userProfile, RecommendedPathDTO careerPath, int preferenceValue) {
		this.userProfile = userProfile;
		this.careerPath = careerPath;
		this.preferenceValue = preferenceValue;
	}
}
