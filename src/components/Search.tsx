"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchResult {
  title: string
  description: string
  category: 'blog' | 'research' | 'people'
  slug: string
  content: string
}

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [fuse, setFuse] = useState<Fuse<SearchResult> | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    fetch('/api/search')
      .then(res => res.json())
      .then(data => {
        const options = {
          keys: ['title', 'description', 'content'],
          threshold: 0.3,
          includeScore: true,
        }
        setFuse(new Fuse(data, options))
      })
  }, [])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    if (!value.trim()) {
      setResults([])
      return
    }

    if (fuse) {
      const searchResults = fuse.search(value)
      setResults(searchResults.map(result => result.item).slice(0, 5))
      setIsOpen(true)
    }
  }, [fuse])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      const firstResult = results[0]
      const path = `/${firstResult.category}/${firstResult.slug}`
      router.push(path)
      setIsOpen(false)
      setQuery('')
    }
  }, [results, router])

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher..."
          className="w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          aria-label="Champ de recherche"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Effacer la recherche"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          <ul className="py-2">
            {results.map((result) => (
              <li key={result.slug}>
                <Link
                  href={`/${result.category}/${result.slug}`}
                  className="block px-4 py-2 hover:bg-gray-50"
                  onClick={() => {
                    setIsOpen(false)
                    setQuery('')
                  }}
                >
                  <div className="text-sm font-medium text-gray-900">
                    {result.title}
                  </div>
                  {result.description && (
                    <div className="text-sm text-gray-500 truncate">
                      {result.description}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    {result.category.charAt(0).toUpperCase() + result.category.slice(1)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 