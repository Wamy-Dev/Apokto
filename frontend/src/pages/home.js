import React from 'react';
import { Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom'
import FadeIn from 'react-fade-in'
import Background from '../assets/homewave.svg';

export default function Repo () {
    return (
        <div>
            <div style={{position: "absolute", left: "50%", top: "30%", transform: "translate(-50%, -50%)"}}>
                <FadeIn delay="400" transitionDuration="800">
                <Link to="/">
                <img src={require("../assets/lightlogowtextapokto.png")} alt="logo"/>
                </Link>
                <center>
                <div style={{position: "relative", top: "100px"}}>
                <Group position="center" spacing="m">
                <Button style={{backgroundColor: "#C1272D", right: "30px"}}>
                    <Link to="/build" style={{ textDecoration: 'none', color: "white"}}>Build your repo</Link>
                </Button>
                <Button style={{backgroundColor: "#C1272D", right: "0px"}}>
                    <Link to="/repo" style={{ textDecoration: 'none', color: "white"}}>Add your repo</Link>
                </Button>
                <Button style={{backgroundColor: "#F15A24", right: "-30px"}}>
                    <Link to="/about" style={{ textDecoration: 'none', color: "white"}}>About Apokto</Link>
                </Button>
                </Group>
                </div>
                </center>
                </FadeIn>
            </div>
        </div>
    )
}