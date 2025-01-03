import { HfInference } from '@huggingface/inference'
import { Ingredients } from '@/types'

if (!process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY) {
    throw new Error('Missing Hugging Face API Key')
}

const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY)

const SYSTEM_PROMPT = `You are a helpful chef. Create recipes in this exact format:

Beef and Eggs Breakfast

Ingredients:
- 2 eggs
- 200g beef, sliced
- Salt and pepper
- Oil for cooking

Instructions:
1. Heat oil in pan
2. Cook beef until done
3. Add eggs and scramble
4. Season and serve`

export async function generateRecipe(ingredients: Ingredients[]) {
    const ingredientsString = ingredients.map(ing => ing.value).join(", ")
    
    try {
        const response = await hf.textGeneration({
            model: "tiiuae/falcon-7b-instruct",
            inputs: `${SYSTEM_PROMPT}\n\nCreate a recipe using these ingredients: ${ingredientsString}`,
            parameters: {
                max_new_tokens: 500,
                temperature: 0.7,
                top_p: 0.95,
                repetition_penalty: 1.15,
                return_full_text: false,
            },
        })

        if (!response.generated_text) {
            throw new Error('No recipe generated')
        }

        const cleanedResponse = response.generated_text
            .replace(/^[^A-Za-z]*/g, '')
            .replace(/\n{3,}/g, '\n\n')
            .replace(/^(Here's |Recipe:|A recipe for |I'll create |Let me )[^]*?\n/, '')
            .trim()

        // More lenient validation
        if (!cleanedResponse.includes('Ingredients') || !cleanedResponse.includes('Instructions')) {
            console.log('Validation failed. Response format incorrect.')
            // Try to fix common format issues
            const title = cleanedResponse.split('\n')[0]
            const rest = cleanedResponse.split('\n').slice(1).join('\n')
            
            // If we at least have a title and some content, try to format it
            if (title && rest) {
                return `${title}\n\nIngredients:\n${rest}`
            }
            throw new Error('Recipe format could not be corrected')
        }

        return cleanedResponse
    } catch (error) {
        console.error('Error generating recipe:', error)
        throw error
    }
}