import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AptitudeMain.css';
import {  Link,useNavigate } from 'react-router-dom';
import CareerCluster from './CareerCluster';

const productData = [
  {
    name: 'Information Technology',
    imageSrc: '/images/IT.jpg',
    link: 'informationtechnology',
  },
  {
    name: 'Health Science',
    imageSrc: '/images/HealthScience.jpg',
    link: 'healthscience',
  },
  {
    name: 'Transportation & Distribution & Logistics',
    imageSrc: '/images/transportation.jpg',
    link: 'transportation',
  },
  {
    name: 'Arts  Audio/Video Technology & Communications',
    imageSrc: '/images/arts.jpg',
    link: 'arts',
  },
  {
    name: 'Business Management & Administration',
    imageSrc: '/images/business.jpg',
    link: 'business',
  },
  {
    name: 'Education & Training',
    imageSrc: '/images/education.jpg',
    link: 'education',
  },
  {
    name: 'Finance & Marketing',
    imageSrc: '/images/finance.jpg',
    link: 'finance',
  },  
  {
    name: 'Government & Public Administration',
    imageSrc: '/images/government.jpg',
    link: 'government',
  },
  {
    name: 'Architecture & Construction',
    imageSrc: '/images/architecture.jpg',
    link: 'architecture',
  },

];

const ProductCard = ({ name, imageSrc, link }) => {
    const navigate = useNavigate();
  
    const handleLearnMore = () => {
      navigate(`/career-cluster/${link}`);
    };
    return (
        <div className="card">
          <img src={imageSrc} className="card-img-top" alt={name} />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <button className="btn btn-primary" onClick={handleLearnMore}>
             Take Test
            </button>
          </div>
        </div>
      );
    };
  const AptitudeMain = () => {
    return (
        <div className="container mt-5">
          <div className="test-description">
            <h2>General Aptitude Test</h2>
            <p>
              Welcome to our Career Cluster Aptitude Test! This test is designed to help you explore various career clusters and find the best fit for your knowledge.
              Below are some career clusters to choose from. Click on "Learn More" to discover your knowledge in each field.
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {productData.map((product, index) => (
              <div key={index} className="col">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      );
    };


export default AptitudeMain;
