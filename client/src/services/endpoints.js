const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  PRODUCT: {
    GET_ALL: "/get-all-products",
    GET_DETAILS: (id) => `/get-product-details/${id}`,
  },
};

export default API_ENDPOINTS;
