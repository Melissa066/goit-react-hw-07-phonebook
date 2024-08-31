import axios from 'axios';

const BASE_URL = 'https://636a8bf8c07d8f936da1604c.mockapi.io/contacts';



export async function getData() {
    const data = await axios.get(`${BASE_URL}`)
    return data.data;
}

export async function addData(newContact) {
    const data = await axios.post(BASE_URL, newContact);
    return data.data;
}

export async function removeData(id) {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
}