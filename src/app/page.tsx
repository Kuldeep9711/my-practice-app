"use client"

import Button from "@/components/Button";
import { useState } from "react";


export default function Home() {
  // 1. State with Typescript type
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);

  // 2. Handler functions (also typed)
  const handleIncrement = () => {
    setCount((prev) => prev + step);
  }

  const handleDecrement = () => {
    setCount((prev) => prev - step);
  }

  const handleReset = () => {
    setCount(0);
  }



  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Simple Counter
      </h1>

      <div className="text-6xl font-mono mb-10 text-blue-600">
        {count}
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <Button
          label="Decrease"
          onClick={handleDecrement}
          variant="secondary"
        />

        <Button
          label="Increase"
          onClick={handleIncrement}
          variant="primary"
        />

        <Button
          label="Reset"
          onClick={handleReset}
          disabled={count === 0}
          variant="secondary"
        />
      </div>

      <input

        type="number"
        value={step}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStep(Number(e.target.value))}
        className="w-20 px-2 py-1 border rounded text-center text-black mt-2"
        min={1}
      />

      <p className="mt-5 text-gray-500 text-sm">
        You built this from memory (or with struggle - that's okay!)
      </p>
    </main>
  )
}