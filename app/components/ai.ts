import { HfInference } from '@huggingface/inference'
import { Ingredients } from '@/types'

if (!process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY) {
    throw new Error('Missing Hugging Face API Key')
}

const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY)

const SYSTEM_PROMPT = `Create a recipe using the provided ingredients.
The recipe must follow this exact format:

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

function formatRecipe(text: string): string {
    // Extract title (first line that's not empty and doesn't start with common prefixes)
    const lines = text.split('\n').filter(line => line.trim() !== '')
    const title = lines[0]
    if (!title || /^(here|recipe|let me|i'll|a recipe)/i.test(title)) {
        return "Recipe"
    }

    // Find ingredients section
    const ingredientsStart = text.toLowerCase().indexOf('ingredients')
    const instructionsStart = text.toLowerCase().indexOf('instructions')

    // If sections aren't found, try to create them
    if (ingredientsStart === -1 || instructionsStart === -1) {
        const remainingLines = lines.slice(1).join('\n')
        return `${title}\n\nIngredients:\n${remainingLines}\n\nInstructions:\n1. Combine ingredients\n2. Cook until done\n3. Serve and enjoy`
    }

    // Extract and clean up sections
    const ingredients = text.slice(ingredientsStart, instructionsStart).trim()
    const instructions = text.slice(instructionsStart).trim()

    // Format the final recipe
    return `${title}\n\n${ingredients}\n\n${instructions}`
}

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

        // Clean up the response
        const cleanedResponse = response.generated_text
            .replace(/^[^A-Za-z]*/g, '')
            .replace(/\n{3,}/g, '\n\n')
            .trim()

        // Format the recipe
        return formatRecipe(cleanedResponse)
    } catch (error) {
        console.error('Error generating recipe:', error)
        // Return a basic recipe format if generation fails
        return `Simple ${ingredients[0]?.value || 'Ingredient'} Recipe\n\nIngredients:\n- ${ingredients.map(ing => ing.value).join('\n- ')}\n\nInstructions:\n1. Combine ingredients\n2. Cook until done\n3. Season to taste\n4. Serve and enjoy`
    }
}