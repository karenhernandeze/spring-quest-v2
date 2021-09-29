import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import './getInvolved.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ManageProjectsService from '../../service/ManageProjectsService/manageProjectsService';
import ManageCategoriesService from '../../service/ManageCategoriesService/manageCategoriesService';
import ProjectCard from '../../components/ProjectCards/ProjectCard';

class GetInvolved extends Component {
    constructor(props) {
        super(props);
        this.state = {
            investFor: "Any Project",
            service: "Any Service",
            region: "Any Region",
            category: "Any Category",
            categories: [],
            projects: []
        }
        this.createProject = this.createProject.bind(this)
    }

    componentDidMount() {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if (reloadCount < 2) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }
        ManageProjectsService.retrieveAllProjects().then(
            response => {
                console.log(response)
                this.setState({ projects: response });
            }
        )
        ManageCategoriesService.retrieveAllCategories().then(
            response => {
                this.setState({ category: response });
            }
        )
        console.log(this.state)
        // console.log(this.state.projects.map((project) => {
        //     console.log(project.projectname)
        // }))


        // ManageProjectsService.postNewProject({
        //     "userId": "2615283",
        //     "projectName": this.state.projectName,
        //     "projectType": this.state.projectType,
        //     "description": this.state.description,
        //     "exepctedStartDate": this.state.exepctedStartDate,
        //     "exepctedEndDate": this.state.exepctedEndDate,
        //     "country": this.state.country,
        //     "city": this.state.city,
        //     "categoryId": this.state.categoryId,
        //     "collaboratorsId": this.state.collaboratorsId,
        //     "photosId": this.state.imageData,
        //     "phases": parseInt(this.state.phases),
        //     "serviceId": this.state.serviceId
        // }).then(
        //     response => {
        //         console.log(response)
        //     }
        // )
    }

    handleChange = (event) => {
        this.setState({ investFor: event.target.value })
    }
    handleChangeService = (event) => {
        this.setState({ service: event.target.value })
    }
    handleChangeRegion = (event) => {
        this.setState({ region: event.target.value })
    }
    handleChangeCategory = (event) => {
        this.setState({ category: event.target.value })
    }

    createProject() {
        this.props.history.push(`/create/one`)
    }

    render() {
        return (
            <div class='bg'>
                <div class={`d-flex justify-content-end`} style={{ marginTop: "30px", marginRight: "90px" }}>
                    <Button class={"btn"} onClick={this.createProject}>
                        START NEW PROJECT
                    </Button>
                </div>
                <div style={{ height: "300px" }}>
                    <Typography class={`textGI`} variant="h3" component="h1" gutterBottom>
                        <em>By helping others...</em>
                    </Typography>
                    <Typography class={`textGI`} variant="h3" component="h1" gutterBottom>
                        <em>...we help ourselves</em>
                    </Typography>
                </div>
                <div class="d-flex justify-content-evenly">
                    <Button class={"btnP"}>
                        Philantropist
                    </Button>
                    <Button class={`btnA`}>
                        Angel
                    </Button>
                    <Button class={"btnB"}>
                        Banker
                    </Button>
                </div>
                <div class="d-flex justify-content-evenly" style={{ marginTop: '90px' }}>
                    <FormControl style={{ margin: 16, minWidth: "120px" }}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label" style={{ color: 'white' }}>
                            Invest For
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={this.state.investFor}
                            onChange={this.handleChange}
                            displayEmpty
                            style={{ marginTop: 16, color: 'white' }}
                        >
                            <MenuItem value="Any Project">
                                <em>Any Project</em>
                            </MenuItem>
                            <MenuItem value={"Individual"}>Individual</MenuItem>
                            <MenuItem value={"Collective"}>Collective</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ margin: 16, minWidth: "120px" }}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label" style={{ color: 'white' }}>
                            Service
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={this.state.service}
                            onChange={this.handleChangeService}
                            displayEmpty
                            style={{ marginTop: 16, color: 'white' }}
                        >
                            <MenuItem value="Any Service">
                                <em>Any Service</em>
                            </MenuItem>
                            <MenuItem value={"Money"}>Money</MenuItem>
                            <MenuItem value={"Time"}>Time</MenuItem>
                            <MenuItem value={"Knowledge"}>Knowledge</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ margin: 16, minWidth: "120px" }}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label" style={{ color: 'white' }}>
                            Region
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={this.state.region}
                            onChange={this.handleChangeRegion}
                            displayEmpty
                            style={{ marginTop: 16, color: 'white' }}
                        >
                            <MenuItem value="Any Region">
                                <em>Any Region</em>
                            </MenuItem>
                            <MenuItem value={"Individual"}>Monterrey</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ margin: 16, minWidth: "120px" }}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label" style={{ color: 'white' }}>
                            Category
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={this.state.category}
                            onChange={this.handleChangeCategory}
                            displayEmpty
                            style={{ marginTop: 16, color: 'white' }}
                        >
                            <MenuItem value="Any Category">
                                <em>Any Category</em>
                            </MenuItem>
                            <MenuItem value={"Individual"}>Individual</MenuItem>
                            <MenuItem value={"Collective"}>Collective</MenuItem>
                        </Select>
                    </FormControl>
                    <Button style={{ height: '50px' }} class={"btnSearch"}>
                        Search
                    </Button>
                </div>
                <div class="d-flex flex-column bd-highlight" style={{ height: '102vh', backgroundColor: "#023047", marginTop: '5px' }}>
                    <Typography style={{ flex: 1 }} class={`textGI`} variant="h3" component="h1" gutterBottom>
                        <em>some of the top projects</em>
                    </Typography>
                    <Grid container spacing={3} className="gridTop">
                        {
                            ((this.state.projects).slice(0,4)).map(project => 
                                <Grid item xs={6}>
                                    {console.log(project)}
                                    <ProjectCard name={project.projectname} 
                                        description={project.description}
                                        image={project.photosid[0]}
                                    /> 
                                </Grid>
                            )
                        }

                    </Grid>
                </div>
                <div style={{ height: '100vh', backgroundColor: "#38a3a5" }}>
                    <Typography class={`textGI`} variant="h3" component="h1" gutterBottom>
                        <em>active projects</em>
                    </Typography>
                    {/* {
                        this.state.projects.map(
                            project =>
                        
                                <div>
                                    {project.projectname}
                                </div>

                        )
                    } */}
                </div>
            </div>
        )
    }
}

export default withRouter(GetInvolved)

