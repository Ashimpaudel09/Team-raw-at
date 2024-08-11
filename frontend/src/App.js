import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import State from './context/State';
import ProtectedRoute from './components/ProtectedRoute';
import Academicform from './components/Academicform';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import UserDetail from './components/Userdetail';
import About from './components/About';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail'
import StudyBuddy from './components/StudyBuddy'
import video from './image/1.mp4'
import SuggestedProjects from './components/SuggestedProjects';
import AddCourse from './components/Addcourse';
function App() {
  const coursesDetails = {
    html5: {
      title: "HTML 5",
      description: "This course covers everything about HTML5, the latest version of the HyperText Markup Language. You'll learn how to structure web content effectively, make use of new semantic elements, and ensure compatibility across various devices.",
      scopes: ["Semantic HTML", "Forms", "Multimedia", "SEO Optimization"],
      examples: ["Portfolio Sites", "Company Landing Pages", "Blogs"],
      videoFile: video, // Add the video file path if available
    },
    css3: {
      title: "CSS 3",
      description: "In this course, you'll master the latest CSS3 features including Flexbox, Grid, transitions, and animations. You'll learn to style websites with precision and make them responsive to all screen sizes.",
      scopes: ["Responsive Design", "Advanced Layout Techniques", "Animations"],
      examples: ["Responsive Websites", "Interactive Web Apps", "User Dashboards"],
      videoFile: video,
    },
    javascript: {
      title: "JavaScript",
      description: "JavaScript is the backbone of interactive web development. This course covers everything from basic syntax to advanced concepts like asynchronous programming and DOM manipulation.",
      scopes: ["DOM Manipulation", "Event Handling", "Asynchronous Programming"],
      examples: ["Interactive Web Pages", "Single Page Applications (SPA)", "Real-time Web Apps"],
      videoFile: video,
    },
    sass: {
      title: "SASS",
      description: "Learn how to write more maintainable CSS with SASS, a CSS preprocessor that introduces variables, nesting, and more to make your styling more efficient and powerful.",
      scopes: ["Variables and Nesting", "Mixins and Functions", "Modular CSS"],
      examples: ["Themeable Sites", "Component-Based Styling", "Scalable Style Architectures"],
      videoFile: video,
    },
    jquery: {
      title: "jQuery",
      description: "This course will teach you how to simplify JavaScript tasks with jQuery. You'll learn how to select elements, create animations, handle events, and make AJAX calls effortlessly.",
      scopes: ["Element Selection", "Event Handling", "AJAX"],
      examples: ["Interactive Forms", "Dynamic Content Loading", "Simplified UI Interactions"],
      videoFile: video,
    },
    reactjs: {
      title: "React.js",
      description: "React.js is a powerful JavaScript library for building user interfaces. This course covers components, state management, hooks, and more to help you create scalable and fast web applications.",
      scopes: ["Component-Based Architecture", "State and Props", "Hooks"],
      examples: ["Single Page Applications (SPA)", "Interactive Dashboards", "Real-time Data Apps"],
      videoFile: video,
    },
    djangoflask: {
      title: "Django and Flask",
      description: "This course introduces you to Django and Flask, two powerful Python web frameworks. You'll learn how to create robust backends for web applications, handle databases, and secure your web services.",
      scopes: ["MVC Pattern", "ORM and Database Handling", "API Development"],
      examples: ["Blogging Platforms", "E-commerce Sites", "Content Management Systems"],
      videoFile: video,
    },
    kotlin: {
      title: "Kotlin",
      description: "Kotlin is the official language for Android development. This course will teach you Kotlin syntax, object-oriented programming, and how to develop Android applications from scratch.",
      scopes: ["Kotlin Syntax", "Android App Development", "Coroutines"],
      examples: ["Mobile Apps", "Games", "Productivity Tools"],
      videoFile: video,
    }
  };

  const CourseDetailWrapper = () => {
    const { slug } = useParams();
    const course = coursesDetails[slug];
    return <CourseDetail course={course} />;
  };


  return (
    <div>
      <State>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/userdetail" element={<UserDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/academicform" element={<Academicform />} />
            <Route path="/userdetail/:id" element={<UserDetail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/abouts" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/studybuddy" element={<StudyBuddy />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/suggestedprojects" element={<SuggestedProjects />} />
            <Route path="/course/:slug" element={<CourseDetailWrapper />} />
          </Routes>
        </Router>
      </State>
    </div>
  );
}

export default App;
