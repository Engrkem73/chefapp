import Form from './components/Form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Get personalized recipe suggestions based on your available ingredients. Start cooking delicious meals with Chef Mistral!',
  openGraph: {
    title: 'Chef Mistral - Turn Your Ingredients into Delicious Recipes',
    description: 'Get personalized recipe suggestions based on your available ingredients. Start cooking delicious meals with Chef Mistral!',
  },
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">AI Recipe Generator</h1>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Note:</strong> This is a demo project using free AI models. While the recipes are creative, they may not always be perfectly formatted or practical. For the best results, please verify the recipes before cooking.
              </p>
              <p className="mt-2 text-xs text-yellow-600">
                This project demonstrates the potential of AI in recipe generation while working within the constraints of freely available models.
              </p>
            </div>
          </div>
        </div>

        <Form/>
      </div>
    </main>
  )
}
