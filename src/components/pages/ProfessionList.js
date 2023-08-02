import React, { useEffect, useState } from 'react';
import ProfessionalOptionsData from './profession.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './ProfessionList.css';

function ProfessionalOptionsDropdown() {
  const [categories, setCategories] = useState([]);
  const [titles, setTitles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const uniqueCategories = [...new Set(ProfessionalOptionsData.map(option => option.Category))];
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filteredTitles = [...new Set(ProfessionalOptionsData
        .filter(option => option.Category === selectedCategory)
        .map(option => option.Title))];
      setTitles(filteredTitles);
      setSelectedTitle(''); // Reset selected title when category changes
    } else {
      setTitles([]);
      setSelectedTitle('');
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory && selectedTitle) {
      const option = ProfessionalOptionsData.find(
        option => option.Category === selectedCategory && option.Title === selectedTitle
      );
      setSelectedOption(option);
    } else {
      setSelectedOption(null);
    }
  }, [selectedCategory, selectedTitle]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    // Filter the titles based on the selected category
    const filteredTitles = selectedCategory
      ? [...new Set(ProfessionalOptionsData
          .filter(option => option.Category === selectedCategory)
          .map(option => option.Title))]
      : [];
    setTitles(filteredTitles);

    // Reset the selected title if it's not in the filtered titles
    if (!filteredTitles.includes(selectedTitle)) {
      setSelectedTitle('');
    }
  };

  const handleTitleChange = (e) => {
    const selectedTitle = e.target.value;
    setSelectedTitle(selectedTitle);
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-3">Professional Jobs and Responsibilities</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="categorySelect" className="form-label">
              Category:
            </label>
            <div className="input-group">
              <select
                className="form-control custom-select"
                id="categorySelect"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="input-group-append">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="titleSelect" className="form-label">
              Title:
            </label>
            <div className="input-group">
              <select
                className="form-control custom-select"
                id="titleSelect"
                value={selectedTitle}
                onChange={handleTitleChange}
              >
                <option value="">Select Title</option>
                {titles.map(title => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
              <div className="input-group-append">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedOption && (
        <>
          <div>
            <p className="mt-3">Responsibilities</p>
           
            <p id="div1">{selectedOption.Responsibilities}</p>
          </div>
          <div>
            <p className="mt-3">Minimum Qualifications</p>
        
            <p id="div1">{selectedOption['Minimum Qualifications']}</p>
          </div>
          <div>
            <p className="mt-3">Preferred Qualifications</p>
         
            <p id="div1">{selectedOption['Preferred Qualifications']}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfessionalOptionsDropdown;
