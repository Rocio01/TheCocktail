import { getCocktailsObject } from './apiHomePage';

const loadHomePage = () => {
  window.addEventListener('DOMContentLoaded', getCocktailsObject());
};

export { loadHomePage };