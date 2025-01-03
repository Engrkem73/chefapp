import React from 'react'

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-8">
        {/* Header Skeleton */}
        <div className="h-8 bg-gray-200 rounded-md w-48"></div>
        
        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Generate 6 skeleton cards */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 space-y-4">
              {/* Title Skeleton */}
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              
              {/* Ingredients Skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-100 rounded w-full"></div>
                  <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-100 rounded w-4/6"></div>
                </div>
              </div>
              
              {/* Instructions Skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-100 rounded w-full"></div>
                  <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-100 rounded w-4/6"></div>
                </div>
              </div>
              
              {/* Button Skeleton */}
              <div className="flex justify-end">
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
