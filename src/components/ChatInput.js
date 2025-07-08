import { useState } from 'react';

function ChatInput({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    onSearch(query);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
      <input
        type="text"
        placeholder="Ask about satellites, products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ flex: 1, padding: '8px' }}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
