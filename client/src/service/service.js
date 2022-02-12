import { addProfile } from "../redux-toolkit/reducer/profile-reducer";
import { profileStore } from "../redux-toolkit/store/profile-store";
import axios from "axios";

const dbUrl = process.env.REACT_APP_DATA_BASE_URL;
export const curentUser = JSON.parse(localStorage.getItem("User"));
export const axiosReq = axios.create({
  baseURL: dbUrl,
});
axiosReq.interceptors.request.use((config) => {
  const TokenData = JSON.parse(localStorage.getItem("Token"));
  config.headers = {
    authorization: `Bearer ${TokenData}`,
  };
  return config;
});
export const Login = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${dbUrl}/api/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("Token", JSON.stringify(res.data.token));
        localStorage.setItem("User", JSON.stringify(res.data.utilisaeur));
        storeUpdate();
        resolve(res);
      })
      .catch((error) => reject(error.response));
  });
};
export const logout = () => {
  return new Promise((resolve, reject) => {
    localStorage.clear();
    resolve();
  });
};
export const register = (email, password, firstName, lastName) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${dbUrl}/api/auth/signup`, {
        email: email,
        password: password,
        userFirstName: firstName,
        userLastName: lastName,
      })
      .then((d) => {
        resolve(d);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const storeUpdate = () => {
  const currentUser = JSON.parse(localStorage.getItem("User"));
  profileStore.dispatch(
    addProfile({
      uid: currentUser._id,
      email: currentUser.email,
      displayName: currentUser.userFirstName,
      photoURL: currentUser.userImage || "",
    }),
  );
};
export const upImgProfile = (img) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", img);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axiosReq
      .put("/api/update/photo", formData, config)
      .then((data) => {
        localStorage.removeItem("User");
        localStorage.setItem("User", JSON.stringify(data.data.user));
        storeUpdate();
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};
export const upProfile = (firstName, lastName, email) => {
  return new Promise((resolve, reject) => {
    const currentUser = JSON.parse(localStorage.getItem("User"));
    axiosReq
      .put("/api/update/user", {
        userFirstName: firstName || currentUser.userFirstName,
        userLastName: lastName || currentUser.userLastName,
        email: email || currentUser.email,
      })
      .then((data) => {
        localStorage.removeItem("User");
        localStorage.setItem("User", JSON.stringify(data.data.user));
        storeUpdate();
        resolve(data.data);
      })
      .catch((error) => reject(error.response.data.err));
  });
};

export const setPost = (post) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .post("/api/posts", post)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => reject(error.response));
  });
};

export const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .delete("/api/posts", {
        params: {
          postId: id,
        },
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => reject(error.response));
  });
};

export const setComment = (id, comment) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .post("/api/comments", {
        postId: id,
        comment: comment,
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => reject(error.response));
  });
};

export const getComment = (id) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .get("/api/comments", {
        params: { postId: id },
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => reject(error.response));
  });
};

export const setLikeDislike = (postId) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .put("/api/posts/like", {
        postId: postId,
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => reject(error.response));
  });
};

export const getConversation = (id) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .get(`/api/conversation/${id}`)
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => reject(error.response));
  });
};
export const newConversation = (id) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .post(`/api/conversation/`, {
        receiverId: id,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => reject(error.response));
  });
};
export const deleteConversation = (id) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .delete(`/api/conversation/${id}`)
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => reject(error.response));
  });
};

export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .get(`/api/user/?userId=${id}`)
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => reject(error.response));
  });
};
export const getMessages = (id) => {
  return new Promise((resolve, reject) => {
    id &&
      axiosReq
        .get(`/api/messages/${id}`)
        .then((data) => {
          resolve(data.data);
        })
        .catch((error) => reject(error.response));
  });
};
export const sendMessages = (msg, conversationId) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .post(`/api/messages`, {
        conversationId: conversationId,
        msg: msg,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => reject(error.response));
  });
};

export const searchUser = (name) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .get(`/api/searchuser/?userName=${name}`)
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => reject(error.data));
  });
};
