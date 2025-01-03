import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests 
a recipe they could make with some or all of those ingredients. You don't need to use 
every ingredient they mention in your recipe. The recipe can include additional 
ingredients they didn't mention, but try not to include too many extra ingredients. 
Format your response in markdown to make it easier to render to a web page`

interface Ingredients {
    value: string,
}

const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY)

const models = {
    primary: "HuggingFaceH4/zephyr-7b-beta",
    fallback: "mistralai/Mixtral-8x7B-Instruct-v0.1" }

export async function generateRecipe(ingredients: Ingredients[]) {
    const ingredientsString = ingredients.map(ing => ing.value).join(", ")
    
    async function tryModel(modelName: string) {
        return await hf.chatCompletion({
            model: modelName,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. 
                    Please give me a recipe you'd recommend I make! 
                    Please return a title for your recipe. 
                    Make sure the title is the first most line.
                    Format your response in markdown to make it easier to render to a web page` },
            ],
            max_tokens: 1024,
        })
    }

    try {
        // Try primary model first
        const response = await tryModel(models.primary)
        return response.choices[0].message.content
    } catch (error: unknown) {
        if(error instanceof Error) {
            console.error('Primary model failed:', {
                message: error.message
            })
        }
        try {
            // Try fallback model
            const fallbackResponse = await tryModel(models.fallback)
            return fallbackResponse.choices[0].message.content
        } catch (fallbackError: unknown) {
            if(fallbackError instanceof Error){
                console.error('All models failed:', {
                    message: fallbackError.message,
                })
            } else {
                console.error('Unknown error:', fallbackError)
            }
            throw fallbackError
        }
    }
}
