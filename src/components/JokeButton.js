import React, { useState } from "react";
import './JokeButton.css';

const JokeButton = ({ category, handleClick }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [joke, setJoke] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenPopup = async () => {
    setShowPopup(true);
    const data = await handleClick(category);
    setJoke(data.value);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button onClick={() => handleOpenPopup()} className="btn-category"> 
        <div className="cate">
        {category} 
        </div>
        
        <p> Unlimited jokes on {category} </p>
      </button>
      {showPopup === true ? (
        <>
          <div className="popup">
            <h2 className = 'catHead'> {category}</h2>
              <p> {joke} </p>
            <button className="closeBtn" onClick={handleClosePopup}> Close </button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default JokeButton;
