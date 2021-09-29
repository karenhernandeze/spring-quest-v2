import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import './newProject.css'
import Button from '@material-ui/core/Button';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Typography } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Avatar } from '@material-ui/core';
import ManageProjectsService from '../../service/ManageProjectsService/manageProjectsService'
import ManageServicesService from "../../service/ManageServicesService/manageServicesService"
const preset = 'krizk89i';
const cloud_name = 'dzuxehghe';

class newProjectStepFour extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedMoney: true,
            checkedTime: false,
            checkedExperience: false,
            money: "",
            time: "",
            experience: "",
            projectType: 1,

            activeStep: 3,
            steps: [],
            description_steps: [],

            fileUrl: this.props.history.location.state.state.fileUrl,
            imageData: [],
            projectName: this.props.history.location.state.state.projectName,
            description: this.props.history.location.state.state.description,
            exepctedStartDate: this.props.history.location.state.state.exepctedStartDate,
            exepctedEndDate: this.props.history.location.state.state.exepctedEndDate,
            city: this.props.history.location.state.state.city,
            country: this.props.history.location.state.state.country,
            categoryId: this.props.history.location.state.state.categoryId,
            collaboratorsId: this.props.history.location.state.state.collaboratorsId,
            phases: this.props.history.location.state.state.phases,
            serviceId: ""
        }
        this.handleCheckedMoney = this.handleCheckedMoney.bind(this)
        this.handleCheckedTime = this.handleCheckedTime.bind(this)
        this.handleCheckedExperience = this.handleCheckedExperience.bind(this)
        this.handlePhilanthropy = this.handlePhilanthropy.bind(this)
        this.handleAngel = this.handleAngel.bind(this)
        this.handleBanker = this.handleBanker.bind(this)
        this.nextStep = this.nextStep.bind(this)
        this.uploadImages = this.uploadImages.bind(this)
    }

    componentDidMount() {
        this.uploadImages()
        this.setState({
            steps: [
                'Step One',
                'Step Two',
                'Step Three',
                'Step Four',
                'Step Five'
            ]
        });
        this.setState({
            description_steps: [
                'Personal Information',
                'Project Basics',
                'Project Content',
                'Goals',
                'Set Up Payment Gateway'
            ]
        });
        console.log(this.state)
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    //UPLOAD IMAGE CHANGE
    async uploadImages() {
        this.state.fileUrl.map((imageFile) => {
            var formdata = new FormData();
            formdata.append('file', imageFile);
            formdata.append('cloud_name', cloud_name);
            formdata.append('upload_preset', preset);
            ManageProjectsService.updloadImage(formdata).then(
                response => {
                    console.log(response.secure_url)
                    this.setState(prevState => ({
                        imageData: [...prevState.imageData, response.secure_url]
                    }));
                }
            )
        })
    }

    async projectType(){
        if (this.state.projectType === 2){
            this.setState({projectType: 'philanthropy'})
        } else if (this.state.projectType === 3){
            this.setState({projectType: 'angel'})
        } else if (this.state.projectType === 4){
            this.setState({projectType: 'banker'})
        }
    }

    async nextStep() {
        await this.projectType()
        ManageServicesService.postService({
            money_to_raise: this.state.money,
            time_hrs: parseInt(this.state.time),
            description: this.state.experience
        }).then(
            response => {
                this.setState({ serviceId: response });
                console.log(this.state.serviceId)
                console.log(typeof(this.state.serviceId))
                console.log(this.state.serviceId.toString())
                this.props.history.push(`/create/five`, {
                    state:
                        this.state = {
                            projectName: this.state.projectName,
                            projectType: this.state.projectType,
                            description: this.state.description,
                            exepctedStartDate: this.state.exepctedStartDate,
                            exepctedEndDate: this.state.exepctedEndDate,
                            city: this.state.city,
                            country: this.state.country,
                            categoryId: this.state.categoryId,
                            imageData: this.state.imageData,
                            collaboratorsId: this.state.collaboratorsId,
                            phases: this.state.phases,
                            serviceId: this.state.serviceId
                        }
                })
            }
        )
    }

    handleCheckedMoney() {
        if (this.state.checkedMoney === true) {
            this.setState(prevState => ({
                checkedMoney: false
            }))
        } else if (this.state.checkedMoney === false) {
            this.setState(prevState => ({
                checkedMoney: true
            }))
        }
    }

    handleCheckedTime() {
        if (this.state.checkedTime === true) {
            this.setState(prevState => ({
                checkedTime: false
            }))
        } else if (this.state.checkedTime === false) {
            this.setState(prevState => ({
                checkedTime: true
            }))
        }
    }

    handleCheckedExperience() {
        if (this.state.checkedExperience === true) {
            this.setState(prevState => ({
                checkedExperience: false
            }))
        } else if (this.state.checkedExperience === false) {
            this.setState(prevState => ({
                checkedExperience: true
            }))
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handlePhilanthropy() {
        if (this.state.projectType === 1) {
            this.setState(prevState => ({
                projectType: 2
            }))
        } else if (this.state.projectType === 3) {
            this.setState(prevState => ({
                projectType: 2
            }))
        }
        else if (this.state.projectType === 4) {
            this.setState(prevState => ({
                projectType: 2
            }))
        }
    }

    handleAngel() {
        if (this.state.projectType === 1) {
            this.setState(prevState => ({
                projectType: 3
            }))
        } else if (this.state.projectType === 2) {
            this.setState(prevState => ({
                projectType: 3
            }))
        }
        else if (this.state.projectType === 4) {
            this.setState(prevState => ({
                projectType: 3
            }))
        }
    }

    handleBanker() {
        if (this.state.projectType === 1) {
            this.setState(prevState => ({
                projectType: 4
            }))
        } else if (this.state.projectType === 2) {
            this.setState(prevState => ({
                projectType: 4
            }))
        }
        else if (this.state.projectType === 3) {
            this.setState(prevState => ({
                projectType: 4
            }))
        }
    }

    render() {
        return (
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
                    <Typography variant="h4" style={{ marginTop: 10, textAlign: "center" }}> START YOUR PROJECT </Typography>


                    {this.state.activeStep === this.state.steps.length ? (
                        <div>
                            <Typography class='instructions'>All steps completed</Typography>
                        </div>

                    ) : (

                        <div>
                            <div class='step'>
                                <Grid container spacing={3}>
                                    <Grid item xs={1} class='grid-right'>
                                        <Avatar style={{ backgroundColor: "#3f51b5" }}>{this.state.activeStep + 1}</Avatar>
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
                                            <Grid item xs={4}>
                                                <Button fullWidth
                                                    // variant={(this.state.projectType === 1 || this.state.projectType === 2) ? "outlined" : "outlined"} 
                                                    variant={"outlined"}
                                                    style={(this.state.projectType === 1 || this.state.projectType === 2) ? { opacity: "1" } : { opacity: "0.5" }}
                                                    color={(this.state.projectType === 1 || this.state.projectType === 2) ? "primary" : "default"}
                                                    onClick={this.handlePhilanthropy}
                                                >Philanthropy</Button>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button fullWidth
                                                    // variant={(this.state.projectType === 1 || this.state.projectType === 3) ? "contained" : "outlined"} 
                                                    variant={"outlined"}
                                                    style={(this.state.projectType === 1 || this.state.projectType === 3) ? { opacity: "1" } : { opacity: "0.5" }}
                                                    color={(this.state.projectType === 1 || this.state.projectType === 3) ? "primary" : "default"}
                                                    onClick={this.handleAngel}
                                                >Angel</Button>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button fullWidth
                                                    // variant={(this.state.projectType === 1 || this.state.projectType === 3) ? "contained" : "outlined"} 
                                                    variant={"outlined"}
                                                    style={(this.state.projectType === 1 || this.state.projectType === 4) ? { opacity: "1" } : { opacity: "0.5" }}
                                                    color={(this.state.projectType === 1 || this.state.projectType === 4) ? "primary" : "default"}
                                                    onClick={this.handleBanker}
                                                >Banker</Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    {
                                        (this.state.projectType === 2 || this.state.projectType === 3 || this.state.projectType === 4) ?

                                            <div class='stepOne'>
                                                <Grid container spacing={12} style={{ marginBottom: "20px" }}>
                                                    <Grid item xs={12} style={{ marginBottom: "7px" }}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    color="primary"
                                                                    checked={this.state.checkedMoney}
                                                                    onChange={this.handleCheckedMoney}
                                                                />
                                                            }
                                                            label="Raise Money"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            fullWidth
                                                            variant={"outlined"}
                                                            required={this.state.checkedMoney}
                                                            disabled={!this.state.checkedMoney}
                                                            id="moneyToRaise"
                                                            name="money"
                                                            value={this.money}
                                                            // error={this.state.errorPhone}
                                                            onChange={this.handleChange}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                                            }}
                                                            label="Money To Raise" />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={12} style={{ marginBottom: "20px" }}>
                                                    <Grid item xs={12} style={{ marginBottom: "7px" }}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    color="primary"
                                                                    checked={this.state.checkedTime}
                                                                    onChange={this.handleCheckedTime}
                                                                />
                                                            }
                                                            label="Time"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            fullWidth
                                                            variant={"outlined"}
                                                            required={this.state.checkedTime}
                                                            disabled={!this.state.checkedTime}
                                                            id="time"
                                                            name="time"
                                                            value={this.time}
                                                            // error={this.state.errorPhone}
                                                            onChange={this.handleChange}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start">Hrs</InputAdornment>
                                                            }}
                                                            label="Total Amount Of Hours" />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={12} style={{ marginBottom: "20px" }}>
                                                    <Grid item xs={12} style={{ marginBottom: "7px" }}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    color="primary"
                                                                    checked={this.state.checkedExperience}
                                                                    onChange={this.handleCheckedExperience}
                                                                />
                                                            }
                                                            label="Special Skills"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            fullWidth
                                                            required={this.state.checkedExperience}
                                                            disabled={!this.state.checkedExperience}
                                                            id="experience"
                                                            variant={"outlined"}
                                                            name="experience"
                                                            value={this.experience}
                                                            // error={this.state.errorPhone}
                                                            onChange={this.handleChange}
                                                            label="Description" />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            : null
                                    }
                                </>



                            }
                            <div class='steps-buttom'>
                                <Button
                                    disabled={this.state.activeStep === 0}
                                    onClick={
                                        () => { this.props.history.goBack() }
                                        // () => this.setState({ activeStep: this.state.activeStep - 1 })
                                    }
                                    style={{ marginRight: 10 }}
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
        )
    }
}

export default withRouter(newProjectStepFour)
