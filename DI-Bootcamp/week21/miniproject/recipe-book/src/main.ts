import './style.css';
import { RecipeItem } from './model/RecipeItem';
import { RecipeCollection } from './model/RecipeCollection';
import { RecipeTemplate } from './templates/RecipeTemplate';

// Initialize the collection and template
const collection = new RecipeCollection();
const template = new RecipeTemplate('recipeContainer', collection);

// Initial render
template.render();

// Get form elements
const form = document.getElementById('recipeEntryForm') as HTMLFormElement;
const titleInput = document.getElementById('recipeTitle') as HTMLInputElement;
const ingredientsInput = document.getElementById('ingredients') as HTMLTextAreaElement;
const instructionsInput = document.getElementById('instructions') as HTMLTextAreaElement;
const clearButton = document.getElementById('clearRecipesButton') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const ingredientsText = ingredientsInput.value.trim();
  const instructions = instructionsInput.value.trim();

  if (!title || !ingredientsText || !instructions) {
    alert('Please fill in all fields');
    return;
  }

  // Parse ingredients (one per line)
  const ingredients = ingredientsText
    .split('\n')
    .map((ing) => ing.trim())
    .filter((ing) => ing.length > 0);

  if (ingredients.length === 0) {
    alert('Please enter at least one ingredient');
    return;
  }

  // Create and add the recipe
  const recipe = new RecipeItem(title, ingredients, instructions);
  collection.addRecipe(recipe);

  // Re-render and reset form
  template.render();
  form.reset();
});

// Handle clear all button
clearButton.addEventListener('click', () => {
  if (collection.getRecipes().length === 0) {
    alert('No recipes to clear');
    return;
  }

  if (confirm('Are you sure you want to delete all recipes? This cannot be undone.')) {
    collection.clearAll();
    template.render();
  }
});
