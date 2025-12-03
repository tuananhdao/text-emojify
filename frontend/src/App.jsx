import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function App() {
  const [text, setText] = useState('')
  const [emojis, setEmojis] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/emojify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const data = await res.json()
      setEmojis(data.emojis)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          background: #0a0a0f;
          background-image: 
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 107, 53, 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(138, 43, 226, 0.1), transparent);
        }

        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        h1 {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .subtitle {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 3rem;
        }

        form {
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        input {
          width: 100%;
          padding: 1.2rem 1.5rem;
          font-size: 1.1rem;
          font-family: 'Syne', sans-serif;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          color: #fff;
          outline: none;
          transition: all 0.2s ease;
        }

        input::placeholder {
          color: #444;
        }

        input:focus {
          border-color: #ff6b35;
          box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.1);
        }

        button {
          padding: 1.2rem 2rem;
          font-size: 1.1rem;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931a 100%);
          border: none;
          border-radius: 16px;
          color: #000;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 107, 53, 0.3);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .result {
          margin-top: 3rem;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .emojis {
          font-size: clamp(3rem, 12vw, 6rem);
          animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .loader {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 107, 53, 0.2);
          border-top-color: #ff6b35;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="container">
        <h1>Text → Emoji</h1>
        <p className="subtitle">Transform your words into expressive emojis</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something like 'I'm hungry'..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !text.trim()}>
            {loading ? 'Converting...' : 'Emojify ✨'}
          </button>
        </form>

        <div className="result">
          {loading ? (
            <div className="loader" />
          ) : emojis ? (
            <div className="emojis">{emojis}</div>
          ) : null}
        </div>
      </div>
    </>
  )
}

