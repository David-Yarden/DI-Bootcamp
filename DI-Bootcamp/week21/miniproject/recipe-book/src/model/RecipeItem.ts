import { v4 as uuidv4 } from 'uuid';

export interface IRecipeItem {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

export class RecipeItem implements IRecipeItem {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;

  constructor(
    title: string,
    ingredients: string[],
    instructions: string,
    isFavorite: boolean = false,
    id?: string
  ) {
    this.id = id || uuidv4();
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.isFavorite = isFavorite;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  toJSON(): IRecipeItem {
    return {
      id: this.id,
      title: this.title,
      ingredients: this.ingredients,
      instructions: this.instructions,
      isFavorite: this.isFavorite,
    };
  }

  static fromJSON(data: IRecipeItem): RecipeItem {
    return new RecipeItem(
      data.title,
      data.ingredients,
      data.instructions,
      data.isFavorite,
      data.id
    );
  }
}
