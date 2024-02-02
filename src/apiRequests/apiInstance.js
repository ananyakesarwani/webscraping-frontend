import Axios from 'axios';

export const ApiInstance = Axios.create({
    //baseUrl: "",
    timeout: 90000,
    headers: {
        "Content-Type": "application/json",
        apiKey: "0ea9d638-2bdf-44a7-a55f-b0d05687e000",
    },
});