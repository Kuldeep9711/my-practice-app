'use client'

import React from 'react'

export default function Error({ error }: {error: Error }) {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-8'>
        <h1 className='text-3xl font-bold text-red-600'>Oops!</h1>
        <p className='mt-4'>{error.message || 'Something went wrong'}</p>
    </main>
  )
}
