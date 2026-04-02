import { useEffect, useState } from 'react'

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [trails, setTrails] = useState([])

  useEffect(() => {
    // Detect touch device
    const isTouchDevice = () => {
      return (
        window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0)
      )
    }

    if (isTouchDevice()) {
      setIsTouch(true)
      return
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Create trail effect
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: Math.random(),
      }
      setTrails((prev) => [...prev.slice(-8), newTrail])
    }

    const handleMouseEnter = () => setHidden(false)
    const handleMouseLeave = () => setHidden(true)
    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // Remove old trails
    const trailInterval = setInterval(() => {
      setTrails((prev) => prev.slice(1))
    }, 50)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      clearInterval(trailInterval)
    }
  }, [])

  // Hide cursor on touch devices
  if (hidden || isTouch) return null

  return (
    <>
      {/* Trail particles */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            opacity: (index / trails.length) * 0.6,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        className="cursor-core"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          scale: clicked ? 0.8 : 1,
        }}
      />
      
      {/* Outer glow */}
      <div
        className="cursor-glow"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: clicked ? 0.3 : 0.5,
          scale: clicked ? 0.6 : 1,
        }}
      />
    </>
  )
}
