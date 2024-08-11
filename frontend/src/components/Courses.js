// src/components/Courses.js
import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../image/icon-1.png';
import image2 from '../image/icon-2.png';
import image3 from '../image/icon-3.png';
import image4 from '../image/icon-4.png';
import image5 from '../image/icon-5.png';
import image6 from '../image/icon-6.png';
import image7 from '../image/flask-logo-svg-vector.svg';
import image8 from '../image/kotin2.png';
import '../css/course.css';

function Course({ image, title, description, price, slug }) {
  return (
    <div className="courses-box">
      <img src={image} alt={title} className="courses-box-img"/>
      <h3 className="courses-box-title">{title}</h3>
      <p className="courses-box-description">{description}</p>
      <Link to={`/course/${slug}`} className="courses-btn">Get Course</Link>
      <div className="courses-price">Rs.{price}</div>
    </div>
  );
}

export default function Courses() {
  const coursesData = [
    {
      image: image1,
      title: "HTML 5",
      description: "Learn the latest HTML5 standards to create modern, responsive web pages.",
      price: 100,
      slug: "html5",
    },
    {
      image: image2,
      title: "CSS 3",
      description: "Master the art of styling and layout with CSS3, including Flexbox and Grid.",
      price: 200,
      slug: "css3",
    },
    {
      image: image3,
      title: "JavaScript",
      description: "Dive into JavaScript, the language of the web, and build dynamic, interactive websites.",
      price: 0,
      slug: "javascript",
    },
    {
      image: image4,
      title: "SASS",
      description: "Learn SASS, a powerful CSS preprocessor that makes your styling more efficient.",
      price: 130,
      slug: "sass",
    },
    {
      image: image5,
      title: "JQuery",
      description: "Simplify JavaScript with jQuery, the popular library for streamlined coding.",
      price: 150,
      slug: "jquery",
    },
    {
      image: image6,
      title: "React.js",
      description: "Build modern web applications with React.js, the leading front-end library.",
      price: 25,
      slug: "reactjs",
    },
    {
      image: image7,
      title: "Django and Flask",
      description: "Get started with Django and Flask, two of the most popular Python web frameworks.",
      price: 99,
      slug: "django-flask",
    },
    {
      image: image8,
      title: "Kotlin",
      description: "Learn Kotlin, the official language for Android development, and create powerful mobile apps.",
      price: 69.99,
      slug: "kotlin",
    }
  ];

  return (
    <div className="courses-container">
      <div className="courses-container-inner">
        <h1 className="courses-heading">Our Services</h1>
        <div className="courses-box-container">
          {coursesData.map((course, index) => (
            <Course 
              key={index} 
              image={course.image} 
              title={course.title} 
              description={course.description} 
              price={course.price} 
              slug={course.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
