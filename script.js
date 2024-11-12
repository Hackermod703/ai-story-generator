async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    displayMessage('user', userInput);
    document.getElementById('user-input').value = '';

    // Call the OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }],
            max_tokens: 100
        })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;
    displayMessage('bot', botReply);
}

function displayMessage(sender, message) {
    const conversation = document.getElementById('conversation');
    const messageElem = document.createElement('div');
    messageElem.className = `message ${sender}`;
    messageElem.textContent = message;
    conversation.appendChild(messageElem);
}
