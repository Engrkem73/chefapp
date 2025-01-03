export interface Ingredients {
    id: string
    value: string
}

export interface Recipe {
    title: string
    content: string
}

export interface Favorite extends Recipe {
    id: string
    userId: string
    createdAt: Date
    updatedAt: Date
}

export type DynamicParams = true | false | 'force-static' | 'force-dynamic' | 'error' | 'force-cache'

export interface GenerateMetadataProps {
    params: { id: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}

export interface ApiResponse<T> {
    data?: T
    error?: string
    status: number
}

export interface RecipeContextType {
    recipe: Recipe | null
    updateRecipe: (recipe: Recipe) => void
}
