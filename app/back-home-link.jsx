'use client'

import { useEffect, useState } from 'react'

export function BackHomeLink() {
  const [href, setHref] = useState('/')

  useEffect(() => {
    if (window.location.hostname === 'siliflow-docs.vercel.app') {
      setHref('https://siliflow.in/')
    } else if (window.location.port === '3002') {
      setHref('http://localhost:3000/')
    }
  }, [])

  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '5px 11px',
        borderRadius: '9999px',
        fontSize: '12.5px',
        fontWeight: 500,
        lineHeight: 1.2,
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid rgba(128, 128, 128, 0.28)',
        backgroundColor: 'rgba(128, 128, 128, 0.08)',
        whiteSpace: 'nowrap',
        transition: 'background-color 150ms ease, border-color 150ms ease',
      }}
    >
      <span aria-hidden="true">←</span>
      <span>Home</span>
    </a>
  )
}

