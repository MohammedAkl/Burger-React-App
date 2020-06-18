import axios from 'axios';


const instance = axios.create ({

    baseURL: 'https://my-burger-e30db.firebaseio.com/'
});

export default instance;