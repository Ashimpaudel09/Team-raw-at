import React, { useContext, useEffect, useState } from 'react';
import Card from './Card.js';
import '../css/card.css';
import Context from '../context/Context.js';
import homeimg from '../image/111.jpg'
export default function Home() {
  const context = useContext(Context);
  const { alluserdetails,setalluserdetails, fetchAllUserDetails } = context;
  const [details, setdetails] = useState([]);
 
  useEffect(() => {
    fetchAllUserDetails();
   
  }, []);
  
  useEffect(()=>{
   
      setdetails(alluserdetails)
    
  }, [alluserdetails])
  return (
    <div className='home'>
   

      
      <h2 style={{marginTop: '6%'}}>Find Study Buddies Here: </h2>
      <div className="profile-cards-container">
        {alluserdetails.length > 0 ? (
          details.map((detail) => (
            <Card detail={detail} key={detail._id} />
          ))
        ) : (
          <p>No profiles available.</p>
        )}
      </div>
      </div>
  
  );
}
