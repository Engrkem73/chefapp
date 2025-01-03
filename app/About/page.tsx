import React from 'react'

const page = () => {
  return (
   <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Chef Mistral</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
        <p className="text-gray-700">
          Chef Mistral helps you discover delicious recipes based on ingredients you already have. 
          Our AI-powered system suggests creative and practical recipes, reducing food waste and making cooking more enjoyable.
        </p>
      </section>
    
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">1. Enter Your Ingredients</h3>
            <p className="text-gray-600">List the ingredients you have available</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">2. Get AI Recommendations</h3>
            <p className="text-gray-600">Our AI suggests personalized recipes</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">3. Save Your Favorites</h3>
            <p className="text-gray-600">Keep track of recipes you love</p>
          </div>
        </div>
      </section>
    
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700">
          Have questions or suggestions? Reach out at <a href="mailto:kjbb73@gmail.com" className="text-blue-600 hover:underline">kjbb73@gmail.com</a>
        </p>
      </section>
    </main>
  )
}

export default page