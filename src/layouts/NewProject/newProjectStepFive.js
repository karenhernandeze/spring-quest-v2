import { Typography } from '@material-ui/core';
import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import './newProject.css'
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Avatar } from '@material-ui/core';
import ManageProjectsService from '../../service/ManageProjectsService/manageProjectsService';

class newProjectStepFive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 4,
            steps: [],
            description_steps: [],


            projectName: this.props.history.location.state.state.projectName,
            projectType: this.props.history.location.state.state.projectType,
            description: this.props.history.location.state.state.description,
            exepctedStartDate: this.props.history.location.state.state.exepctedStartDate,
            exepctedEndDate: this.props.history.location.state.state.exepctedEndDate,
            city: this.props.history.location.state.state.city,
            country: this.props.history.location.state.state.country,
            categoryId: this.props.history.location.state.state.categoryId,
            imageData: this.props.history.location.state.state.imageData,
            collaboratorsId: this.props.history.location.state.state.collaboratorsId,
            phases: this.props.history.location.state.state.phases,
            serviceId: this.props.history.location.state.state.serviceId
        }
        this.nextStep = this.nextStep.bind(this)
    }

    componentDidMount() {
        console.log(this.state)
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
    }

    // postProject(){
    //     ManageProjectsService.postNewProject({
    //         "userId": "2615283",
    //         "projectName": this.state.projectName,
    //         "projectType": this.state.projectType,
    //         "description": this.state.description,
    //         "exepctedStartDate": this.state.exepctedStartDate,
    //         "exepctedEndDate": this.state.exepctedEndDate,
    //         "country": this.state.country,
    //         "city": this.state.city,
    //         "categoryId": this.state.categoryId,
    //         "collaboratorsId": this.state.collaboratorsId,
    //         "photosId": this.state.imageData,
    //         "phases": parseInt(this.state.phases),
    //         "serviceId": this.state.serviceId.toString()
    //     }).then(
    //         response => {
    //             console.log(response)
    //         }
    //     )
    // }
    nextStep() {
        ManageProjectsService.postNewProject({
            userId: "2615283",
            projectName: this.state.projectName,
            projectType: this.state.projectType,
            description: this.state.description,
            exepctedStartDate: this.state.exepctedStartDate,
            exepctedEndDate: this.state.exepctedEndDate,
            country: this.state.country,
            city: this.state.city,
            categoryId: this.state.categoryId,
            collaboratorsId: this.state.collaboratorsId,
            photosId: this.state.imageData,
            phases: parseInt(this.state.phases),
            serviceId: (this.state.serviceId).toString()
        }).then(
            response => {
                console.log(response)
            }
        )
        this.setState({ activeStep: this.state.activeStep + 1 })
        // this.props.history.push(`/create/four`)

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
                        <>
                            <div class={'stepThree'}>
                                <div class='stepOne'>
                                    <Typography> All steps completed </Typography>
                                </div>
                            </div>
                        </>

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
                                    <div class={'stepThree'}>
                                        <div class='stepOne'>
                                            <Typography> STEP UP PAYMENT GATEWAY</Typography>
                                        </div>
                                    </div>
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

export default withRouter(newProjectStepFive)
