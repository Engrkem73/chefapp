import { HfInference } from '@huggingface/inference'
import { Ingredients } from '@/types'

if (!process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY) {
    throw new Error('Missing Hugging Face API Key')
}

const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY)

const models = {
    primary: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    fallback: "HuggingFaceH4/zephyr-7b-beta"
}

export async function generateRecipe(ingredients: Ingredients[]) {
    const ingredientsString = ingredients.map(ing => ing.value).join(", ")
    
    const systemPrompt = `[SYSTEM] You will create a recipe using these ingredients: ${ingredientsString}. 
Your response must follow this exact format, starting with the title on the first line:

[EXAMPLE RESPONSE FORMAT]
Asian-Style Beef Bowl

Ingredients:
- 500g beef
- 2 cloves garlic
- 1 tbsp soy sauce
- Salt to taste

Instructions:
1. Slice beef thinly
2. Heat oil in wok
3. Cook beef until browned
4. Season and serve

[YOUR RESPONSE BEGINS BELOW THIS LINE]
`

    async function tryModel(model: string) {
        return await hf.textGeneration({
            model: model,
            inputs: systemPrompt,
            parameters: {
                max_new_tokens: 1000,
                temperature: 0.7,
                top_p: 0.95,
                repetition_penalty: 1.15,
                stop: ["[", "\n\n\n"],
            },
        })
    }

    try {
        const response = await tryModel(models.primary)
        // Clean up any potential system message or extra text
        const cleanedResponse = response.generated_text
            .split('[YOUR RESPONSE BEGINS BELOW THIS LINE]')
            .pop()
            ?.trim() || ''
        return cleanedResponse
    } catch (error: unknown) {
        if(error instanceof Error) {
            console.error('Primary model failed:', {
                message: error.message
            })
        }
        try {
            const fallbackResponse = await tryModel(models.fallback)
            const cleanedFallback = fallbackResponse.generated_text
                .split('[YOUR RESPONSE BEGINS BELOW THIS LINE]')
                .pop()
                ?.trim() || ''
            return cleanedFallback
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.error('Fallback model failed:', {
                    message: error.message
                })
            }
            throw new Error('Failed to generate recipe')
        }
    }
}
