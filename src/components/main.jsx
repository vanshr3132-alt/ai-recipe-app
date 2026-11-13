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
    
    // const [recipeShown, setRecipeShown] = React.useState(false)
  const[data,setdata]= React.useState("");
      
     const recipeitem = React.useRef(null);

          
         React.useEffect(function(){
            if(data!==" " && recipeitem!==null){
                recipeitem.current.scrollIntoView({behavior: smooth});
            }
         },[data])



     async function toggleRecipeShown() {
      
   try {
       const response = await getIngredients(item);
       console.log("Recipe returned:", data)
       setdata(response)
       console.log("State before update:", data)
    }
    catch(error) {
        console.log(error);
        setdata("sorry, server is busy. Please try again later :(")
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
            
            {data> 1&& <ClaudeRecipe 
               ingred={data}
               />}


        </main>
    )
}
