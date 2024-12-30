import React from 'react'


const EnterMore: React.FC<{ ingredientsLength: number }> = ({ingredientsLength: length}) => {
  return (
    <div className="recipe-prompt-message">
        <p>🔍 Enter {4 - length} more ingredient{4 - length > 1 ? 's' : ''} to get recipe suggestions</p>
    </div>
  )
}

export default EnterMore