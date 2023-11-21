import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

class Axios {
    private api: AxiosInstance;

    constructor(baseURL: string, noAuth: boolean) {
        this.api = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.handleResponse(this.api)
    }

    handleResponse(axios: AxiosInstance) {
        axios.interceptors.response.use(
            async (response: AxiosResponse) => {
                return response;
            },
            async (error) => {
                return Promise.reject(error);
            }
        );
    }
    async get<T>(url: string, configs?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.api.get<T>(url, configs);
            return response.data;
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    async post<T>(url: string, data: any, configs?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.api.post<T>(url, data, configs);

            return response.data;
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }

    async put<T>(url: string, data?: any, configs?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.api.put<T>(url, data, configs);
            return response.data;
        } catch (error) {
            console.error('PUT request failed:', error);
            throw error;
        }
    }

    async delete<T>(url: string, configs?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.api.delete<T>(url, configs);
            return response.data;
        } catch (error) {
            console.error('DELETE request failed:', error);
            throw error;
        }
    }
}


export const axiosInstance = new Axios(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : (process.env.NEXT_PUBLIC_API_URL || 'localhost://3000'), false);
export const axiosInstanceNoAuth = new Axios(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : (process.env.NEXT_PUBLIC_API_URL || 'localhost://3000'), true);
