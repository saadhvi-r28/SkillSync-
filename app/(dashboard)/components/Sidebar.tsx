import { useState, ChangeEvent, FormEvent } from "react";

// Define the interface for the conversation messages
interface Message {
    role: "user" | "system";
    text: string;
}

// Define the props interface
interface SidebarProps {
    handleSubmit: (prompt: string) => void;
    conversation: Message[];
}

const Sidebar: React.FC<SidebarProps> = ({ handleSubmit, conversation }) => {
    const [prompt, setPrompt] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleSubmit(prompt);
        setPrompt("");
    };

    return (
        <div style={styles.sidebar}>
            <h2>AI Chat</h2>
            <div style={styles.conversationContainer}>
                {conversation.map((msg, index) => (
                    <div
                        key={index}
                        style={msg.role === "user" ? styles.userMsg : styles.systemMsg}
                    >
                        <strong>{msg.role === "user" ? "You" : "System"}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={onSubmit}>
                <textarea
                    value={prompt}
                    onChange={handleInputChange}
                    placeholder="Enter your response..."
                    style={styles.textarea}
                />
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    sidebar: {
        width: "300px",
        padding: "20px",
        borderRight: "1px solid #ddd",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: "#f4f4f4",
        zIndex: 1000, // Ensure sidebar is above other content
    },
    conversationContainer: {
        maxHeight: "60vh",
        overflowY: "scroll",
        marginBottom: "20px",
    },
    textarea: {
        width: "100%",
        height: "100px",
        padding: "10px",
        marginBottom: "10px",
        fontSize: "16px",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#0070f3",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
    },
    userMsg: {
        backgroundColor: "#e0f7fa",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "10px",
    },
    systemMsg: {
        backgroundColor: "#fff9c4",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "10px",
    },
};

export default Sidebar;
