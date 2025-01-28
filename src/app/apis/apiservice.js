class ApiService{
    #baseURL;
    constructor(){
        this.#baseURL = 'https://dummyjson.com/';
    }

    async GET(endpoint){
        try {
            const response = await fetch(`${this.#baseURL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            return data;
        } catch (error) {
            throw error
        }
    }
}

const apiService = new ApiService();
export default apiService;