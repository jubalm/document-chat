import React, { useEffect, useState } from "react"

export function PlatformApp() {
  const [hello, setHello] = useState<string | null>(null)
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setHello(data.message))
  }, [])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Platform Console</h1>
      <p className="text-lg">Hello, world! This is your platform admin app.</p>
      <p className="mt-4 text-green-700">{hello}</p>
    </div>
  )
}
