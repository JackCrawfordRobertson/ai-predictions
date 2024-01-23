import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./TypingEffect.css"; // Update the import to point to the new CSS file

const UserInput = ({ onButtonClick }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Delay the animation for 2 seconds
        const timeoutId = setTimeout(() => {
            setAnimate(true);
        }, 2000);

        return () => clearTimeout(timeoutId); // Cleanup timeout
    }, []);

    return (
        <div className={`user-input-container ${animate ? "animate" : ""}`}>
            <TextField
                label="How do you think the sentence continues?"
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
                    fontFamily: "Inter, sans-serif", // Set the font family
                }}
                onClick={onButtonClick}
            >
                Submit
            </Button>
        </div>
    );
};

export default UserInput;