'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Groq from 'groq-sdk'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  dangerouslyAllowBrowser: true
})

export default function Home() {
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [type, setType] = useState('expense')
  const [aiTip, setAiTip] = useState('')

  const addEntry = async () => {
    await supabase.from('entries').insert([{ amount, note, type }])
    setAmount('')
    setNote('')
    getAITip()
  }

  const getAITip = async () => {
    const chat = await groq.chat.completions.create({
      messages: [{ role: 'user', content: 'Give me 1 money saving tip in Urdu Roman' }],
      model: 'llama3-8b-8192',
    })
    setAiTip(chat.choices[0].message.content || '')
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hisab Kitab 💰</h1>
      <input className="border p-2 w-full mb-2 rounded" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
      <input className="border p-2 w-full mb-2 rounded" placeholder="Note" value={note} onChange={e=>setNote(e.target.value)} />
      <select className="border p-2 w-full mb-2 rounded" value={type} onChange={e=>setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button onClick={addEntry} className="bg-blue-500 text-white p-2 w-full rounded">Add</button>
      {aiTip && <p className="mt-4 p-3 bg-green-100 rounded">AI Tip: {aiTip}</p>}
    </main>
  )
}
