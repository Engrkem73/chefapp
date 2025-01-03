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
    <Form/>
  )
}
