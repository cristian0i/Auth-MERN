import axios from "axios";

const API = "http://localhost:3000";

export const signupReuqest = (user) => axios.post(`${API}/singup`, user, {
    withCredentials: true
});

export const signinReuqest = (user) => axios.post(`${API}/singin`, user, {
    withCredentials: true
});

export const googleReuqest = (user) => axios.post(`${API}/google`, user, {
    withCredentials: true
});

export const updateReuqest = (id, user) => axios.put(`${API}/update/${id}`, user, {
    withCredentials: true
});

export const logoutReuqest = () => axios.get(`${API}/logout`, {
    withCredentials: true
});

export const deleteReuqest = (id) => axios.delete(`${API}/delete/${id}`, {
    withCredentials: true
});