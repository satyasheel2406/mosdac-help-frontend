import { useState } from 'react';

function ChatInput({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
    setQuery('');
  };

  return (
    <form className="chat-input-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ask your question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="chat-input"
        aria-label="Chat Input"
      />
      <button type="submit" className="chat-send-btn" aria-label="Send Message">
        🚀
      </button>
    </form>
  );
}

export default ChatInput;