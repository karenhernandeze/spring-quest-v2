import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import './mainPage.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Carousel } from 'react-bootstrap';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if (reloadCount < 2) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }
    }

    render() {
        return (
            <div class='bg'>
                <div>
                    <p class={`h1 text`}> <em>successful stories</em></p>
                </div>
                <Carousel className="d-flex justify-content-end" style={{
                    width: "50%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    margin: "auto", top: "90px"
                }}>
                    <Carousel.Item >
                        <img
                            className="d-block w-100"
                            src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>


            </div>
        )
    }
}

export default withRouter(MainPage)

