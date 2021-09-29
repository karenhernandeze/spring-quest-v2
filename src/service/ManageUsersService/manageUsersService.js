import axios from 'axios'
const manageUsersService = process.env.REACT_APP_USERS_URL

export class ManageUsersService {

    async retrieveAllUsers() {
        console.log( "COURSE DATA SERVICE : RETRIEVE ALL COURSES")
        try{
            const data =  axios.get(`${manageUsersService}`).then(
                response => {
                    return response
                }
            )
            // return (await data).data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

};

export default new ManageUsersService();