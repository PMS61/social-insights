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
        "https://aurum79-langflow.hf.space/api/v1/run/38c154f5-d743-4ec9-afad-d753a2b92b17?stream=false",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer <TOKEN>",
            "Content-Type": "application/json",
            "x-api-key": "sk-E3H0S7l1zWHCgYg2_QYgTqvODu1cCBg7PlK0IerwQtw",
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
      <div className="markdown-container prose prose-invert max-w-none">
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-700/80 to-gray-800/80 p-4 sm:p-6 flex items-center gap-3 border-b border-gray-700/50">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <MessageSquare className="text-blue-400 w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h1 className="text-white text-xl sm:text-2xl font-bold">Instagram Insights</h1>
          </div>

          {/* Content Area */}
          <div className="h-[calc(100vh-16rem)] sm:h-[600px] overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {!responseText && !isLoading && (
              <div className="text-gray-300 text-center space-y-6 py-12">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-8">Welcome to Instagram Insights!</h2>
                </div>
                <div className="space-y-4 text-lg sm:text-xl">
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-2xl">🚀</span>
                    Get tailored insights for your Instagram content
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-2xl">💡</span>
                    Choose your content type and share your ideas
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-2xl">✨</span>
                    Get AI-powered suggestions to enhance your content
                  </p>
                </div>
              </div>
            )}
            {responseText && (
              <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-700/50">
                <RenderMarkdown markdownText={responseText} />
              </div>
            )}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-700/50 p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-gray-700/50 border border-gray-600/50 text-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 hover:bg-gray-700/70"
                >
                  <option value="Reel">Reel</option>
                  <option value="Carousel">Carousel</option>
                  <option value="Photo">Photo</option>
                  <option value="Video">Video</option>
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  {getTypeIcon(selectedType)}
                </div>
              </div>

              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 bg-gray-700/50 border border-gray-600/50 text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-400 transition-all duration-200 hover:bg-gray-700/70"
              />

              <button
                type="submit"
                disabled={isLoading || !textInput.trim()}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-6 py-2.5 flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-700 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
              >
                <Send className="w-4 h-4" />
                <span className="font-medium">Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;