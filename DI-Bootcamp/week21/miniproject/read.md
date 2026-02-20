This is a miniproject for Developpers institute bootcamp, i'm trying to do vibe coding here as they showcase in a presentation this week, here are the instructions:


Mini Project XP: Recipe Book App.

Last Updated: October 10th, 2025

Mini-project: Recipe Book Application with TypeScript and Data Sources


👩‍🏫 👩🏿‍🏫 What You’ll learn

    TypeScript Basics: Understanding TypeScript classes, interfaces, and type annotations
    Data Management: Handling recipe data with TypeScript classes and storing in localStorage
    DOM Manipulation: Creating and updating recipe cards dynamically
    Event Handling: Managing user interactions for adding and managing recipes
    Project Structure: Organizing a TypeScript project with Vite


Description

Build a recipe book application using TypeScript where users can add, delete, and mark recipes as favorites. The application will store recipes locally and allow users to manage their collection of recipes.


Project Overview

You’ll work with four key files:

    RecipeItem.ts: Manages individual recipe entries
    RecipeCollection.ts: Handles the complete collection of recipes
    RecipeTemplate.ts: Manages rendering the recipes in the DOM
    main.ts: Bootstraps the application


Project Setup


1. Set up a new Vite project:

npm create vite@latest
# Choose vanilla-ts template
cd your-project-name
npm install



2. Install UUID for generating unique recipe IDs:

npm install uuid



**3. Create the following folder structure:

- src/
  - model/
     - RecipeItem.ts
     - RecipeCollection.ts
  - templates/
     - RecipeTemplate.ts
  - main.ts


Implementation Requirements


1. RecipeItem.ts

Create a class that represents a single recipe with properties:

    id: Unique identifier
    title: Recipe name
    ingredients: Array of ingredients
    instructions: Cooking instructions
    isFavorite: Boolean flag for favorite recipes


2. RecipeCollection.ts

Implement a class that manages all recipes with methods to:

    Add new recipes
    Remove recipes
    Toggle favorite status
    Save to localStorage
    Load from localStorage


3. RecipeTemplate.ts

Create a class that handles DOM rendering with features to:

    Display recipe cards with title, ingredients, and instructions
    Add favorite/unfavorite functionality
    Include delete buttons
    Show/hide recipe details


4. HTML Structure

<div class="recipe-app">
  <form id="recipeEntryForm">
    <input type="text" id="recipeTitle" placeholder="Recipe Title" required />
    <textarea
      id="ingredients"
      placeholder="Enter ingredients (one per line)"
      required
    ></textarea>
    <textarea
      id="instructions"
      placeholder="Enter cooking instructions"
      required
    ></textarea>
    <button type="submit">Add Recipe</button>
  </form>

  <div id="recipeContainer"></div>

  <button id="clearRecipesButton">Clear All Recipes</button>
</div>


Submit your exercises :

Don’t forget to push to Github

One Last Thing: Good luck!

