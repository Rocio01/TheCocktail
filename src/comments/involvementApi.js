const IdApi = 'Ta2GFwt8Cod1hXHUQeuH';
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
  const response = await fetch(`${url}/${IdApi}/comments?item_id=${id}`);
  const message = await (response.json());
  return message;
};

export { getComment, postComment };