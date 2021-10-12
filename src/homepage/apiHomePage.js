import { display } from './displayHomePage';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Optional_alcohol';
const getCocktailsObject = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    display(data);
    console.log(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getCocktailsObject };