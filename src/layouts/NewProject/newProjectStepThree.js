import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import './newProject.css'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Typography } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Avatar } from '@material-ui/core';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

class newProjectStepThree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 2,
      steps: [],
      description_steps: [],
      file: [],
      fileUrl: [],
      projectName: this.props.history.location.state.state.projectName,
      description: this.props.history.location.state.state.description,
      exepctedStartDate: this.props.history.location.state.state.exepctedStartDate,
      exepctedEndDate: this.props.history.location.state.state.exepctedEndDate,
      city: this.props.history.location.state.state.city,
      country: this.props.history.location.state.state.country,
      categoryId: this.props.history.location.state.state.categoryId,
      collaboratorsId: this.props.history.location.state.state.collaboratorsId,
      phases: this.props.history.location.state.state.phases,
      upload: 1
    }
    this.handleChange = this.handleChange.bind(this)
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

  deletePhoto = (id) => {
    this.state.file.splice(this.state.file.indexOf(id), 1)
    this.state.fileUrl.splice(this.state.fileUrl.indexOf(id), 1)
    this.setState(this.state)
  }

  handleChange(event) {
    if (this.state.upload === 1) {
      this.setState({
        upload: 2
      })
    }
    this.setState(prevState => ({
      file: [...prevState.file, URL.createObjectURL(event.target.files[0])],
      fileUrl: [...prevState.fileUrl, event.target.files[0]]
    }))
  }

  async nextStep() {
    this.props.history.push(`/create/four`, {
      state:
        this.state = {
          fileUrl: this.state.fileUrl,
          projectName: this.state.projectName,
          description: this.state.description,
          exepctedStartDate: this.state.exepctedStartDate,
          exepctedEndDate: this.state.exepctedEndDate,
          city: this.state.city,
          country: this.state.country,
          categoryId: this.state.categoryId,
          collaboratorsId: this.state.collaboratorsId,
          phases: this.state.phases,
        }
    })
  }

  render() {
    return (
      <div class='root-center' >
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

                this.state.upload === 1 ?

                  <>
                    <div class={'stepThree'}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}
                          style={{
                            borderRadius: '20px',
                            border: "2px solid #e8e6e6",
                            height: "250px", background: '#f5f5f5',
                            marginBottom: "10px"
                          }}>

                          <div style={{ margin: '0 auto', width: '10%', left: '50%', paddingTop: '85px' }}>
                            <input style={{ display: 'none' }} onChange={this.handleChange} accept="image/*" id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                              <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                              </IconButton>
                            </label>
                          </div>

                        </Grid>

                        <Grid>
                          <Typography>
                            <b>
                              Remember
                          </b>
                                : Adding photos and videos increases your reach to users.
                                </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </>
                  :
                  <>

                    <div style={{ margin: '15px' }}>
                      <Grid container spacing={1} style={{ marginLeft: '10px' }}>
                        {this.state.file.map((image) =>
                        (
                          <Grid item xs={1} style={{ margin: '5px', minWidth: '100px', height: '150px' }}>
                            <img style={{ position: 'absolute', height: '135px', width: '100px', borderRadius: '5px', objectFit: 'cover' }} src={image} alt={"image"} />
                            <IconButton
                              onClick={() => { this.deletePhoto(image) }}
                              style={{ bottom: '6px', left: '60px', color: 'white' }}><CancelRoundedIcon /></IconButton>
                          </Grid>

                        ))}

                        <Grid item xs={2}
                          style={{
                            borderRadius: '10px',
                            border: "2px solid #e8e6e6",
                            height: '135px', background: '#f5f5f5',
                            margin: "10px", maxWidth: '100px', minWidth: '100px'
                          }}>

                          <div style={{ margin: '0 auto', width: '55%', paddingTop: '35px' }}>
                            <input style={{ display: 'none' }} onChange={this.handleChange} accept="image/*" id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                              <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                              </IconButton>
                            </label>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </>
              }

              <div class='steps-buttom'>
                <Button
                  disabled={this.state.activeStep === 0}
                  onClick={
                    () => { this.props.history.goBack() }
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

export default withRouter(newProjectStepThree)