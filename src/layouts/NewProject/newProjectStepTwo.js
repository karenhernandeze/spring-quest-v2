import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import './newProject.css'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import ManageProjectsService from '../../service/ManageProjectsService/manageProjectsService';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import ManageCategoriesService from '../../service/ManageCategoriesService/manageCategoriesService';

class NewProjectStepOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 1,
            checked: true, 

            projectName: '',
            description: '',
            exepctedStartDate: new Date(),
            exepctedEndDate: new Date(),
            city: '',
            country: '',
            categoryId: [], 
            collaboratorsId: [1,2,3], //MISSING 
            phases: '1',

            errorProjectName: false,
            errorDescription: false, 
            errorCountry: false,
            errorCity: false,
            errorCollaboratorsId: false,

            category: [],
            categories: [],
            projects: [],
            previousProject: '',

            activeStep: 1,
            steps: [],
            description_steps: []
        }
        this.handleUser = this.handleUser.bind(this)
        this.handleCompany = this.handleCompany.bind(this)
        this.handleChecked = this.handleChecked.bind(this)
        this.nextStep = this.nextStep.bind(this)
    }

    //Set the steps state to the following. In order to get the description
    componentDidMount() {
        this.setState({steps: [
            'Step One', 
            'Step Two', 
            'Step Three',
            'Step Four', 
            'Step Five'
        ]});
        this.setState({description_steps: [
            'Personal Information', 
            'Project Basics', 
            'Project Content',
            'Goals', 
            'Set Up Payment Gateway'
        ]});
        this.getProjects()
        this.retrievedCategories()
    } 

    retrievedCategories(){
        ManageCategoriesService.retrieveAllCategories().then(
            response => { 
                this.setState({category: response});
            }
        )
    }

    async nextStep(){
        await this.categoriesIdSetState()
        this.props.history.push(`/create/three`, {state: 
            this.state = {
                projectName: this.state.projectName,
                description: this.state.description,
                exepctedStartDate: this.state.exepctedStartDate.toLocaleDateString("af-ZA"),
                exepctedEndDate: this.state.exepctedEndDate.toLocaleDateString("af-ZA"),
                city: this.state.city,
                country: this.state.country,
                categoryId: this.state.categoryId,
                collaboratorsId: this.state.collaboratorsId,
                phases: this.state.phases
            }
        })
    }

    categoriesIdSetState() {
        this.state.categories.map(
            value => {
                this.setState( prevState => ({
                    categoryId: [...prevState.categoryId, value.id]
                }))
            }
        )
    }

    getProjects(){
        ManageProjectsService.retrieveAllProjectsByUserId().then(
            response => {
                this.setState({ projects: response })
            }
        )
    }

    handleUser() {
        if (this.state.user === 3){
            this.setState(prevState => ({
                user: 2
            }))
        } else if (this.state.user === 1){
            this.setState(prevState => ({
                user: 2
            }))
        }
    }

    handleCompany(){
        if (this.state.user === 1){
            this.setState(prevState => ({
                user: 3
            }))
        } else if (this.state.user === 2){
            this.setState(prevState => ({
                user: 3
            }))
        }
    }

    handleChecked(){
        if (this.state.checked === true){
            this.setState(prevState => ({
                checked: false
            }))
        } else if (this.state.checked === false){
            this.setState(prevState => ({
                checked: true
            }))
        }
        
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleDateChange = date => {
        this.setState({
            exepctedStartDate: date
        })
    }

    handleDateChangeEnd = date => {
        this.setState({
            exepctedEndDate: date
        })
    }

    handleCategoryChange = event => {
        this.setState({
            categories: event.target.value
        })
    }

    handleProjectChange = event => {
        this.setState({
            previousProject: event.target.value
        })
        this.setState({
            phases: event.target.value.phases
        })
    }

    render() {
        return(
            <div class='root-center'>
            <Stepper activeStep={this.state.activeStep} alternativeLabel>
                {this.state.steps.map((label) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                }
                )}
            </Stepper>
            
            <div>
                <Typography variant="h4" style={{marginTop: 10, textAlign: "center"}}> START YOUR PROJECT </Typography>
                
                
                {this.state.activeStep === this.state.steps.length ? (
                <div> 
                    <Typography class='instructions'>All steps completed</Typography>
                </div>
                
                ):(

                <div>
                    <div class='step'>
                        <Grid container spacing={3}>
                            <Grid item xs={1} class='grid-right'>
                                <Avatar  style={{backgroundColor: "#3f51b5"}}>{this.state.activeStep + 1}</Avatar>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5">{this.state.description_steps[this.state.activeStep]}</Typography>
                            </Grid>
                        </Grid>
                    </div>
                    {

                    <>
                    <div class='stepTwo-out'>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Button fullWidth 
                                variant={(this.state.user === 1 || this.state.user === 2) ? "contained" : "outlined"} 
                                style= {(this.state.user === 1 || this.state.user === 2) ? {opacity: "1"} : {opacity: "0.5"}} 
                                color= {(this.state.user === 1 || this.state.user === 2) ? "primary" : "default"} 
                                onClick={this.handleUser} 
                                >Individual</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth 
                                variant={(this.state.user === 1 || this.state.user === 3) ? "contained" : "outlined"} 
                                style= {(this.state.user === 1 || this.state.user === 3) ? {opacity: "1"} : {opacity: "0.5"}} 
                                color= {(this.state.user === 1 || this.state.user === 3) ? "primary" : "default"} 
                                onClick={this.handleCompany} 
                                >Collective</Button>
                            </Grid>
                        </Grid>
                    </div>
                    {
                        this.state.user === 2 ? 
                        <>
                            <div class='stepOne'>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField 
                                        fullWidth 
                                        required
                                        id="projectName"
                                        name="projectName"
                                        value={this.projectName}
                                        error={this.state.errorProjectName}
                                        onChange={this.handleChange}
                                        label="Project Name" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                        fullWidth 
                                        required
                                        multiline
                                        rows={3}
                                        id="description"
                                        name="description"
                                        value={this.description}
                                        error={this.state.errorDescription}
                                        onChange={this.handleChange}
                                        label="Description" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField 
                                        fullWidth 
                                        required 
                                        id="country"
                                        name="country"
                                        value={this.country}
                                        error={this.state.errorCountry}
                                        onChange={this.handleChange}
                                        label="Country" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField 
                                        fullWidth 
                                        id="city" 
                                        required 
                                        name="city"
                                        value={this.city}
                                        error={this.state.errorCity}
                                        onChange={this.handleChange}
                                        label="City" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                                            <KeyboardDatePicker
                                                fullWidth
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Expected Start Day"
                                                value={this.state.exepctedStartDate}
                                                onChange={this.handleDateChange}
                                                KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            fullWidth
                                            label="Date picker dialog"
                                            format="MM/dd/yyyy"
                                            value={this.state.exepctedEndDate}
                                            onChange={this.handleDateChangeEnd}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>         
                                           {/* FIRST ONE */}
                                    <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel fullWidth>Category</InputLabel>
                                                <Select
                                                    fullWidth
                                                    multiple
                                                    value={this.state.categories}
                                                    onChange={this.handleCategoryChange}
                                                    input={<Input id="select-multiple-chip" />}
                                                    renderValue={(selected) => (
                                                        <div style={{display: "flex", flexWrap: "wrap"}}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value.category_name} style={{margin: 2}}/>
                                                        ))}
                                                        </div>
                                                    )}
                                                >
                                                    {this.state.category.map((name) => (
                                                        <MenuItem key={name.id} value={name}>
                                                        {name.category_name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                color="primary"
                                                checked={this.state.checked}
                                                onChange={this.handleChecked}
                                                />
                                            }
                                            label="Initial Phase"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                    {
                                        this.state.checked === true ? null : 
                                            <FormControl fullWidth>
                                                <InputLabel fullWidth>Select The Previous Project</InputLabel>
                                                <Select
                                                    fullWidth
                                                    value={this.state.previousProject}
                                                    onChange={this.handleProjectChange}
                                                >
                                                    {
                                                        this.state.projects.map(
                                                            project =>
                                                            <MenuItem fullWidth value={project}>
                                                                {project.projectname}
                                                            </MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                    }
                                    </Grid>                 
                                
                                </Grid>
                            </div>
                        </>
                        : this.state.user === 3 ?
                        <>


                            <div class='stepOne'>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField 
                                        fullWidth 
                                        required
                                        variant="outlined"
                                        id="projectName"
                                        name="projectName"
                                        value={this.projectName}
                                        error={this.state.errorProjectName}
                                        onChange={this.handleChange}
                                        label="Project Name" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField 
                                        fullWidth 
                                        required
                                        variant="outlined"
                                        id="collaboratorsId"
                                        name="collaboratorsId"
                                        value={this.collaboratorsId}
                                        error={this.state.errorCollaboratorsId}
                                        onChange={this.handleChange}
                                        label="Search Users" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                        fullWidth 
                                        required
                                        multiline
                                        rows={3}
                                        id="description"
                                        variant="outlined"
                                        name="description"
                                        value={this.description}
                                        error={this.state.errorDescription}
                                        onChange={this.handleChange}
                                        label="Description" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField 
                                        fullWidth 
                                        required 
                                        variant="outlined"
                                        id="country"
                                        name="country"
                                        value={this.country}
                                        error={this.state.errorCountry}
                                        onChange={this.handleChange}
                                        label="Country" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField 
                                        fullWidth 
                                        variant="outlined"
                                        id="city" 
                                        required 
                                        name="city"
                                        value={this.city}
                                        error={this.state.errorCity}
                                        onChange={this.handleChange}
                                        label="City" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                                            <KeyboardDatePicker
                                                fullWidth
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Expected Start Day"
                                                value={this.state.exepctedStartDate}
                                                onChange={this.handleDateChange}
                                                KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            fullWidth
                                            label="Date picker dialog"
                                            format="MM/dd/yyyy"
                                            value={this.state.exepctedEndDate}
                                            onChange={this.handleDateChangeEnd}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>                
                                    {/* second one */}
                                    <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel fullWidth>Category</InputLabel>
                                                <Select
                                                    fullWidth
                                                    multiple
                                                    value={this.state.categories}
                                                    onChange={this.handleCategoryChange}
                                                    input={<Input id="select-multiple-chip" />}
                                                    renderValue={(selected) => (
                                                        <div style={{display: "flex", flexWrap: "wrap"}}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} style={{margin: 2}}/>
                                                        ))}
                                                        </div>
                                                    )}
                                                >
                                                    {this.state.category.map((name) => (
                                                        <MenuItem key={name} value={name}>
                                                        {name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                color="primary"
                                                checked={this.state.checked}
                                                onChange={this.handleChecked}
                                                />
                                            }
                                            label="Initial Phase"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                    {
                                        this.state.checked === true ? null : 
                                            <FormControl fullWidth>
                                                <InputLabel fullWidth>Select The Previous Project</InputLabel>
                                                <Select
                                                    fullWidth
                                                    value={"One"}
                                                >
                                                    <MenuItem fullWidth>
                                                        <em> None </em>
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                    }
                                    </Grid>                 
                                </Grid>
                            </div>
                        </>
                        : null
                    }
                    </>

                    }
                    <div class='steps-buttom'>
                    <Button
                        disabled={this.state.activeStep === 0}
                        onClick={
                            () => {this.props.history.goBack()}
                            // () => this.setState({ activeStep: this.state.activeStep - 1 })
                        }
                        style={{marginRight: 10}}
                    >
                    Back
                    </Button>
                    <Button variant="contained" color="primary"
                        onClick={this.nextStep}
                    >
                        {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                    </div>
                </div>
            )}
            </div>
        </div>
    )}
}

export default withRouter (NewProjectStepOne)