package com.niranjana.sqlcareerrecomendationmodule;


public class CareerInfoProjection {
    private String cluster;
    private String sector;
    public String getCluster() {
		return cluster;
	}

	public void setCluster(String cluster) {
		this.cluster = cluster;
	}

	public String getSector() {
		return sector;
	}

	public void setSector(String sector) {
		this.sector = sector;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getJob() {
		return job;
	}

	public void setJob(String job) {
		this.job = job;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	private String occupation;
    private String job;
    private String education;

    public CareerInfoProjection(String cluster, String sector, String occupation, String job, String education) {
        this.cluster = cluster;
        this.sector = sector;
        this.occupation = occupation;
        this.job = job;
        this.education = education;
    }

    // Getters and setters (if needed)...
}
