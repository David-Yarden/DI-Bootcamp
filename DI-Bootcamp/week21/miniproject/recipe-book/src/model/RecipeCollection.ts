import { RecipeItem } from './RecipeItem';
import type { IRecipeItem } from './RecipeItem';

const STORAGE_KEY = 'recipe-book-recipes';

export class RecipeCollection {
  private recipes: RecipeItem[] = [];

  constructor() {
    this.load();
  }

  getRecipes(): RecipeItem[] {
    return [...this.recipes];
  }

  addRecipe(recipe: RecipeItem): void {
    this.recipes.push(recipe);
    this.save();
  }

  removeRecipe(id: string): void {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    this.save();
  }

  toggleFavorite(id: string): void {
    const recipe = this.recipes.find((r) => r.id === id);
    if (recipe) {
      recipe.toggleFavorite();
      this.save();
    }
  }

  getRecipeById(id: string): RecipeItem | undefined {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  clearAll(): void {
    this.recipes = [];
    this.save();
  }

  save(): void {
    const data = this.recipes.map((recipe) => recipe.toJSON());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  load(): void {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed: IRecipeItem[] = JSON.parse(data);
        this.recipes = parsed.map((item) => RecipeItem.fromJSON(item));
      } catch (e) {
        console.error('Failed to load recipes from localStorage:', e);
        this.recipes = [];
      }
    }
  }
}
