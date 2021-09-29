import axios from 'axios'
const manageServicesService = process.env.REACT_APP_SERVICES_CREATE_URL

export class ManageServicesService {

    async postService(service) {
        try {
            const data = await axios.post(`${manageServicesService}`, service);
            console.log(data.data.data)
            return data.data.data
        } catch (err) {
            console.log(err + "unsuccess");
            return err.message
        }
    }

};

export default new ManageServicesService();