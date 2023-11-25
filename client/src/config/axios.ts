import axios, {type CreateAxiosDefaults} from 'axios'

const axios_config: CreateAxiosDefaults = {
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    }

const api = axios.create(axios_config)

export default api