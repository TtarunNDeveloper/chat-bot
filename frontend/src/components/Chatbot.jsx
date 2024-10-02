// Chatbot.jsx
import React, { useState } from 'react';
import ChatWindow from './ChatWindow'; 
import './styles.css'; 
const Chatbot = () => {
    const [name, setName] = useState('');
    const [showChat, setShowChat] = useState(false);

    const handleContinue = () => {
        if (name) {
            setShowChat(true);
        }

    };
    const handleCloseChat = () => {
        setShowChat(false);
    };

    return (
        <div>
            {!showChat ? (
                <div className="initial-input">
                    <h1>Welcome to Home Improvement Services</h1>
                    <input 
                        className='input-field'
                        type="text" 
                        placeholder="Enter your name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <button onClick={handleContinue} className='continue-btn'>Continue</button>
                </div>
            ) : (
                <ChatWindow name={name} onClose={handleCloseChat} />
            )}
        </div>
    );
};

export default Chatbot;
