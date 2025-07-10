import React, { useState, useRef, useEffect } from 'react';
import '../index.css';

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
       
    const userMessage = { text: input, sender: "You" };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch(`https://mosdac-help-backend.onrender.com/search?query=${encodeURIComponent(input)}`);
      const data = await res.json();

      if (!data) {
        throw new Error("Empty response from backend");
      }

      let botReply = "";

      const hasMatches = Array.isArray(data.matches) && data.matches.length > 0;
      const hasRelations = Array.isArray(data.related_relations) && data.related_relations.length > 0;
      const hasSuggestions = Array.isArray(data.semantic_suggestions) && data.semantic_suggestions.length > 0;
      const hasLLM = data.llm_response;

      if (!hasMatches && !hasRelations && !hasSuggestions && !hasLLM) {
        botReply = "⚠ No relevant entities or relations found.";
      } else {
        if (hasMatches) {
          botReply += `<div class="section-title">🗂 Entities Found:</div>`;
          data.matches.forEach(ent => {
            botReply += `• ${ent.text} <span class='tag blue'>${ent.label}</span><br/>`;
          });
        }

        if (hasRelations) {
          botReply += `<div class="section-title mt-3">🔗 Relations:</div>`;
          data.related_relations.forEach(rel => {
            botReply += `• <strong>${rel.source}</strong> —[${rel.type}]→ <strong>${rel.target}</strong><br/>`;
          });
        }

        if (hasSuggestions) {
          botReply += `<div class="section-title mt-3">💡 Did you mean:</div>`;
          data.semantic_suggestions.forEach(sug => {
            botReply += `• ${sug.text} <span class='tag yellow'>Similarity: ${sug.similarity.toFixed(2)}</span><br/>`;
          });
        }

        if (hasLLM) {
          botReply += `<div class="section-title mt-3">🤖 AI Answer:</div>${data.llm_response}`;
        }
      }

      setMessages((prev) => [...prev, { text: botReply, sender: "Bot", html: true }]);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages((prev) => [...prev, { text: "⚠ Error fetching results.", sender: "Bot" }]);
    }

    setInput("");
    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">🤖 AI Help Bot</div>

      <div className="chat-body">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender === "You" ? "you" : "bot"}`}>
            <div className="sender-label">{msg.sender}</div>
            {msg.html ? (
              <div
                className="whitespace-pre-wrap text-sm"
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ) : (
              <div>{msg.text}</div>
            )}
          </div>
        ))}
        {loading && (
          <div className="chat-bubble bot">
            <div className="sender-label">Bot</div>
            <div className="loading">Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-footer">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask a question..."
        />
        <button onClick={handleSend}>Ask</button>
      </div>
    </div>
  );
}
