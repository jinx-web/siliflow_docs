'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'

function buildSteppedPath(points) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x} ${Math.max(0, points[0].y - 14)} L ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i]
    const p2 = points[i + 1]
    if (Math.abs(p1.x - p2.x) < 1) {
      d += ` L ${p2.x} ${p2.y}`
    } else {
      const dx = Math.abs(p2.x - p1.x)
      const spanY = Math.max(4, p2.y - p1.y)
      const diagH = Math.min(dx, Math.max(6, spanY * 0.45))
      const midY = p1.y + (spanY - diagH) / 2
      d += ` L ${p1.x} ${midY} L ${p2.x} ${midY + diagH} L ${p2.x} ${p2.y}`
    }
  }
  return d
}

function measureContainerTrace(container, mode) {
  if (!container || container.offsetParent === null) return null

  const rect = container.getBoundingClientRect()
  if (rect.width < 20 || rect.height < 20) return null

  const items = Array.from(
    container.matches('ul')
      ? container.querySelectorAll(':scope > li')
      : container.querySelectorAll('ul > li')
  )
  if (!items.length) return null

  const points = []
  let activeIndex = -1

  for (const li of items) {
    const link = li.querySelector(':scope > a')
    const target = link || li
    if (!target || target.offsetParent === null) continue

    const targetRect = target.getBoundingClientRect()
    if (targetRect.height === 0) continue

    const y = targetRect.top - rect.top + container.scrollTop + targetRect.height / 2

    let x = 10
    if (mode === 'sidebar') {
      const isSeparator = !link
      const isIntro = li === items[0]
      x = isSeparator || isIntro ? 10 : 22
      if (li.classList.contains('active')) {
        activeIndex = points.length
      }
    } else {
      const cls = link ? link.className : ''
      if (cls.includes('x:ms-9') || cls.includes('x:ms-12')) x = 44
      else if (cls.includes('x:ms-6')) x = 34
      else if (cls.includes('x:ms-3')) x = 22
      else x = 10

      if (cls.includes('text-primary-600')) {
        activeIndex = points.length
      }
    }

    points.push({ x, y, isGroup: !link })
  }

  if (!points.length) return null

  return {
    rect,
    scrollTop: container.scrollTop,
    scrollHeight: container.scrollHeight,
    points,
    activeIndex,
  }
}

function TraceLayer({ selector, mode }) {
  const gradId = useId().replace(/:/g, '')
  const pathname = usePathname()
  const [trace, setTrace] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    let raf = 0

    const update = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = document.querySelector(selector)
        containerRef.current = el
        const next = measureContainerTrace(el, mode)
        setTrace(next)
      })
    }

    update()
    const timer = window.setTimeout(update, 90)

    const onScrollOrResize = () => update()
    window.addEventListener('resize', onScrollOrResize, { passive: true })
    window.addEventListener('scroll', onScrollOrResize, { passive: true })

    let observedEl = null
    let ro
    let mo

    const attachObservers = () => {
      const el = document.querySelector(selector)
      if (!el || el === observedEl) return
      if (observedEl) observedEl.removeEventListener('scroll', onScrollOrResize)
      if (ro) ro.disconnect()
      if (mo) mo.disconnect()

      observedEl = el
      containerRef.current = el
      el.addEventListener('scroll', onScrollOrResize, { passive: true })
      ro = new ResizeObserver(update)
      ro.observe(el)
      mo = new MutationObserver(update)
      mo.observe(el, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class'],
        childList: true,
      })
      update()
    }

    attachObservers()
    const t1 = window.setTimeout(attachObservers, 80)
    const t2 = window.setTimeout(attachObservers, 260)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('resize', onScrollOrResize)
      window.removeEventListener('scroll', onScrollOrResize)
      if (observedEl) observedEl.removeEventListener('scroll', onScrollOrResize)
      if (ro) ro.disconnect()
      if (mo) mo.disconnect()
    }
  }, [selector, mode, pathname])

  if (!trace || trace.points.length === 0) return null

  const { rect, scrollTop, scrollHeight, points, activeIndex } = trace
  const fullPath = buildSteppedPath(points)
  const activePoint = activeIndex >= 0 ? points[activeIndex] : null
  const activePath =
    activeIndex > 0 ? buildSteppedPath(points.slice(0, activeIndex + 1)) : ''

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: 56,
        height: rect.height,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 15,
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0px, #000 18px, #000 calc(100% - 22px), transparent 100%)',
        maskImage:
          'linear-gradient(to bottom, transparent 0px, #000 18px, #000 calc(100% - 22px), transparent 100%)',
      }}
    >
      <svg
        width={56}
        height={scrollHeight}
        style={{
          transform: `translate3d(0, ${-scrollTop}px, 0)`,
          overflow: 'visible',
        }}
      >
        <defs>
          <linearGradient id={`fade-${gradId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopOpacity="0" />
            <stop offset="100%" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Continuous dashed circuit trace */}
        {fullPath && (
          <path
            d={fullPath}
            fill="none"
            stroke="var(--trace-stroke-muted)"
            strokeWidth="1.25"
            strokeDasharray="2.5 3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Highlighted solid trail up to active node */}
        {activePath && (
          <path
            d={activePath}
            fill="none"
            stroke="var(--trace-stroke-active)"
            strokeOpacity="0.4"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Via circular nodes */}
        {points.map((pt, idx) => {
          const isActive = idx === activeIndex
          const isVisited = activeIndex >= 0 && idx < activeIndex
          return (
            <circle
              key={`${idx}-${pt.x}-${Math.round(pt.y)}`}
              cx={pt.x}
              cy={pt.y}
              r={pt.isGroup ? 3.2 : 2.8}
              fill={
                isActive || isVisited
                  ? 'var(--trace-stroke-active)'
                  : 'var(--trace-node-bg)'
              }
              fillOpacity={isActive ? 0.95 : isVisited ? 0.45 : 1}
              stroke={
                isActive
                  ? 'var(--trace-stroke-active)'
                  : 'var(--trace-stroke-muted)'
              }
              strokeWidth="1.35"
            />
          )
        })}

        {/* Crisp downward chevron cursor over the active item */}
        {activePoint && (
          <g
            className="siliflow-trace-cursor"
            style={{
              transform: `translate3d(${activePoint.x}px, ${activePoint.y}px, 0)`,
              transition: 'transform 180ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            <path
              d="M -4.5 -10.5 L 0 -3.8 L 4.5 -10.5 L 0 -8 Z"
              fill="var(--trace-cursor)"
            />
          </g>
        )}
      </svg>
    </div>
  )
}

export function SteppedTraceEnhancer() {
  return (
    <>
      <TraceLayer selector=".nextra-sidebar .nextra-scrollbar" mode="sidebar" />
      <TraceLayer selector=".nextra-toc ul.nextra-scrollbar" mode="toc" />
    </>
  )
}
