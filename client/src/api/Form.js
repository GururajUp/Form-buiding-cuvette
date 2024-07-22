import axios from 'axios';

const BACKEND_ORIGIN_URL = 'http://localhost:3000';

const saveForm = async (formDetails) => {
  const token = localStorage.getItem('token');
  console.log("token from form", token);

  if (!token) {
    throw new Error("No token found, please log in again.");
  }

  try {
    const response = await axios.post(
      `${BACKEND_ORIGIN_URL}/form/saveform`,
      formDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log("form response", response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export { saveForm };