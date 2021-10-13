const IdApi = 'epwor3p82XFh2y1xgq7N';
const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

const postLike = async (heart) => {
  try {
    const params = {};
    params.item_id = heart.parentElement.id;
    const response = await fetch(`${url}/${IdApi}/likes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const message = await response.json();
    if (message.message === 'Error') {
      throw new Error(message.message);
    }
    return message;
  } catch (error) {
    return error;
  }
};

const getLikes = async () => {
  try {
    const response = await fetch(`${url}/${IdApi}/likes/`);
    const data = await response.json();
    console.log(data[0].item_id)
    const arr = Object.entries(data)
    const likesInformation = arr.filter(x => x.item_id === "item-12916")
    console.log(likesInformation)
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { postLike, getLikes };