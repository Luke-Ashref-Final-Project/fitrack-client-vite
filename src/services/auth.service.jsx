import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
});

const signupCoach = async ({ email, username, password, description }) => {
  try {
    const response = await api.post("/signup/coach", {
      email,
      username,
      password,
      description,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const signupClient = async ({ email, username, password, description }) => {
  try {
    const response = await api.post("/signup/client", {
      email,
      username,
      password,
      description,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const logIn = async ({ email, password, userType }) => {
  try {
    const response = await api.post("/login", { email, password, userType });
    return {responseData: response.data, responseStatus: response.status}
  } catch (err) {
    console.error(err);
    return err
  }
};

const verifyToken = async (storedToken) => {
  try {
    const response = await api.get("/verify", {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const uploadPhoto = async (file) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.put("/profile/upload", file, config);
    return response.data;
    
  } catch (err) {
    console.error(err);
  }
};

const getCurrentUser = async () => {
  const storedToken = localStorage.getItem("authToken");
  try {
    const response = await api.get("/user", {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    console.log("current user:", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};


const getCoaches = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get("/getcoach", config);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const passwordUpdate = async ({ currentPassword, newPassword }) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.put(
      "/profile/password",
      { currentPassword, newPassword },
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllSubscribers = async () => {
  try {
    const storedToken = localStorage.getItem("authToken");
    const response = await api.get("/profile/getallsubscribers",{
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    return response.data
  } catch (err) {
    throw err;
  }
};

const subscribe = async (coachId) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.put(`/subscribe/${coachId}`, {}, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const unSubscribe = async (coachId) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.put(`/unsubscribe/${coachId}`, {}, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const coachOverview = async (coachId) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get(`/coaches/${coachId}`, config)
    return response.data
  } catch (error) {
    throw error
  }
}

const deleteUser = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.delete("/profile/delete", config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const updateDescription = async ({ description }) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.put("/profile/description", { description }, config)
    return response.data

  } catch (error) {
    console.log(error)
  }
};

const authMethods = {
  signupCoach,
  signupClient,
  logIn,
  verifyToken,
  uploadPhoto,
  getCurrentUser,
  getCoaches,
  passwordUpdate,
  getAllSubscribers,
  subscribe,
  coachOverview,
  unSubscribe,
  deleteUser,
  updateDescription,
};

export default authMethods;
