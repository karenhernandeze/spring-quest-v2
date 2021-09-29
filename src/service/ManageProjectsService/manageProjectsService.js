import axios from 'axios'
const manageProjectsService = process.env.REACT_APP_PROJECTS_URL
const imageUrl = process.env.REACT_APP_IMAGES_URL;
const url = process.env.REACT_APP_PROJECTS_CREATE_URL

export class ManageProjectsService {

    async retrieveAllProjects() {
        try {
            const data = await axios.get(`${manageProjectsService}`);
            console.log(data.data.data)
            return data.data.data
        } catch (err) {
            return err.message
        }
    }

    async retrieveAllProjectsByUserId() {
        try {
            const data = await axios.get(`${manageProjectsService}/2615283`);
            console.log(data.data.data)
            return data.data.data
        } catch (err) {
            return err.message
        }
    }

    async updloadImage(formdata) {
        const response = await fetch(`${imageUrl}`, {
                method: 'POST',
                body: formdata
        }) 
        return response.json() 
    }

    async postNewProject(project) {
        try {
            console.log(project)
            const data = await axios.post(`${url}`, project);
            console.log(data)
            console.log(data.data.data)
            console.log(data.data)
            return data.data.data
        } catch (err) {
            return err.message
        }
    }

};

export default new ManageProjectsService();