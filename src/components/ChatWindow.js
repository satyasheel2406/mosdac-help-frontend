// src/components/ChatWindow.js
import React, { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async (input) => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'You' };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch(
        `https://mosdac-help-backend.onrender.com/search?query=${encodeURIComponent(input)}`
      );
      const data = await res.json();

      let botReply = "";

      const hasEntities = Array.isArray(data.matches) && data.matches.length > 0;
      const hasRelations = Array.isArray(data.related_relations) && data.related_relations.length > 0;
      const hasSuggestions = Array.isArray(data.semantic_suggestions) && data.semantic_suggestions.length > 0;
      const hasLLM = data.llm_response;

      if (!hasEntities && !hasRelations && !hasSuggestions && !hasLLM) {
        botReply = "⚠ No relevant results found.";
      } else {
        if (hasEntities) {
          botReply += "🗂 Entities Found:\n";
          data.matches.forEach(ent => {
            botReply += `• ${ent.text} [${ent.label}]\n`;
          });
        }
        if (hasRelations) {
          botReply += "\n🔗 Relations:\n";
          data.related_relations.forEach(rel => {
            botReply += `• ${rel.source} —[${rel.type}]→ ${rel.target}\n`;
          });
        }
        if (hasSuggestions) {
          botReply += "\n💡 Did you mean:\n";
          data.semantic_suggestions.forEach(sug => {
            botReply += `• ${sug.text} (Similarity: ${sug.similarity.toFixed(2)})\n`;
          });
        }
        if (hasLLM) {
          botReply += `\n\n🤖 AI Answer:\n${data.llm_response}`;
        }
      }

      setMessages((prev) => [...prev, { text: botReply, sender: 'Bot' }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { text: '⚠ Error talking to backend.', sender: 'Bot' }]);
    }

    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-bubble ${msg.sender === 'You' ? 'user-box' : 'bot-box'}`}
          >
            <div className="sender-label">{msg.sender}</div>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
        {loading && (
          <div className="message-bubble bot-box">
            <div className="sender-label">Bot</div>
            <div className="message-text">🤖 Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSearch={handleSend} />
    </div>
  );
}