import { HfInference } from '@huggingface/inference'
import { Ingredients } from '@/types'

if (!process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY) {
    throw new Error('Missing Hugging Face API Key')
}

const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY)

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests 
a recipe they could make with some or all of those ingredients. You don't need to use 
every ingredient they mention in your recipe. The recipe can include additional 
ingredients they didn't mention, but try not to include too many extra ingredients. 
Format your response in markdown to make it easier to render to a web page.
The expected output is like this.
The title is a must

Garlic Fried Rice - title

Ingredients:

2 cups cooked rice
1 egg
1/2 onion, diced
2 cloves garlic, minced
1 tbsp vegetable oil
Salt and pepper, to taste
2 green onions, sliced (optional)
Instructions:

Heat the vegetable oil in a large skillet over medium-high heat.
Add the diced onion to the skillet and sauté until softened, about 5 minutes.
Add the minced garlic to the skillet and cook for another minute, stirring constantly to prevent burning.
Push the onions and garlic to one side of the skillet and crack the egg into the other side. Scramble the egg and cook until set.
Add the cooked rice to the skillet and stir everything together. Season with salt and pepper to taste.
Serve the fried rice garnished with sliced green onions, if desired.
Enjoy your tasty garlic fried rice!`

export async function generateRecipe(ingredients: Ingredients[]) {
    const ingredientsString = ingredients.map(ing => ing.value).join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (error) {
        console.error('Error generating recipe:', error)
        throw error
    }
}