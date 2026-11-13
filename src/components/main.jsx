import React from "react";
import ListItems from "../ingredientlist";
import { getIngredients } from "../ai";
import ClaudeRecipe from "./clauderecipe";
import { Behavior } from "@google/genai";
export default function Main() {


    const [item,setItem]= React.useState(["fish","eggs","main spices","prawns"]);
    const ingredientsListItems = item.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    
    const [error, setError] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);
    
  const[data,setdata]= React.useState("");
      
     const recipeitem = React.useRef(null);

          
     React.useEffect(() => {
        if (data !== "" && recipeitem.current) {
            recipeitem.current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [data]);

     async function toggleRecipeShown() {
        setIsLoading(true);
        setError("");
   try {
       const response = await getIngredients(item);
       console.log("Recipe returned:", response)
       setdata(response)
      
    }
    catch(error) {
        console.log(error);
        setError("⚠️ Gemini is busy. Please try again later.");
        }
        finally {
            setIsLoading(false);
        }
        
} 
   

        function addIngredient(formData){
    const newIngredient = formData.get("ingredient");
     setItem(prevItem=> [...prevItem,
       newIngredient
     ])



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
            ingredient={item}
             ref={recipeitem}
            toggleRecipeShown={toggleRecipeShown}
            ingredientsListItems={ingredientsListItems}
            />}
            
            {isLoading && <p>🍳 Generating recipe...</p>}

{error && <p className="error">{error}</p>}

{!isLoading && !error && data && (
    <ClaudeRecipe ingred={data} />
)}

        </main>
    )
}
