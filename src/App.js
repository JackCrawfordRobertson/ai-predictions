import React, { useState, useEffect } from "react";
import Logo from "./logo.svg";
import "./App.css";
import Typewriter from 'react-typewriter-effect';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./TypingEffect.css";

function App() {
    const initialText = "What is the scale of CO2 emissions generated since the beginning of the Israel-Gaza conflict? While in the West, there is a significant emphasis on small savings in CO2...";
    const secondText = " Emissions, we are ignoring the elephant in the room. The elephant is the war in the Middle East...";

    const [textPart1, setTextPart1] = useState(initialText);
    const [textPart2, setTextPart2] = useState("");
    const [showUserInput, setShowUserInput] = useState(false);
    const [typewriterKey, setTypewriterKey] = useState(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowUserInput(true);
        }, 10000); // Delay for 10 seconds before showing user input

        return () => clearTimeout(timeoutId);
    }, []);

    const handleSubmit = () => {
        if (!textPart2) {
            setTextPart2(secondText); // Only set second text if it's not already set
            setTypewriterKey(prevKey => prevKey + 1); // Increment the key to force re-render
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1 style={{ marginTop: "0" }}>
                    Our Voice Through AI <img src={Logo} alt="Logo" style={{ width: ".8em", marginLeft: ".001" }} />
                </h1>

                <p className="responsive-paragraph">
                    Read the start of the sentence below and give a guess to what you think should come next. Then click the Submit button to see what the GitHub Copilot thought on the day.
                </p>
                <div className="typing-container">
                    <Typewriter
                        text={textPart1 + textPart2}
                        typeSpeed={50}
                        cursorColor="#3DA9DE"
                        key={typewriterKey}
                    />
                </div>
                {showUserInput && (
                    <div className={`user-input-container ${showUserInput ? "animate" : ""}`}>
                        <TextField
                            label="What do you think?"
                            variant="outlined"
                            fullWidth
                            style={{ marginTop: "2em" }}
                        />
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: "#3DA9DE",
                                color: "white",
                                marginTop: "2em",
                                fontFamily: "Inter, sans-serif",
                            }}
                            onClick={handleSubmit}
                        >
                            Submit
                       </Button>
                    </div>

                )}
            </header>
        </div>
    );
}

export default App;
