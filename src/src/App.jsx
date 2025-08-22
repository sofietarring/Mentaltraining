import React, { useState, useRef } from 'react'
const handlePlay = (id, title) => {
if (playingId === id) {
// pausa
if (audioRef.current) audioRef.current.pause()
setPlayingId(null)
} else {
// stoppa ev pågående
if (audioRef.current) {
audioRef.current.pause()
}
// OBS: här kan du byta till riktig MP3: new Audio('/muskular.mp3') etc.
const audio = new Audio()
audioRef.current = audio
audio.play().catch(() => {})
setPlayingId(id)
// fejk: logga klart efter 5 sekunder (ersätt med riktig onended sen)
setTimeout(() => {
setPlayingId(null)
onLogSession({
id: Date.now(),
type: `Ljudpass: ${title}`,
seconds: 5 * 60,
date: new Date().toISOString(),
})
}, 5000)
}
}


return (
<div style={{ display: 'grid', gap: 10 }}>
{AUDIO_SESSIONS.map((title, idx) => (
<div key={idx} style={{ border: '1px solid #ccc', padding: 10, borderRadius: 8 }}>
<strong>{title}</strong>
<div>
<button onClick={() => handlePlay(idx, title)}>
{playingId === idx ? 'Pausa' : 'Spela'}
</button>
</div>
<p style={{ fontSize: 12, color: '#666' }}>Ca 5 minuter guidad övning.</p>
</div>
))}
</div>
)
}


function Stats({ sessions }) {
if (sessions.length === 0) {
return <p>Inga pass loggade ännu.</p>
}
return (
<div>
<h2>Statistik</h2>
<ul>
{sessions.map((s) => (
<li key={s.id}>
{s.type} – {Math.round(s.seconds / 60)} min – {new Date(s.date).toLocaleTimeString()}
</li>
))}
</ul>
</div>
)
}
