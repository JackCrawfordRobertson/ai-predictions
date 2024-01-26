import React, {useState, useEffect} from "react";
import Logo from "./logo.svg";
import "./App.css";
import Typewriter from "react-typewriter-effect";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {motion} from "framer-motion";
import {firestore} from "./firebase";
import {collection, query, orderBy, limit, getDocs, addDoc} from "firebase/firestore";

import "./App.css";
import "./TypingEffect.css";

function App() {
    const initialText =
        "What is the scale of CO2 emissions generated since the beginning of the Israel-Gaza conflict? While in the West, we focus on small savings in Co2 emissions,";
    const secondText =
        " we are ignoring the elephant in the room. The elephant is the war in the middle east. The war in the middle east has been going on for decades and has produced more co2 emissions than any other war in history. The war in the middle east has produced more co2 emissions than the entire country of the United States. The war in the middle east has produced more co2 emissions than the entire country of China. The war in the middle east has produced more co2 emissions than the entire country of India. The war in the middle east has produced more co2 emissions than the entire country of Russia. The war in the middle east has produced more co2 emissions than the entire country of Japan. The war in the middle east has produced more co2 emissions than the entire country of Germany.";

    // eslint-disable-next-line no-unused-vars
    const [ textPart1, setTextPart1 ] = useState(initialText);
    const [ textPart2, setTextPart2 ] = useState("");
    const [ showUserInput, setShowUserInput ] = useState(false);
    const [ typewriterKey, setTypewriterKey ] = useState(0);
    const [ messages, setMessages ] = useState([]);
    const [ userInput, setUserInput ] = useState("");

    useEffect(() => {
        fetchMessages();
        const timeoutId = setTimeout(() => {
            setShowUserInput(true);
        }, 10000); // Delay for 10 seconds before showing user input

        return () => clearTimeout(timeoutId);
    }, []);

    const fetchMessages = async () => {
        const messagesCollectionRef = collection(firestore, "messages");
        // Create a query that orders messages by timestamp in descending order and limits to the last 3
        const q = query(messagesCollectionRef, orderBy("timestamp", "desc"), limit(3));
    
        const messagesSnapshot = await getDocs(q);
        const messagesData = messagesSnapshot.docs.map((doc) => doc.data());
        // Set the messages as they are fetched (newest first)
        setMessages(messagesData);
    };
    

    const handleChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async () => {
        if (!textPart2) {
            setTextPart2(secondText);
            setTypewriterKey((prevKey) => prevKey + 1);
        }

        if (userInput.trim() !== "") {
            const messagesCollectionRef = collection(firestore, "messages");
            await addDoc(messagesCollectionRef, {
                content: userInput,
                timestamp: new Date(),
            });

            setUserInput("");
            fetchMessages();
        }
    };

    const formatDate = (timestamp) => {
        // Convert Firestore Timestamp to JavaScript Date object
        const date = timestamp.toDate();
        // Format the date as you prefer, e.g., 'MM/DD/YYYY, h:mm a'
        return date.toLocaleString();
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1 style={{marginTop: "0", color: "#333333"}}>
                    Our Voice Through AI <img src={Logo} alt="Logo" style={{width: ".8em", marginLeft: ".001"}} />
                </h1>

                <p className="responsive-paragraph">
                Read the beginning of the sentence below and try to guess what comes next. After making your guess, click the 'Submit' button to see the GitHub Copilot's suggestion from that day.
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
                            <TextField
                                label="What Next?"
                                variant="outlined"
                                style={{flex: 1, marginRight: "1em"}}
                                value={userInput}
                                onChange={handleChange} // Make sure this is being used
                            />{" "}
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
                    {showUserInput && (
                        <div className="messages-section">
                            <h3 style={{marginTop: "0", marginBottom:".5em", color: "#333333"}}>
                            Previous replies
                </h3>
                      {messages.map((message, index) => (
                          <div key={index} className="message">
                              <div className="message-content">{message.content}</div>
                              <div className="message-timestamp">{formatDate(message.timestamp)}</div>
                          </div>
                       ))}
                   </div>
                   
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
