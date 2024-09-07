'use client'

import { useState } from 'react'

export default function Generator() {
  const [generatedContent, setGeneratedContent] = useState('')

  const handleGenerate = async () => {
    // Replace this with your actual generation logic
    const result = await fetch('/api/generate', { method: 'POST' })
    const data = await result.json()
    setGeneratedContent(data.content)
  }

  return (
    <div>
      <button onClick={handleGenerate}>Generate</button>
      <div>{generatedContent}</div>
    </div>
  )
}