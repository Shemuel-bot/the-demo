import React, { useEffect, useRef, useState } from 'react';

const welcomeMessage = {
  role: 'assistant',
  text: "Hi, I'm your demo assistant. I can help you brainstorm, shape an idea, or talk through a question. What would you like to work on?",
};

const suggestions = [
  'Help me brainstorm an idea',
  'Help me write something',
  'Explain a tricky topic',
];

function demoReply() {
  return 'I’m a front-end demo, so I can’t generate live answers yet. Your message is here in this conversation; connect an AI service to make this chat respond for real.';
}

export default function App() {
  const [messages, setMessages] = useState([welcomeMessage]);
  const [draft, setDraft] = useState('');
  const textareaRef = useRef(null);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }, [draft]);

  function sendMessage(text = draft) {
    const message = text.trim();
    if (!message) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', text: message },
      { role: 'assistant', text: demoReply() },
    ]);
    setDraft('');
    textareaRef.current?.focus();
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  function startNewChat() {
    setMessages([welcomeMessage]);
    setDraft('');
    textareaRef.current?.focus();
  }

  return (
    <main className="chat-page">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="The Demo home">
          <span className="mark" aria-hidden="true">d.</span>
          <span>the demo</span>
        </a>
        <div className="topbar-actions">
          <span className="status"><span /> prototype mode</span>
          <button className="new-chat" type="button" onClick={startNewChat}>
            <span aria-hidden="true">＋</span> New chat
          </button>
        </div>
      </header>

      <section className="chat-content" aria-label="Chat conversation">
        <div className="conversation-heading">
          <p className="eyebrow">A QUIET PLACE TO THINK</p>
          <h1>What’s on your mind?</h1>
        </div>

        <div className="message-list" aria-live="polite" aria-relevant="additions">
          {messages.map((message, index) => (
            <article className={`message message-${message.role}`} key={`${index}-${message.role}`}>
              <span className={`avatar avatar-${message.role}`} aria-hidden="true">
                {message.role === 'assistant' ? 'd.' : 'you'}
              </span>
              <div className="message-body">
                <span className="message-author">{message.role === 'assistant' ? 'Demo assistant' : 'You'}</span>
                <p>{message.text}</p>
              </div>
            </article>
          ))}
          {messages.length === 1 && (
            <div className="suggestions" aria-label="Suggested prompts">
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)}>
                  {suggestion}<span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        <div className="composer-area">
          <form className="composer" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="message-input">Write a message</label>
            <textarea
              id="message-input"
              ref={textareaRef}
              rows={1}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message the demo assistant..."
            />
            <button className="send-button" type="submit" disabled={!draft.trim()} aria-label="Send message" title="Send message">
              <span aria-hidden="true">↑</span>
            </button>
          </form>
          <p className="composer-note">Prototype replies only. Your messages stay in this session.</p>
        </div>
      </section>
    </main>
  );
}