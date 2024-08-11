import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/media.css'; // Update this path if needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

const UserDetail = () => {
  const { id } = useParams(); // Use 'id' from the URL
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setname] = useState('');

  const addusername = async (userId)=>{
    const url = `http://localhost:5000/api/getuser/${id}`
      try{
        const response = await fetch(url, 
          {
            method: 'GET'
          }, 
        )
        if(!response.ok){
          throw new Error(`Response status : ${response.status}`);
        }
        const data = await response.json();
        setname(data.name);
      }
      catch{
        console.log('g')
      }
  }
useEffect(()=>{
  addusername()
})
  useEffect(() => {

    
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('user_token') // Assuming token is needed
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        setError('Failed to fetch user details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!userDetails) return <p>No user details found.</p>;

  return (
    <div className="userProfileCard">
      <div className="userProfilePhoto">
        <img src={userDetails.pphoto} alt="Profile Photo" />
      </div>
      <div className="userProfileInfo">
        <h1>{name || "User's Name"}</h1>
        <p className="userTitle">
          {userDetails.education.level} | {userDetails.education.field}
        </p>
        <p className="userInstitute">
          {userDetails.education.institution}
          <br />
          Nuwakot District, Nepal
        </p>
        <p className="userConnections">{userDetails.connections || "131"} connections</p>
      </div>
      <div className="userAbout">
        <h2>About</h2>
        <p>
          Hello, I am a student with a passion for learning new things,
          problem-solving, and always improving myself.
        </p>
      </div>
      <div className="userEducation">
        <h2>Education</h2>
        <p>
          {userDetails.education.level} in {userDetails.education.field}
          <br />
          {userDetails.education.institution}
        </p>
      </div>
      <div className="userSkills">
        <h2>Skills</h2>
        <ul>
          {userDetails.skills && userDetails.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="userActions">
        {userDetails.links?.socialLinks.map((link, index) => (
          <a href={link} key={index} target="_blank" rel="noopener noreferrer">
            {link.includes('facebook') && <FontAwesomeIcon icon={faFacebookF} />}
            {link.includes('twitter') && <FontAwesomeIcon icon={faTwitter} />}
            {link.includes('linkedin') && <FontAwesomeIcon icon={faLinkedinIn} />}
            {link.includes('github') && <FontAwesomeIcon icon={faGithub} />}
          </a>
        ))}
      </div>
    </div>
  );
};

export default UserDetail;
