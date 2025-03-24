import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WritingBar.scss";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function WritingBar({ userInput, setUserInput, onSubmitMessage, onBack, onSave, onNext }) {
  const [inputText, setInputText] = useState(userInput || "");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputText(value);
    if (setUserInput) {
      setUserInput(value); 
    }
  };

  const handleSubmit = () => {
    if (inputText.trim() === "") return;
    
    if (onSubmitMessage) {
      onSubmitMessage(inputText);
      setInputText("");
    } else {
      console.error("onSubmitMessage function is not defined");
    }
  };

  return (
    <div className="writingbar">
      <div className="input-box">
        <textarea
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className="text-input"
          placeholder="Type your message here..."
        />
        <div className="submit" onClick={handleSubmit}>
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="20" fill="#6C3C86"/>
                <path d="M25.9853 19.2629L25.9853 19.2628L21.1581 14.4356L21.0781 14.3556V14.4688V28.25C21.0781 28.536 20.9645 28.8102 20.7623 29.0124C20.5601 29.2146 20.2859 29.3282 20 29.3282C19.714 29.3282 19.4398 29.2146 19.2376 29.0124C19.0354 28.8102 18.9218 28.536 18.9218 28.25V14.4688V14.3557L18.8418 14.4356L14.0128 19.2628L14.0128 19.2628C13.8102 19.4654 13.5355 19.5792 13.249 19.5792C12.9626 19.5792 12.6878 19.4654 12.4853 19.2628C12.2827 19.0603 12.1689 18.7856 12.1689 18.4991C12.1689 18.2126 12.2827 17.9379 12.4853 17.7354L19.2353 10.9854L19.2353 10.9853C19.3355 10.8848 19.4545 10.8051 19.5856 10.7506C19.7166 10.6962 19.8571 10.6682 19.999 10.6682C20.1409 10.6682 20.2814 10.6962 20.4125 10.7506C20.5435 10.8051 20.6625 10.8848 20.7627 10.9853L20.7628 10.9854L27.5128 17.7354L27.5128 17.7354C27.6133 17.8356 27.6931 17.9546 27.7475 18.0857C27.8019 18.2167 27.8299 18.3572 27.8299 18.4991C27.8299 18.641 27.8019 18.7815 27.7475 18.9125C27.6931 19.0436 27.6133 19.1626 27.5128 19.2628L27.5127 19.2629C27.4125 19.3634 27.2935 19.4431 27.1625 19.4976C27.0314 19.552 26.8909 19.58 26.749 19.58C26.6071 19.58 26.4666 19.552 26.3356 19.4976C26.2045 19.4431 26.0855 19.3634 25.9853 19.2629Z" fill="white" stroke="white" strokeWidth="0.09375"/>
            </svg>
        </div>
      </div>
      <div className="changes-box">
        <button className="back btn" onClick={onBack}>Back</button>
        <button className="save btn" onClick={onSave}>Save</button>
        <button className="next btn" onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

export default WritingBar;
