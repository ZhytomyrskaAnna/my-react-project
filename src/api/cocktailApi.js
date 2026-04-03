const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

// Search cocktail by name
export const searchCocktailByName = async (name) => {
  const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

// List all cocktails by first letter
export const listCocktailsByLetter = async (letter) => {
  const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

// Search ingredient by name
export const searchIngredientByName = async (name) => {
  const response = await fetch(`${BASE_URL}/search.php?i=${name}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

// Lookup full cocktail details by id
export const getCocktailDetailsById = async (id) => {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

// Lookup ingredient by ID
export const getIngredientById = async (id) => {
  const response = await fetch(`${BASE_URL}/lookup.php?iid=${id}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

// Lookup a random cocktail
export const getRandomCocktail = async () => {
  const response = await fetch(`${BASE_URL}/random.php`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

// Search by ingredient
export const filterByIngredient = async (ingredient) => {
  const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

// Filter by alcoholic
export const filterByAlcoholic = async (alcoholic) => {
  const response = await fetch(`${BASE_URL}/filter.php?a=${alcoholic}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

// Filter by Category
export const filterByCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

// Filter by Glass
export const filterByGlass = async (glass) => {
  const response = await fetch(`${BASE_URL}/filter.php?g=${glass}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

// List the categories, glasses, ingredients or alcoholic filters
const getList = async (type) => { // type can be 'c', 'g', 'i', 'a'
  const response = await fetch(`${BASE_URL}/list.php?${type}=list`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

export const getCategoriesList = () => getList('c');
export const getGlassesList = () => getList('g');
export const getIngredientsList = () => getList('i');
export const getAlcoholicList = () => getList('a');