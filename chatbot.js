console.log("Chatbot script starting...");

document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM fully loaded and parsed");

    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');

    console.log("Elements selected:", { chatbotIcon, chatbotWindow, closeChat, chatMessages, userInput });

    chatbotIcon.addEventListener('click', () => {
        console.log("Chat icon clicked");
        chatbotWindow.classList.toggle('hidden');
    });

    closeChat.addEventListener('click', () => {
        console.log("Close chat clicked");
        chatbotWindow.classList.add('hidden');
    });

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

    function addMessage(sender, message) {
        console.log(`Adding message from ${sender}:`, message);
        const messageElement = document.createElement('div');
        messageElement.classList.add('mb-2', sender === 'user' ? 'text-right' : 'text-left');
        messageElement.innerHTML = `<span class="inline-block p-2 rounded-lg ${sender === 'user' ? 'bg-blue-100' : 'bg-gray-200'}">${message}</span>`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function respondToUser(message) {
        console.log("Responding to user message:", message);
        const lowercaseMessage = message.toLowerCase();
        let response = "I'm sorry, I don't have information about that. Can you ask me something related to my skills or projects?";

        if (lowercaseMessage.includes('network') || lowercaseMessage.includes('security')) {
            response = "I specialize in network configuration and information security. I can help with implementing firewalls, securing cloud infrastructure, and performing vulnerability assessments.";
        } else if (lowercaseMessage.includes('project')) {
            response = "One of my key projects was a network segmentation project where I implemented VLAN segmentation and configured firewall rules for improved security.";
        } else if (lowercaseMessage.includes('skill')) {
            response = "My skills include network configuration, information security, ethical hacking, cloud security, encryption technologies, and data protection.";
        } else if (lowercaseMessage.includes('contact') || lowercaseMessage.includes('email')) {
            response = "You can contact me at sjackson4430@gmail.com. I'm always open to discussing new opportunities or projects!";
        } else if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
            response = "Hello! How can I assist you today? Feel free to ask about my skills, projects, or how to get in touch.";
        }

        console.log("Bot response:", response);
        setTimeout(() => {
            addMessage('bot', response);
        }, 500);
    }

    // Initial greeting
    setTimeout(() => {
        console.log("Sending initial greeting");
        addMessage('bot', "Hello! I'm the portfolio chatbot. How can I help you today?");
    }, 1000);
});

console.log("Chatbot script completed");