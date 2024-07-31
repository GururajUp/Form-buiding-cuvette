import axios from 'axios';

const BACKEND_ORIGIN_URL = 'http://localhost:3000';

const login = async (email, password) => {
    try {
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/user/login`, { email, password });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error in Login");
        }
    }
}

const updateUser = async (username, email, newpassword, oldpassword, userId) => {
    try {
      const response = await axios.put(`${BACKEND_ORIGIN_URL}/user/updateuser/${userId}`, {
        username, email, newpassword, oldpassword
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Error occurred");
      }
    }
  };
  

const Register = async (username, email, password, confirmpassword) => {
    try {
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/user/signup`, { username, email, password, confirmpassword });
        return response;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error occurred");
        }
    }
}

const getUserFolders = async (userId) => {
    try {
        const response = await axios.get(`${BACKEND_ORIGIN_URL}/folder/user/${userId}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error occurred");
        }
    }
}
const userDetails = async (id) => {
    try {
        const userresponse = await axios.get(`${BACKEND_ORIGIN_URL}/user/userdetails/${id}`);
        return userresponse.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error occurred");
        }
    }
};

export { login,
         Register, 
         getUserFolders,
         updateUser,
         userDetails };