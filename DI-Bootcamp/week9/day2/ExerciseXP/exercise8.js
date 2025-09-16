function makeJuice(size){
    function addIngredients(ing1, ing2, ing3){
        const div = document.createElement("div");
        div.textContent = `The client wants a ${size} drink juice, containing ${ing1}, ${ing2}, ${ing3}.`;
        document.body.appendChild(div);
    }

    // Invoke inner function once
    addIngredients("apple", "banana", "orange");
}

// Invoke outer function
makeJuice("medium");
