import React from "react";
import ListItems from "../ingredientlist";
import { getRecipeGemini } from "../ai";
import ClaudeRecipe from "./clauderecipe";
export default function Main() {


    const [ingredients,setIngredients]= React.useState(["fish","eggs","main spices","prawns"]);
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    
    const [error, setError] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);
    
  const[recipe,setRecipe]= React.useState("");
      
     const recipeItem = React.useRef(null);

          
     React.useEffect(() => {
        if (recipe !== "" && recipeItem.current) {
            recipeItem.current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [recipe]);

     async function fetchRecipe() {
        setIsLoading(true);
        setError("");
   try {
       const response = await getRecipeGemini(ingredients);
    
       setRecipe(response)
      
    }
    catch(err) {
        console.log("caught in Main:", err?.status, err?.message);
        setError("⚠️ Gemini is busy. Please try again later.");
        }
        finally {
            setIsLoading(false);
        }
        
} 
   

        function addIngredient(formData){
    const newIngredient = formData.get("ingredient");
    if (newIngredient === "") return; 
   
    setIngredients(prev => {
        const alreadyThere = prev.some(i => i.toLowerCase() === newIngredient.toLowerCase());
        if (alreadyThere) {
            return prev;
        }
        return [...prev, newIngredient];
    });

        }
    return (
        <main>
            <form className = "form-1" action={addIngredient}  >
                <input  type="text"
                placeholder="enter ingredient"
                aria-label="add ingredient" 
                name="ingredient"/>
                <button> Add ingredient</button>
            </form>
            {ingredientsListItems.length>0 && <ListItems
            ingredient={ingredients}
             ref={recipeItem}
           fetchRecipe={fetchRecipe}
            ingredientsListItems={ingredientsListItems}
            />}
            
            {isLoading && <p>🍳 Generating recipe...</p>}

{error && <p className="error">{error}</p>}

{!isLoading && !error && recipe && (
    <ClaudeRecipe ingred={recipe} />
)}

        </main>
    )
}
