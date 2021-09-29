import axios from 'axios'
const manageCategoriesService = process.env.REACT_APP_CATEGORIES_URL

export class ManageCategoriesService {

    async retrieveAllCategories() {
        try{
            const data = await  axios.get(`${manageCategoriesService}`)
            return data.data.data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }
};

export default new ManageCategoriesService();