import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import './newProject.css'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


class NewProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            steps: [],
            description: []
        }
        this.nextStep = this.nextStep.bind(this)
    }

    //Set the steps state to the following. In order to get the description
    componentDidMount() {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if(reloadCount < 2) {
          sessionStorage.setItem('reloadCount', String(reloadCount + 1));
          window.location.reload();
        } else {
          sessionStorage.removeItem('reloadCount');
        }
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
            description: [
                'Personal Information',
                'Project Basics',
                'Project Content',
                'Goals',
                'Set Up Payment Gateway'
            ]
        });
    }

    nextStep() {
        this.props.history.push(`/create/two`)
    }

    render() {
        return (
            <div class='root-center'>
                <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {
                        this.state.steps.map((label) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            )
                    })}
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
                                        <Typography variant="h5">{this.state.description[this.state.activeStep]}</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                            {
                                <>
                                    <div class='stepOne-out'>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Typography>Karen Alicia Hernandez</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography>karenaliciahernandez@hotmail.com</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography>6141044625</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography>Monte Galeras, Cumbres III #2618. Chihuaha, Mexico.</Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </>
                                //     this.state.activeStep === 0 ? <><StepOne/></>: this.state.activeStep === 1 ?
                                //    <> <StepTwo/></>: this.state.activeStep === 2 ? <StepThree/> : this.state.activeStep === 3 ?
                                //     <StepFour/> : <StepFive/>
                            }
                            <div class='steps-buttom'>
                                <Button
                                    disabled={this.state.activeStep === 0}
                                    onClick={() => this.setState({ activeStep: this.state.activeStep - 1 })}
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

export default withRouter(NewProject)