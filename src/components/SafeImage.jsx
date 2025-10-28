import { useState } from 'react'

const FALLBACK_URL = 'https://picsum.photos/seed/vibedesi/800/600'

export default function SafeImage({ src, alt, className = '', fallback = FALLBACK_URL }) {
    const [error, setError] = useState(false)

    const imageSrc = !src || error ? fallback : src

    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            loading="lazy"
        />
    )
}


