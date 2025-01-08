"use client";
import React, { useState } from "react";
import { MessageSquare, Send, Image, Video, Film, Images } from "lucide-react";
import Loader from "./components/loader";
import ReactMarkdown from "react-markdown";

const App = () => {
  const [selectedType, setSelectedType] = useState("Reel");
  const [textInput, setTextInput] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    setIsLoading(true);
    const inputValue = `${selectedType}: ${textInput}`;

    try {
      const res = await fetch(
        "http://127.0.0.1:7861/api/v1/run/3fef6708-aae3-47d0-910a-eda9b36fb370?stream=false",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer <TOKEN>",
            "Content-Type": "application/json",
            "x-api-key": process.env.LANGFLOW_KEY,
          },
          body: JSON.stringify({
            input_value: inputValue,
            output_type: "chat",
            input_type: "chat",
            tweaks: {
              "AstraDBToolComponent-8UsiY": {},
              "ChatInput-5vrjR": {},
              "ParseData-ZLl7c": {},
              "CombineText-Ytto7": {},
              "GroqModel-rAumh": {},
              "ChatOutput-Nr4E2": {},
            },
          }),
        }
      );

      const data = await res.json();
      const extractedText = data.outputs?.[0]?.outputs?.[0]?.results?.message?.text || "No response text available.";
      setResponseText(extractedText);
    } catch (error) {
      console.error("Error:", error);
      setResponseText("Error fetching response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Reel":
        return <Film className="w-4 h-4" />;
      case "Carousel":
        return <Images className="w-4 h-4" />;
      case "Photo":
        return <Image className="w-4 h-4" />;
      case "Video":
        return <Video className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const RenderMarkdown = ({ markdownText }) => {
    return (
      <div className="markdown-container">
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </div>
    );
  };
  

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
          <div className="bg-gray-700 p-4 flex items-center gap-2">
            <MessageSquare className="text-blue-400 w-6 h-6" />
            <h1 className="text-white text-xl font-semibold">Instagram Insights</h1>
          </div>

          <div className="h-[500px] overflow-y-auto p-6">
          {!responseText && !isLoading && (
    <div className="text-gray-400 text-xl text-center space-y-4">
      <p className=" text-3xl font-semibold">Welcome to Instagram Insights!</p>
      <p>🚀 Get tailored insights for your Instagram content.</p>
      <p>💡 Choose a type (Reel, Carousel, Photo, or Video), enter your idea, and let us help you shine!</p>
      <p>🖊️ Start by typing your message below and hit "Send" to see the magic!</p>
    </div>
  )}
            {responseText && (
              <div className="bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700">
               <RenderMarkdown markdownText={responseText} />
              </div>
            )}
            {isLoading && <Loader />}
          </div>

          <div className="border-t border-gray-700 p-4 bg-gray-800">
            <form onSubmit={handleSubmit} className="flex gap-3 items-center">
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none bg-gray-700 border border-gray-600 text-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Reel">Reel</option>
                  <option value="Carousel">Carousel</option>
                  <option value="Photo">Photo</option>
                  <option value="Video">Video</option>
                </select>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  {getTypeIcon(selectedType)}
                </div>
              </div>

              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />

              <button
                type="submit"
                disabled={isLoading || !textInput.trim()}
                className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;