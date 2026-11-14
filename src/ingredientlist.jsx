export default function ListItems(props) {
    return (
        <section className="list-item-container">
        <h2>Ingredients on hand:</h2>
        <ul className="ingredients-list" aria-live="polite">{props.ingredientsListItems}</ul>
        {props.ingredient.length > 3 && <div className="get-recipe-container">
            <div ref={props.ref}>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button onClick={props.fetchRecipe}>Get a recipe</button>
        </div>}
    </section>

    )
}