import React from 'react';
import ChatBot from'react-simple-chatbot';
import './../css/main.css';
const steps = [
    {
        id: '1',
        message: 'What is your name?',
        trigger: '2',
      },
      {
        id: '2',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        message: 'Hi {previousValue}, nice to meet you!',
        end: true,
      },
];
class Chatbot extends React.Component {
   render() {
      return (
         <div className="chatbot">
            <ChatBot 
                headerTitle="iCart Chatbot"
                speechSynthesis={{ enable: true, lang: 'en' }}    
                steps={steps} 
            />
         </div>
      );
   }
}
export default Chatbot;
