// ChatWindow.jsx
import React, { useState } from 'react';
import './styles.css'; 
import logo from '../assets/logo.png';

const questionFunnel = {
    Gutters: {
        question: "What type of gutters are you interested in?",
        options: ['K-style', 'Half-round', 'Box'],
    },
    'Bathroom Remodeling': {
        question: "Does your bathroom remodel require removing or adding walls?",
        options: ['Yes', 'No'],
    },
    'Home Security': {
        question: "What type of security system are you looking for?",
        options: ['Smart','Traditional'],
    },
    'Concrete Work':{
        question: "What type of concrete work do you need?",
        options: ['Driveway','Patio'],
    },
    'Landscaping':{
        question:"What type of landscaping service do you need?",
        options: ['Tree Trimming','Garden Design','Flowerbed Mowing','Garden Maintaining'],
    },
    'Electrical Works':{
        question:"Do you need electrical wiring upgrades?",
        options:['Yes','No'],
    },
    'Plumbing':{
        question:"What type of plumbing service do you need?",
        options:['Leak Repair','Drain Cleaning','Toilet Repair','BAsin Repair'],
    }
};

const serviceDetails = {
    'Gutters':{
        'K-style': {
            question: "What is the nature of the service?",
            options: ['Install', 'Repair'],
        },
        'Half-round': {
            question: "What is the nature of the service?",
            options: ['Install', 'Repair'],
        },
        'Box': {
            question: "What is the nature of the service?",
            options: ['Install', 'Repair'],
        },
    },
    'Bathroom Remodeling': {
        'Yes': {
            question: "Do you want to install new tiles or reface?",
            options: ['Install new tiles', 'Refacing'],
        },
        'No': {
            question: "Do you want to install new tiles or reface?",
            options: ['Install new tiles', 'Refacing'],
        },
    },
    'Home Security': {
        'Smart':{
            question: "What is the nature of the installation?",
            options: ['Full installation','Partial Installation'],
        },
        'Traditional':{
            question:"What is the nature of the installation?",
            options: ['Basic Installation','Basic Monitoring','Basic Repair'],
        },
    },
    'Concrete Work': {
        'Driveway':{
            question: "What is the nature of the service?",
            options: ['Resurface', 'Full replacement'],
        },
        'Patio':{
            question: "What is the nature of the service?",
            options: ['Resurface','Full replacement'],
        },
    },
    'Landscaping':{
        question: "What type of landscaping service do you need?",
        options: ['Tree Trimming','Garden Design','Flowerbed Mowing','Garden Maintaining'],
    },
    'Electrical Works':{
        'Yes':{
            question:"What type of service do you need?",
            options: ['Upgrade to 220V','Install New Fixtures']
        },
    },
    'Plumbing':{
        question:"What type of plumbing service do you need?",
        options:['Leak Repair','Drain Cleaning','Toilet Repair','Basin Repair'],
    }
};
const userDetailsQuestions= [
    { question: "Okay,Now Kindly let me know your email Id ", field:"email" },
    { question: "Please enter your phone number", field:"phone"},
    { question: "Enter your complete address", field:"address"},
    { question: "Enter pincode", field:"pincode"},
];

const ChatWindow = ({ name, onClose }) => {
    const [selectedService, setSelectedService] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [collectingDetails, setCollectingDetails] = useState(false); 
    const [detailIndex, setDetailIndex] = useState(0); 
    const [userInput, setUserInput] = useState('');
    const [userDetails, setUserDetails] = useState({
        email: '',
        phone: '',
        address: '',
        pin: '',
    });

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setResponses(prev => [...prev, `You have opted for ${service}.`]);
        const { question, options } = questionFunnel[service];
        setCurrentQuestion(question);
        setOptions(options);
    };

    const handleOptionSelect = (option) => {
        setResponses(prev => [...prev, {from : name,text: option}]);
        const nextStep = serviceDetails[selectedService][option];
        if(nextStep && nextStep.question && nextStep.options){
            setCurrentQuestion(nextStep.question);
            setOptions(nextStep.options);
        }else{
            setCurrentQuestion('');
            setOptions([]);
            setCollectingDetails(true);
            setCurrentQuestion(userDetailsQuestions[0].question);
        }
    };
    const handleUserInput = (e) =>{
        setUserInput(e.target.value);
    }
    const handleSubmitUserInput = () => {
        const currField = userDetailsQuestions[detailIndex].field;
        setResponses(prev => [...prev, { from: name, text: userInput }]);
        setUserDetails({ ...userDetails,[currField]:userInput});
        setUserInput('');
        if(detailIndex < userDetailsQuestions.length-1){
            const nxtIndex = detailIndex+1;
            setDetailIndex(nxtIndex);
            setCurrentQuestion(userDetailsQuestions[nxtIndex].question);
        }
        else{
            setCurrentQuestion('Awesome!, Thank you for your details. We will contact you soon.');
            setCollectingDetails(false);
        }
    };

    return (
        <div className="chatbox-overlay">
            <div className="chatbox">
                <button onClick={onClose} className='close-btn'>X</button>
                <h3 style={{textAlign:'center',marginBottom:'10px'}}>Home Improvement Services</h3>
                {responses.map((response, index) => (
                    <div key={index} className={response.from === 'Bot' ? "bot-message":"user-message"}>
                        <p><strong>{response.from === 'Bot' ? "Bot" : name}:</strong>{response.text}</p>
                    </div>
                ))}

                {!selectedService && (
                    <div className="service-options">
                        {Object.keys(questionFunnel).map(service => (
                            <div key={service} className="option">
                                <input 
                                    type="radio" 
                                    id={service} 
                                    name="service" 
                                    value={service} 
                                    onChange={() => handleServiceSelect(service)} 
                                />
                                <label htmlFor={service}>{service}</label>
                            </div>
                        ))}
                    </div>
                )}

                {currentQuestion && (
                    <div className="current-question">
                        <div className="bot-message">
                            <img src={logo} alt="Bot Logo" className="bot-logo" />
                            <p><strong>Bot: </strong>{currentQuestion}</p>
                        </div>
                        {!collectingDetails && options.length>0 && options.map(option => (
                            <div key={option} className="option">
                                <input 
                                    type="radio" 
                                    id={option} 
                                    name="question" 
                                    value={option} 
                                    onChange={() => handleOptionSelect(option)} 
                                />
                                <label htmlFor={option}>{option}</label>
                            </div>
                        ))}
                        {collectingDetails && (
                            <div className='user-input-section'>
                                <input
                                    className='input-data'
                                    type='text'
                                    value={userInput}
                                    onChange={handleUserInput}
                                    placeholder='Type your response here...'
                                />
                                <button onClick={handleSubmitUserInput}>Submit</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;