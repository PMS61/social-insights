"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Define LangflowClient
class LangflowClient {
  constructor(baseURL, applicationToken) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        mode: "no-cors",
        body: JSON.stringify(body),
      });

      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText} - ${JSON.stringify(
            responseMessage
          )}`
        );
      }
      return responseMessage;
    } catch (error) {
      console.error("Request Error:", error.message);
      throw error;
    }
  }

  async runFlow(flowIdOrName, langflowId, inputValue, inputType, outputType, tweaks, stream) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowIdOrName}?stream=${stream}`;
    return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks });
  }
}

// Chatbot Component
export default function LangflowChat() {
  const [selectedOption, setSelectedOption] = useState("reels");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    const combinedMessage = `${selectedOption}: ${message}`;
    setLoading(true);
    setResponse(""); // Clear previous response

    const langflowClient = new LangflowClient(
      "https://api.langflow.astra.datastax.com",
      process.env.LANGFLOW_KEY
    );

    const flowIdOrName = "f6f33e43-d287-4324-bbcb-dfa5a6684cac";
    const langflowId = "8653fa35-7a58-4d7d-b4ac-5dd13a7e9435";
    const tweaks = {
      "AstraDBToolComponent-a7nLF": {},
      "ChatInput-8rYRh": {},
      "ParseData-FnVXT": {},
      "CombineText-GzOdK": {},
      "GroqModel-lZXdU": {},
      "ChatOutput-ULP9K": {},
    };

    try {
      const response = await langflowClient.runFlow(
        flowIdOrName,
        langflowId,
        combinedMessage,
        "chat",
        "chat",
        tweaks,
        false
      );

      if (response && response.outputs) {
        const flowOutputs = response.outputs[0];
        const firstComponentOutputs = flowOutputs.outputs[0];
        const outputMessage = firstComponentOutputs.outputs.message.text;
        setResponse(outputMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
      setResponse("Error: Unable to fetch response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded shadow">
      <div className="flex items-center space-x-2">
        {/* Dropdown */}
        <select
          className="border p-2 rounded"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="reels">Reels</option>
          <option value="photo">Photo</option>
          <option value="carousel">Carousel</option>
          <option value="video">Video</option>
        </select>

        {/* Text Input */}
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading || !message}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Response Display */}
      <div className="mt-4 bg-gray-100 p-4 rounded">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
      </div>
    </div>
  );
}
