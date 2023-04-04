import axios from 'axios';

let store;

export const injectStore = (newStore) => {
  store = newStore;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const { jwtToken } = store.getState().user;
    if (!jwtToken) return config;
    return {
      ...config,
      headers: {
        ...(config?.headers || {}),
        Authorization: `Bearer ${jwtToken}`,
      },
    };
  },
  (error) => {
    Promise.reject(error);
  },
);

export default api;
