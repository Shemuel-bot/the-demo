import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="page">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="The Demo home">
          <span className="mark" aria-hidden="true">d.</span>
          <span>the demo</span>
        </a>
        <span className="status"><span /> ready to build</span>
      </header>

      <section className="intro" aria-labelledby="title">
        <p className="eyebrow">YOUR CANVAS IS READY</p>
        <h1 id="title">A little space<br />to make <em>something.</em></h1>
        <p className="description">
          Your React app is up and running. Start shaping the idea you came here with.
        </p>
        <div className="counter" aria-live="polite">
          <span className="counter-label">TEST THE INTERACTION</span>
          <div className="counter-row">
            <span className="count">{count.toString().padStart(2, '0')}</span>
            <button type="button" onClick={() => setCount((value) => value + 1)}>
              Add one <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>VITE <b>×</b> REACT</span>
        <span>GOOD THINGS START SOMEWHERE</span>
      </footer>
    </main>
  );
}