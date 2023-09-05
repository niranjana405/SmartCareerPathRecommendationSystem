	
	package com.niranjana.resumemodel;
	
	import jakarta.persistence.Column;
	import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.Table;
	import lombok.AllArgsConstructor;
	import lombok.Builder;
	import lombok.Data;
	import lombok.NoArgsConstructor;
	
	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public class Resume {
	
		@Id
	
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;
	
		
		private String skills;
		
	    private String abilities;
		
						
	
	}
