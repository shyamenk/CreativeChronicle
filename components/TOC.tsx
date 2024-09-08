'use client'

import React, { useState } from 'react'
import { GripHorizontal, X } from 'lucide-react'

interface TableOfContentsProps {
  headings: { id: string; text: string }[]
}

//TODO: Try to modify

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700"
      >
        {isOpen ? <X size={24} /> : <GripHorizontal size={24} />}
      </button>

      {isOpen && (
        <div className="fixed left-4 top-[calc(50%_+_3rem)] z-50 w-64 rounded-lg bg-white p-4 shadow-lg">
          <h2 className="mb-2 text-lg font-bold">Table of Contents</h2>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a href={`#${heading.id}`} className="text-blue-500 hover:underline">
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TableOfContents
