console.log("Chatbot script starting...");

document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM fully loaded and parsed");

    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');

    console.log("Elements selected:", { chatbotIcon, chatbotWindow, closeChat, chatMessages, userInput });

    if (chatbotIcon) {
        chatbotIcon.addEventListener('click', () => {
            console.log("Chat icon clicked");
            chatbotWindow.classList.toggle('hidden');
        });
    } else {
        console.error("Chat icon not found");
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            console.log("Close chat clicked");
            chatbotWindow.classList.add('hidden');
        });
    } else {
        console.error("Close chat button not found");
    }

    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = userInput.value.trim();
                console.log("User pressed Enter. Message:", message);
                if (message) {
                    addMessage('user', message);
                    respondToUser(message);
                    userInput.value = '';
                }
            }
        });
    } else {
        console.error("User input field not found");
    }

    function addMessage(sender, message) {
        console.log(`Adding message from ${sender}:`, message);
        if (chatMessages) {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${sender}: ${message}`;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
            console.error("Chat messages container not found");
        }
    }
    function respondToUser(message) {
        console.log("Responding to user message:", message);
        const response = "I received your message: " + message;
        return response;
    }
});