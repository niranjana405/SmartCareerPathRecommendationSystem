
package com.niranjana.careerrecomendationmodule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import weka.classifiers.Classifier;
import weka.classifiers.lazy.IBk;
	import weka.core.DenseInstance;
	import weka.core.Instance;
import weka.core.Instances;
import java.util.ArrayList;
import java.util.Collections;

import weka.core.SerializationHelper;
import weka.core.converters.ArffLoader;
import weka.classifiers.Evaluation;
import weka.classifiers.bayes.NaiveBayes;

import java.io.File;
import java.io.FileReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import weka.classifiers.trees.J48;
import weka.core.Attribute;
import weka.core.Capabilities;
import weka.core.converters.ConverterUtils.DataSource;
import weka.core.pmml.jaxbbindings.DecisionTree;

import com.niranjana.PersonalityQuestionModule.PersonalityTestQuestion;
import com.niranjana.PersonalityQuestionModule.QuestionRepository;
import java.util.logging.Level;
import java.util.logging.Logger;

import jakarta.annotation.PostConstruct;

import java.io.BufferedReader;
import java.io.StringReader;
import java.util.stream.Collectors;

@Service
public class CareerPredictionService1 {
	private Classifier classifier;
	private Instances dataset;
	private static final Logger LOGGER = Logger.getLogger(CareerPredictionService1.class.getName());
	public void setClassifier(Classifier classifier) {
        this.classifier = classifier;
    }

    // Add a setter method for the dataset
    public void setDataset(Instances dataset) {
        this.dataset = dataset;
    }
	@PostConstruct public void init() throws Exception {
		//dataset = new Instances(new FileReader("/Users/niranjana/Desktop/Datasets/tab.arff"));
//LOAD THE FILE
		dataset = new Instances(new FileReader("/Users/niranjana/Desktop/Datasets/tab1.arff"));
		
  dataset.setClassIndex(dataset.numAttributes() - 1);
  classifier = new NaiveBayes();
  classifier.buildClassifier(dataset); }


	    // Create a map to hold the results (education as key, list of careerPathways as value)
	    public Map<String, Map<String, String>> predictCareer(String interestCodes, List<String> skills, List<String> abilities) throws Exception {
	        if (classifier == null || dataset == null) {
	            LOGGER.warning("Classifier or dataset is not initialized. Make sure the init() method is called.");
	            return Collections.emptyMap();
	        }

	        // Create a map to hold the results (education as key, inner map as value with headings and values)
	        Map<String, Map<String, String>> results = new HashMap<>();

	        // Loop through the dataset and find the matching career pathways and clusters for the given interest codes and educations
	        for (Instance instance : dataset) {

	            String datasetInterestCode = instance.stringValue(dataset.attribute("interestCode"));
	            String datasetSkills = instance.stringValue(dataset.attribute("skills"));
	            String datasetAbilities = instance.stringValue(dataset.attribute("Abilities"));
	            String careerCluster = instance.stringValue(dataset.attribute("careerCluster"));
	            String Sector = instance.stringValue(dataset.attribute("Sector"));
	            String occupation = instance.stringValue(dataset.attribute("occupation"));
	            String jobZone = instance.stringValue(dataset.attribute("jobZone"));
	            String education = instance.stringValue(dataset.attribute("education"));

	            if (interestCodes.contains(datasetInterestCode) &&
	                    skills.contains(datasetSkills) && abilities.contains(datasetAbilities)) {
	                String key = datasetInterestCode + " (" + datasetSkills + ")" + " (" + datasetAbilities + ")";

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
	public void saveModel(String filename) throws Exception {
		if (classifier != null) { // Save the trained model to a file
			SerializationHelper.write(filename, classifier);
		}
	}

	public void loadModel(String filename) throws Exception { 
		// Load a trained model from a file
		classifier = (Classifier)
  SerializationHelper.read(filename); }
}
