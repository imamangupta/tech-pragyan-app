'use client'
import React from 'react'
import { useParams } from "next/navigation"


export default function Page() {

    const params = useParams()

  return (
    <div>{params.id}</div>
  )
}
