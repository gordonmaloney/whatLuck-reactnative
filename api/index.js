import axios from 'axios';

//const url = 'http://localhost:5001/potlucks';
const url = 'https://whatluck.herokuapp.com/potlucks';


export const fetchPotlucks = () => axios.get(url);
export const createPotluck = (newPotluck) => axios.post(url, newPotluck)
export const updatePotluck = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)
export const deletePotluck = (id) => axios.delete(`${url}/${id}`)

export const deleteReply = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)