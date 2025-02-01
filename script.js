// DOM elements
const leftOutput = document.getElementById("leftOutput");
const rightOutput = document.getElementById("rightOutput");
const leftModelSelect = document.getElementById("leftModelSelect");
const rightModelSelect = document.getElementById("rightModelSelect");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

/**
 * Calls the Pollinations text generation API with a prompt and model.
 * First it tries a direct call; if that fails (due to CORS), it uses a proxy fallback.
 * @param {string} model - The model name.
 * @param {string} prompt - The user prompt.
 * @returns {Promise<string>} - Resolves to the generated text.
 */
async function callPollinations(model, prompt) {
  const endpoint = '/llm_side_by_side/proxy.php';
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ],
      seed: 42,
      model: model
    })
  };

  // First, try the direct fetch
  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const responseText = await response.text();
    try {
      const data = JSON.parse(responseText);
      return (data?.choices && data.choices[0]?.message?.content) || "No response received.";
    } catch (jsonError) {
      // Not JSON – return the plain text response.
      return responseText;
    }
  } catch (error) {
    console.error("Direct fetch failed, attempting proxy fallback:", error);
    // Fallback: use a public proxy to bypass CORS restrictions
    const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
    try {
      const response = await fetch(proxyUrl + endpoint, options);
      if (!response.ok) throw new Error(`HTTP error via proxy! status: ${response.status}`);
      const responseText = await response.text();
      try {
        const data = JSON.parse(responseText);
        return (data?.choices && data.choices[0]?.message?.content) || "No response received.";
      } catch (jsonError) {
        return responseText;
      }
    } catch (proxyError) {
      console.error("Proxy fetch failed:", proxyError);
      return "Error: Unable to get response.";
    }
  }
}

/**
 * Updates a given output box with a waiting message,
 * then calls the API and updates the box with the final response.
 * @param {HTMLElement} outputBox - The element to update.
 * @param {HTMLSelectElement} selectElem - The dropdown element.
 * @param {string} prompt - The user prompt.
 */
async function updateOutput(outputBox, selectElem, prompt) {
  const modelValue = selectElem.value;
  const modelDescription = selectElem.options[selectElem.selectedIndex].text;
  
  outputBox.innerHTML = `<div class="model-description">${modelDescription}</div><div class="response-text">Waiting for response…</div>`;
  const resultText = await callPollinations(modelValue, prompt);
  outputBox.innerHTML = `<div class="model-description">${modelDescription}</div><div class="response-text">${resultText}</div>`;
}

/**
 * Reads the prompt and makes two separate API calls for both model selections.
 */
function sendMessage() {
  const prompt = userInput.value.trim();
  if (!prompt) return;
  
  userInput.value = "";
  updateOutput(leftOutput, leftModelSelect, prompt);
  updateOutput(rightOutput, rightModelSelect, prompt);
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
