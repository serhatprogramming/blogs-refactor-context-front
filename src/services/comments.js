import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(`${baseUrl}/${id}/comments`, config);
  return response.data;
};

const addComment = async (id, token, content) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const comment = { comment: content };

  try {
    return await axios.post(`${baseUrl}/${id}/comments`, comment, config);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { addComment, getAll };
