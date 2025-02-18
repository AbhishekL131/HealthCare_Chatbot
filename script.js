async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    // Display user message
    let chatBox = document.getElementById("chat-box");
    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.innerHTML = `💬 ${userInput}`;
    chatBox.appendChild(userMessage);

    // Clear input
    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send request to FastAPI
    let response = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    });

    let data = await response.json();

    // Display bot response
    let botMessage = document.createElement("div");
    botMessage.classList.add("bot-message");
    botMessage.innerHTML = `🤖 ${data.status === "success" ? data.response : "Sorry, I couldn't understand that."}`;
    chatBox.appendChild(botMessage);

    chatBox.scrollTop = chatBox.scrollHeight;
}
