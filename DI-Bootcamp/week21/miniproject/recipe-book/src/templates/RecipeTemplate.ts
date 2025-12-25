import { RecipeItem } from '../model/RecipeItem';
import { RecipeCollection } from '../model/RecipeCollection';

export class RecipeTemplate {
  private container: HTMLElement;
  private collection: RecipeCollection;

  constructor(containerId: string, collection: RecipeCollection) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container element with id "${containerId}" not found`);
    }
    this.container = container;
    this.collection = collection;
  }

  render(): void {
    this.container.innerHTML = '';
    const recipes = this.collection.getRecipes();

    if (recipes.length === 0) {
      this.container.innerHTML = '<p class="no-recipes">No recipes yet. Add your first recipe!</p>';
      return;
    }

    recipes.forEach((recipe) => {
      const card = this.createRecipeCard(recipe);
      this.container.appendChild(card);
    });
  }

  private createRecipeCard(recipe: RecipeItem): HTMLElement {
    const card = document.createElement('div');
    card.className = `recipe-card ${recipe.isFavorite ? 'favorite' : ''}`;
    card.dataset.id = recipe.id;

    card.innerHTML = `
      <div class="recipe-header">
        <h3 class="recipe-title">${this.escapeHtml(recipe.title)}</h3>
        <div class="recipe-actions">
          <button class="favorite-btn" title="${recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
            ${recipe.isFavorite ? '★' : '☆'}
          </button>
          <button class="delete-btn" title="Delete recipe">×</button>
        </div>
      </div>
      <div class="recipe-details" style="display: none;">
        <div class="recipe-ingredients">
          <h4>Ingredients:</h4>
          <ul>
            ${recipe.ingredients.map((ing) => `<li>${this.escapeHtml(ing)}</li>`).join('')}
          </ul>
        </div>
        <div class="recipe-instructions">
          <h4>Instructions:</h4>
          <p>${this.escapeHtml(recipe.instructions)}</p>
        </div>
      </div>
      <button class="toggle-details-btn">Show Details</button>
    `;

    this.attachCardEvents(card, recipe.id);
    return card;
  }

  private attachCardEvents(card: HTMLElement, recipeId: string): void {
    const favoriteBtn = card.querySelector('.favorite-btn');
    const deleteBtn = card.querySelector('.delete-btn');
    const toggleBtn = card.querySelector('.toggle-details-btn');
    const details = card.querySelector('.recipe-details') as HTMLElement;

    favoriteBtn?.addEventListener('click', () => {
      this.collection.toggleFavorite(recipeId);
      this.render();
    });

    deleteBtn?.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this recipe?')) {
        this.collection.removeRecipe(recipeId);
        this.render();
      }
    });

    toggleBtn?.addEventListener('click', () => {
      const isHidden = details.style.display === 'none';
      details.style.display = isHidden ? 'block' : 'none';
      toggleBtn.textContent = isHidden ? 'Hide Details' : 'Show Details';
    });
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
