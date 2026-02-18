'use client'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center">
          
          {/* Simple 404 */}
          <div className="mb-8">
            <span className="text-8xl font-bold text-gray-900">404</span>
          </div>

          {/* Message */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Page not found
          </h1>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, we could not find the page you are looking for. 
            It might have been moved or do not exist.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>


        </div>
      </div>
    </div>
  )
}