"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {
  const [message, setMessage] = useState("Hello HisabKitab")

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">{message}</h1>
      <p>Supabase connected</p>
    </main>
  )
}
