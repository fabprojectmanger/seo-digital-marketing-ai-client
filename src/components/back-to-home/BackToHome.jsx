import Link from 'next/link'
import React from 'react'

const BackToHome = ({link, heading}) => {
  return (
    <Link
    href={link || '/'}
    className={`text-base uppercase font-semibold mb-6 inline-block`}
  >
    ← {heading || 'Back to home'}
  </Link>
  )
}

export default BackToHome
