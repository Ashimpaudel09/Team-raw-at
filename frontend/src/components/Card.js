import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faVideo, faPaperclip, faPaperPlane, faMicrophone, faImage } from '@fortawesome/free-solid-svg-icons';

const formatTime = (timestamp) => {
  const now = new Date();
  const messageTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - messageTime) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 7) {
    return `${Math.floor(diffInDays / 7)}w ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays}d ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours}h ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}m ago`;
  } else {
    return `${diffInSeconds}s ago`;
  }
};

export default function Card({ detail }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [name, setname] = useState('');

  const addusername = async (userId)=>{
    const url = `http://localhost:5000/api/getuser/${userId}`
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
        console.log(data.name)
      }
      catch{
        console.log('g')
      }
  }
useEffect(()=>{
  addusername(detail.user)
})

  const id = detail.user === localStorage.getItem('userId');
  const chatKey = `chat_${detail.user}`;

  useEffect(() => {
    const storedMessages = localStorage.getItem(chatKey);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [chatKey]);

  const handleSendMessage = () => {

    if (newMessage.trim()) {
      const updatedMessages = [
        ...messages,
        { text: newMessage, sender: 'user', timestamp: new Date().toISOString() }
      ];

      if (messages.length === 0) {
        updatedMessages.push({
          text: `Hi, I am ${name}. How can I help you?`,
          sender: 'response',
          timestamp: new Date().toISOString()
        });
      }

      setMessages(updatedMessages);
      setNewMessage('');
      localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
    }
  };

  const handleAttachFile = () => {
    alert('Attach file feature is under development!');
  };

  const handleVoiceMessage = () => {
    alert('Voice message feature is under development!');
  };

  const handleImageAttachment = () => {
    alert('Image attachment feature is under development!');
  };

  return (
    <>
      {!id && (
        <div className="profile-card">
          <h2>{name}</h2>
          <img src={detail.pphoto || "https://via.placeholder.com/100"} alt="Profile" className="profile-pic" />
          <p>
            {detail.skills.map((skill, index) => (
              <span key={index}>{skill} | </span>
            ))}
          </p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fas fa-envelope"></i></a>
            <a href="#"><i className="fas fa-globe"></i></a>
          </div>
          <div className='tala'>
            <button
              className="follow-btn send-dm-btn"
              onClick={() => setIsChatOpen(true)}
            >
              Send DM
            </button>
            <Link className="follow-btn visit-profile-btn" style={{ textDecoration: 'none' }} to={`/userdetail/${detail.user}`} >
              Visit Profile
            </Link>
          </div>
        </div>
      )}

      {isChatOpen && (
        <>
          <div className="chat-overlay" onClick={() => setIsChatOpen(false)}></div>
          <div className="chat-popup">
            <div className="chat-header">
              <Link to={`/userdetail/${detail.user}`} className="chat-username">
                <img src={detail.pphoto || "https://via.placeholder.com/50"} alt="User" className="chat-user-pic" />
                {name}
              </Link>
              <div className="chat-actions">
                <button onClick={() => alert('Audio Call feature is under development!')} className="chat-action-btn">
                  <FontAwesomeIcon icon={faPhone} />
                </button>
                <button onClick={() => alert('Video Call feature is under development!')} className="chat-action-btn">
                  <FontAwesomeIcon icon={faVideo} />
                </button>
                <button onClick={() => setIsChatOpen(false)} className="close-chat">X</button>
              </div>
            </div>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.text}
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              ))}
            </div>
            <div className="chat-input-area">
              <button onClick={handleVoiceMessage} className="voice-message-btn">
                <FontAwesomeIcon icon={faMicrophone} />
              </button>
              <button onClick={handleImageAttachment} className="image-attachment-btn">
                <FontAwesomeIcon icon={faImage} />
              </button>
              <button onClick={handleAttachFile} className="attach-file-btn">
                <FontAwesomeIcon icon={faPaperclip} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="chat-input"
              />
              <button onClick={handleSendMessage} className="send-message-btn">
                <span className="send-message-text">Send</span>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
