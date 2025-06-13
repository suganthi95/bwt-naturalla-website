import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use((config) => {
//   // const token = localStorage.getItem('token')
//   if (true) {
//     // config.headers.Authorization = `Bearer ${token}`;
//     config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEp1biAwOSAyMDI1IDEzOjIzOjA5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJfaWQiOjMsInBob25lX25vIjoiODg4MzY2MDg1MSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQ1NTU4OX0.sPT7jc2DpU9iF-7lF6t0-MyTSjak2VfuoQi75cBQ-vg
// `;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );
