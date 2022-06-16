import React from 'react';
import FadeIn from 'react-fade-in'
import { Link } from 'react-router-dom'
import Logo from '../assets/lightlogoapokto.svg';
export default function Error () {
    return(
        <div>
            <FadeIn delay="400" transitionDuration="800">
                <center>
                    <div>
                        <Link to="/">
                            <img src={Logo} alt="logo" style={{width: "150px", paddingTop: "15px"}}/>
                        </Link>
                    </div>
                    <div style={{inlineSize: "96%"}}>
                        <h1 style={{ fontSize: "50px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                            404 Error
                        </h1>
                        <h3 style={{ fontSize: "30px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                            You are somewhere you aren't supposed to be at.
                        </h3>
                        <h3>
                        <Link to="/" style={{ fontSize: "30px", fontFamily: 'Mukta, sans-serif', color:"#F15A24"}}>Go back to main page</Link>
                        </h3>
                        <h3>
                        <Link to="/build" style={{ fontSize: "30px", fontFamily: 'Mukta, sans-serif', color:"#F15A24"}}>Go build a repo</Link>
                        </h3>
                        <h3>
                        <Link to="/repo" style={{ fontSize: "30px", fontFamily: 'Mukta, sans-serif', color:"#F15A24"}}>Go use your repo</Link>
                        </h3>
                    </div>
                    </center>
                </FadeIn>
        </div>
    )
}