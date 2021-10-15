const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i';
const getDetails = async (id) => {
  try {
    const response = await fetch(`${url}=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getDetails as default };