import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createNew = async ({ blog, token }) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    return await axios.post(baseUrl, blog, config);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteBlog = async ({ blog, token }) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    return await axios.delete(`${baseUrl}/${blog.id}`, config);
  } catch (error) {
    return error.message;
  }
};

const updateBlog = async (blog, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    return await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  } catch (error) {
    return error.message;
  }
};

export default { getAll, createNew, updateBlog, deleteBlog };
