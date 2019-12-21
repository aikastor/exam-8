import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://burger-buildr.firebaseio.com/'
});

export default axiosApi;
