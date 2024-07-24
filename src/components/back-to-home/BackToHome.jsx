import Link from 'next/link'
import React from 'react'

const BackToHome = () => {
  return (
    <Link
    href="/"
    className={`text-base uppercase font-semibold mb-6 inline-block`}
  >
    ← Back to home
  </Link>
  )
}

export default BackToHome
