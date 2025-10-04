import Link from 'next/link'
import React from 'react'
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function Homepage() {
  const session = await auth.api.getSession({
    headers: await headers()
})

  if (session) {
    return (
      <div>
        <h1>Welcome, {session.user.email}</h1>
        <Link href='/login'>Go to Dashboard</Link>
      </div>
    )
  }
  return (
    <div>
      <Link href='/login'>login</Link>
    </div>
  )
}


