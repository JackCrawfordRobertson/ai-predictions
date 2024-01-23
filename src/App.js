import React, {useState, useEffect} from "react";
import Logo from "./logo.svg";
import "./App.css";
import Typewriter from "react-typewriter-effect";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {motion} from "framer-motion";

import "./TypingEffect.css";

function App() {
    const initialText =
        "What is the scale of C02 emissions generated since the beginning of the Israel-Gaza conflict? While in the West, there is a significant emphasis on small savings in Co2 emissions,";
    const secondText =
        " we are ignoring the elephant in the room. The elephant is the war in the middle east. The war in the middle east has been going on for decades and has produced more co2 emissions than any other war in history. The war in the middle east has produced more co2 emissions than the entire country of the United States. The war in the middle east has produced more co2 emissions than the entire country of China. The war in the middle east has produced more co2 emissions than the entire country of India. The war in the middle east has produced more co2 emissions than the entire country of Russia. The war in the middle east has produced more co2 emissions than the entire country of Japan. The war in the middle east has produced more co2 emissions than the entire country of Germany.";

    // eslint-disable-next-line no-unused-vars
    const [ textPart1, setTextPart1 ] = useState(initialText);
    const [ textPart2, setTextPart2 ] = useState("");
    const [ showUserInput, setShowUserInput ] = useState(false);
    const [ typewriterKey, setTypewriterKey ] = useState(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowUserInput(true);
        }, 10000); // Delay for 10 seconds before showing user input

        return () => clearTimeout(timeoutId);
    }, []);

    const handleSubmit = () => {
        if (!textPart2) {
            setTextPart2(secondText); // Only set second text if it's not already set
            setTypewriterKey((prevKey) => prevKey + 1); // Increment the key to force re-render
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1 style={{marginTop: "0", color: "#333333"}}>
                    Our Voice Through AI <img src={Logo} alt="Logo" style={{width: ".8em", marginLeft: ".001"}} />
                </h1>

                <p className="responsive-paragraph">
                    Read the start of the sentence below and give a guess to what you think should come next. Then click
                    the Submit button to see what the GitHub Copilot thought on the day.
                </p>
            </header>
            <div className="whole-section">
                <div className="graphic">
                    <div className="typing-container">
                        <Typewriter
                            text={textPart1 + textPart2}
                            typeSpeed={50}
                            cursorColor="#3DA9DE"
                            key={typewriterKey}
                        />
                    </div>
                    {showUserInput && (
                        <motion.div
                            initial={{y: 100, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{duration: 0.5, ease: "easeOut"}}
                            className="user-input-container"
                            style={{display: "flex", alignItems: "stretch", marginTop: "2em"}}
                        >
                            {/* TextField and Button components */}
                            <TextField label="What Next?" variant="outlined" style={{flex: 1, marginRight: "1em"}} />
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: "#3DA9DE",
                                    color: "white",
                                    fontFamily: "Inter, sans-serif",
                                    alignSelf: "stretch",
                                }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
