import React from 'react';

const SuggestedProjects = (props) => {
  const projects = [
    { title: "E-commerce Website", description: "Develop a full-fledged e-commerce website with product listings, shopping cart, and payment gateway integration." },
    { title: "Blog Platform", description: "Create a blog platform where users can write, edit, and publish articles with rich text formatting and multimedia support." },
    { title: "Social Media App", description: "Build a social media application with features like user profiles, friend requests, posts, likes, and comments." },
    { title: "Online Learning Portal", description: "Design a platform for online courses, including features for video lectures, quizzes, and student progress tracking." },
    { title: "Portfolio Website", description: "Develop a personal portfolio website to showcase your projects, skills, and experience, with contact forms and interactive elements." },
    { title: "Task Management App", description: "Create a task management tool where users can create, edit, and delete tasks, and organize them into projects with due dates and priorities." },
    { title: "Weather Forecast App", description: "Build an application that shows real-time weather information for any location using an external API." },
    { title: "Chat Application", description: "Develop a real-time chat application with user authentication, private messages, and group chat capabilities." },
    { title: "Fitness Tracker", description: "Create a fitness tracker app that allows users to log workouts, track progress, and set fitness goals." },
    { title: "Recipe Sharing Platform", description: "Design a platform where users can share their favorite recipes, search by ingredients, and leave reviews." },
    { title: "Travel Booking Website", description: "Build a travel booking website where users can search for flights, hotels, and car rentals, and complete bookings online." },
    { title: "Financial Tracker", description: "Create an application for tracking personal finances, including income, expenses, and budgeting tools." },
    { title: "Event Management System", description: "Develop a system for managing events, including event creation, attendee registration, and schedule management." },
    { title: "News Aggregator", description: "Build a news aggregator that collects news from various sources and displays them in a customizable interface." },
    { title: "Online Quiz System", description: "Create an online quiz platform with different question types, time limits, and scoring functionality." },
  ];

  return (
    <div className="suggested-projects-container">
        {
            props && (
                <>
      <p>Based on your course completion, the following profiles are recommended for your next steps:</p>
      <ul>
        <li>{props.props}</li>
        
      </ul>
      </>
            )
        }
      <h2>Suggested Projects</h2>
      <ul className="projects-list">
        {projects.map((project, index) => (
          <li key={index} className="project-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedProjects;
