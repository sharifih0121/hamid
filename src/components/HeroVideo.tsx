'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const AERIAL_VIDEO = '/hamid-video-bg.mp4'

export default function HeroVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { effectiveType: string; saveData: boolean }
    }
    const conn = nav.connection
    const isSlow =
      conn &&
      (conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType))
    if (!isSlow) setShowVideo(true)
  }, [])

  const showPlaceholder = !videoLoaded || videoError || !showVideo

  return (
    <>
      {showPlaceholder && (
        <Image
          src="/hero-placeholder.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
      )}
      {showVideo && !videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={AERIAL_VIDEO} type="video/mp4" />
        </video>
      )}
    </>
  )
}
