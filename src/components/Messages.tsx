import { useEffect, useRef, useState, type FormEvent } from 'react'
import './Messages.css'

interface Message {
  id: number
  name: string
  text: string
  date: string
}

const STORAGE_KEY = 'awalpuput_messages'

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const remove = (id: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    const msg: Message = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }
    setMessages((prev) => [msg, ...prev])
    setName('')
    setText('')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section ref={ref} className={`messages ${visible ? 'messages--visible' : ''}`} id="messages">
      <h2 className="section-title">Ucapan &amp; Doa</h2>
      <p className="section-subtitle">
        Kirimkan ucapan dan doa restu untuk kedua mempelai
      </p>

      <div className="messages__layout">
        <form className="messages__form" onSubmit={submit}>
          <input
            type="text"
            className="messages__input"
            placeholder="Nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={50}
          />
          <textarea
            className="messages__textarea"
            placeholder="Tulis ucapan dan doa..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            maxLength={500}
            rows={4}
          />
          <button type="submit" className="messages__submit">
            {sent ? '✓ Terkirim' : 'Kirim Ucapan'}
          </button>
        </form>

        <div className="messages__list" ref={listRef}>
          {messages.length === 0 ? (
            <p className="messages__empty">
              Belum ada ucapan. Jadilah yang pertama!
            </p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="messages__item">
                <div className="messages__item-header">
                  <span className="messages__item-name">{msg.name}</span>
                  <div className="messages__item-actions">
                    <span className="messages__item-date">{msg.date}</span>
                    <button
                      className="messages__delete"
                      onClick={() => remove(msg.id)}
                      aria-label="Hapus ucapan"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <p className="messages__item-text">{msg.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
