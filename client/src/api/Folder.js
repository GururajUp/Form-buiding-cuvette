import axios from 'axios';

const BACKEND_ORIGIN_URL = 'http://localhost:3000';

const createFolder = async (foldername, userId) => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    throw new Error("No token found, please log in again.");
  }

  try {
    const response = await axios.post(
      `${BACKEND_ORIGIN_URL}/folder/createfolder/${userId}`,
      { foldername },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Error occurred");
    }
  }
};

const deleteFolder = async (folderId) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error("No token found, please log in again.");
  }

  try {
    const response = await axios.delete(
      `${BACKEND_ORIGIN_URL}/folder/deletefolder/${folderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Error occurred");
    }
  }
};

export { createFolder, deleteFolder };