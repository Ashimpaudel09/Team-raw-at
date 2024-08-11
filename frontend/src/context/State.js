import React, { useState, useEffect } from 'react';
import Context from './Context'; // Adjust the import path as necessary

const State = (props) => {
  const [profileId, setProfileId] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling
  const authToken = localStorage.getItem('user_token'); // Ensure this token is available
  const [alluserdetails, setalluserdetails] = useState([]);

  const fetchAllUserDetails = async ()=>{
    const url = `http://localhost:5000/api/alluserdetails`
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
      setalluserdetails(data);
     
    }
    catch{
      setError('Failed to fetch user details.');
    }
  }
  // useEffect(()=>{
  //   fetchAllUserDetails();
  // }, [])
  const fetchUserDetails = async (userId) => {
    setLoading(true); // Set loading to true when starting the fetch
    const url = `http://localhost:5000/api/users/${userId}`; // Use the userId dynamically
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "auth-token": authToken
        }
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      setUserDetails(data); // Update the state with the fetched user details
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Failed to fetch user details.'); // Set error message
    } finally {
      setLoading(false); // Set loading to false after the fetch
    }
  };

  useEffect(() => {
    // Example usage: fetch user details when profileId changes
    if (profileId) {
      fetchUserDetails(profileId);
    }
  }, [profileId]);

  return (
    <Context.Provider value={{
      fetchUserDetails,
      userDetails,
      loading,
      setalluserdetails,
      error,
      fetchAllUserDetails,
      alluserdetails,
      setProfileId // Provide setProfileId to update profileId from other components
    }}>
      {props.children}
    </Context.Provider>
  );
};

export default State;
