const IdApi = 'sA4fKEoI3aBY6qxyB5hu';
const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

const postComment = async (comment) => {
  try {
    const response = await fetch(`${url}/${IdApi}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    });
    const message = await response.text();
    if (message.message === 'Error') {
      throw new Error(message.message);
    }
    return message;
  } catch (error) {
    return error;
  }
};

const getComment = async (id) => {
  try {
    const response = await fetch(`${url}/${IdApi}/comments?item_id=${id}`);
    const message = await (response.json());
    if (message.status === 'Error') {
      throw new Error(message.message);
    }
    const propertyValues = Object.values(message);
    return propertyValues;
  } catch (error) {
    return error;
  }
};

export { getComment, postComment };