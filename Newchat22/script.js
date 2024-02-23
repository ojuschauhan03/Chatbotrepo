const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatHistory = document.querySelector(".chat-history");

import OpenAI from "openai";

const openai = new OpenAI();

// Replace YOUR_OPENAI_API_KEY with your actual OpenAI API key
const apiKey = "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";

const generateChatMessage = async (message) => {
  // Show typing indicator while waiting for response
  const typingIndicator = document.createElement("div");
  typingIndicator.classList.add("message", "bot-message");
  typingIndicator.textContent = "...";
  chatHistory.appendChild(typingIndicator);
  chatHistory.scrollTop = chatHistory.scrollHeight;

  // Construct OpenAI API request data
  const requestData = {
    model: "gpt-4-turbo-preview", // Adjust model as needed
    prompt: message,
    max_tokens: 1024, // Adjust response length as needed
    temperature: 0.9, // Adjust response creativity as needed
  };

  

  // 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

  try {
    // Send the message to the ChatGPT API
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content:message }],
      model: "gpt-3.5-turbo",
      max_tokens : 1024,
      temperature : 0.9,
    });


    // Process the API response
    // const data = await response.json();
    // const botResponse = data.choices[0].text.trim(); // Extract chat response from generated text

    const botResponse = response.choices[0];

    // Create and render the bot message
    const botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot-message");
    botMessage.textContent = botResponse;
    chatHistory.appendChild(botMessage);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Remove the typing indicator
    typingIndicator.remove();
  } catch (error) {
    console.error("Error generating response:", error);

    // Handle API errors or network issues gracefully
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("message", "bot-message", "error");
    errorMessage.textContent = "An error occurred. Please try again later.";
    chatHistory.appendChild(errorMessage);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    typingIndicator.remove();
  }
};

sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();

  if (message) {
    // Clear the input field
    messageInput.value = "";

    // Add the user's message to the chat history
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.textContent = message;
    chatHistory.appendChild(userMessage);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Generate and display the bot's response
    generateChatMessage(message);
  }
});

// (Optional) Add event listeners for other interaction possibilities,
// such as text recognition, speech input, or image processing.
