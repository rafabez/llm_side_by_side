# LLM’s Side by Side

![LLM’s Side by Side](https://interzone.art.br/llm_side_by_side/small_logo.png)

**LLM’s Side by Side** is a lightweight web interface for comparing AI language model responses in real time. Built using HTML, CSS, JavaScript, and PHP (for a server-side proxy), this project allows you to test and compare different AI models side by side.

---

## Features

- **Side-by-Side Comparison:** Two output panels display responses from different AI language models.
- **Model Selection:** Easily select from various models (OpenAI GPT-4o, Qwen, DeepSeek, etc.) using dropdown menus.
- **Real-Time API Calls:** Asynchronous requests fetch responses from the Pollinations API.
- **PHP Proxy:** A simple PHP script (`proxy.php`) bypasses CORS restrictions when calling the Pollinations API.
- **Responsive Design:** The layout adapts to different screen sizes.

---

## Repository Structure

```
llm_side_by_side/
├── index.html         # Main HTML file with meta tags and layout
├── style.css          # CSS file for styling the page
├── script.js          # JavaScript file for handling UI and API interactions
└── proxy.php          # PHP proxy script to forward API requests
```

---

## Live Demo

Check out the live demo here:  
[LLM’s Side by Side](https://interzone.art.br/llm_side_by_side/)

---

## How It Works

1. **User Input:**  
   The user enters a prompt in the text area at the bottom of the page and clicks the **Send** button.

2. **API Calls:**  
   The JavaScript function `sendMessage()` reads the prompt and calls `updateOutput()` for each model.  
   Each call uses the `callPollinations()` function, which sends a POST request with the prompt and selected model to the PHP proxy.

3. **PHP Proxy:**  
   The `proxy.php` file (hosted on your server) forwards the request to the Pollinations API and returns the response with proper CORS headers.

4. **Displaying Responses:**  
   The returned responses are parsed and displayed in their respective output boxes, each labeled with the chosen model’s name.

---

## Architecture Diagram

Below is an overview of the application's flow:

```
User Enters Prompt on Web Page
    ↓
sendMessage() in script.js
    ↓
callPollinations() Function
    ↓
PHP Proxy (proxy.php)
    ↓
Pollinations API
    ↓
PHP Proxy (proxy.php) Returns Response
    ↓
callPollinations() Parses Response
    ↓
Display Response in Output Boxes
```

---

## Setup & Deployment

1. **Clone or Download the Repository:**

   ```bash
   git clone https://github.com/rafabez/llm_side_by_side.git
   cd llm_side_by_side
   ```

2. **Upload Files to Your Server:**

   - Ensure all files (`index.html`, `style.css`, `script.js`, and `proxy.php`) are placed in the correct directory.
   - The PHP proxy should reside at:  
     `https://yourdomain/llm_side_by_side/proxy.php`

3. **Configure Your Domain:**

   - Adjust the endpoint in `script.js` if necessary (it should point to your PHP proxy).
   - Verify that `proxy.php` is accessible by visiting its URL in your browser.

4. **Access the Application:**

   Open your browser and navigate to:  
   `https://yourdomain/llm_side_by_side/`

---

## Social Sharing Meta Tags

The repository includes Open Graph and Twitter meta tags in `index.html` to ensure a proper thumbnail and description when shared on platforms like WhatsApp, Telegram, and Twitter. The thumbnail image used is:

```
https://interzone.art.br/llm_side_by_side/small_logo.png
```

---

## Troubleshooting

- **CORS Issues:**  
  Ensure the `proxy.php` file is correctly uploaded and accessible. The proxy must return the header `Access-Control-Allow-Origin: *`.

- **API Errors:**  
  Check the browser console and server logs for errors if responses from the Pollinations API are not received.

- **Diagram Not Displaying:**  
  If the architecture diagram is not displaying correctly in some Markdown viewers, try viewing the README in a standard text editor or ensure your Markdown renderer supports ASCII diagrams.

---

## License

This project is licensed under the **MIT License**.

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests with improvements and bug fixes.

---

*Happy comparing!*

