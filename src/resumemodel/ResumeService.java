package com.niranjana.resumemodel;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.niranjana.careerrecomendationmodule.CareerPredictionService1;

import jakarta.annotation.PostConstruct;
import weka.classifiers.Classifier;
import weka.classifiers.bayes.NaiveBayes;
import weka.core.Instance;
import weka.core.Instances;
import weka.core.SerializationHelper;

import java.io.FileReader;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class ResumeService {
	private Classifier classifier;
	private Instances dataset;
	private static final Logger LOGGER = Logger.getLogger(CareerPredictionService1.class.getName());

   
    
    @PostConstruct public void init() throws Exception {
		//dataset = new Instances(new FileReader("/Users/niranjana/Desktop/Datasets/tab.arff"));
//LOAD THE FILE
		dataset = new Instances(new FileReader("/Users/niranjana/Desktop/Datasets/tabresume.arff"));
		
  dataset.setClassIndex(dataset.numAttributes() - 1);
    classifier = new NaiveBayes();
  classifier.buildClassifier(dataset); 
  }

    public Map<String, Map<String, String>> predictCareer(List<String> skills, List<String> abilities) throws Exception {
        if (classifier == null || dataset == null) {
            LOGGER.warning("Classifier or dataset is not initialized. Make sure the init() method is called.");
            return Collections.emptyMap();
        }

        // Create a map to hold the results (education as key, inner map as value with headings and values)
        Map<String, Map<String, String>> results = new HashMap<>();

        // Loop through the dataset and find the matching career pathways and clusters for the given interest codes and educations
        for (Instance instance : dataset) {

            String datasetSkills = instance.stringValue(dataset.attribute("skills"));
            String datasetAbilities = instance.stringValue(dataset.attribute("Abilities"));

            String careerCluster = instance.stringValue(dataset.attribute("careerCluster"));
            String Sector = instance.stringValue(dataset.attribute("Sector"));
            String occupation = instance.stringValue(dataset.attribute("occupation"));
            String jobZone = instance.stringValue(dataset.attribute("jobZone"));
            String education = instance.stringValue(dataset.attribute("education"));

            if (
                    skills.contains(datasetSkills) && abilities.contains(datasetAbilities)) {
                String key = "CAREER PATH IS" + " (" + datasetSkills + ")" + " (" + datasetAbilities + ")";

                // Create an inner map to store headings and values for each match
                Map<String, String> headingsAndValues = new HashMap<>();
                headingsAndValues.put("careerCluster", careerCluster);
                headingsAndValues.put("Sector", Sector);
                headingsAndValues.put("occupation", occupation);
                headingsAndValues.put("jobZone", jobZone);
                headingsAndValues.put("education", education);

                // Add the inner map to the outer map with the key
                results.put(key, headingsAndValues);
            }
        }

        return results;
    }
	
}