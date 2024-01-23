import React from 'react';
import Typewriter from 'react-typewriter-effect';

const TypingEffect = ({ text }) => {
    return (
        <div className="typing-container">
            <Typewriter
                text={text}
                typeSpeed={50}
                cursorColor="#3DA9DE"
            />
        </div>
    );
};

export default TypingEffect;
