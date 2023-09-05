	
	package com.niranjana.sqlcareerrecomendationmodule;
	
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
	
	@Entity	
	@Data	
	@Builder	
	@NoArgsConstructor
	@AllArgsConstructor
	
	public class career {
	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;
		private String interest;	
		private String skills;	
	    private String abilities;	
	    private String cluster;	
	    private String sector;	
	    private String occupation;	
		private String job;
        private String education;	
	}
