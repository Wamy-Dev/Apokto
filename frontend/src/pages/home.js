import React from 'react';
import { Button, Group, Center } from '@mantine/core';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import { BrowserView, MobileView } from 'react-device-detect';

export default function Home () {
    return (
        <div>
            <BrowserView>
            <Center style={{paddingTop: "100px"}}>
                <FadeIn delay="600" transitionDuration="800">
                    <Link to="/">
                        <img src={require("../assets/lightlogowtextapokto.png")} alt="logo"/>
                    </Link>
                <Center>
                    <div style={{position: "relative", top: "100px"}}>
                        <Group position="center" spacing="m">
                            <Button style={{backgroundColor: "#C1272D", right: "30px"}}>
                                <Link to="/build" style={{ textDecoration: 'none', color: "white"}}>Build your repo</Link>
                            </Button>
                            <Button style={{backgroundColor: "#C1272D", right: "0px"}}>
                                <a href="https://repo.apokto.one" style={{ textDecoration: 'none', color: "white"}}>Add Apokto repo</a>
                            </Button>
                            <Button style={{backgroundColor: "#F15A24", right: "-30px"}}>
                                <Link to="/about" style={{ textDecoration: 'none', color: "white"}}>About Apokto</Link>
                            </Button>
                        </Group>
                    </div>
                </Center>
                </FadeIn>
                </Center>
            </BrowserView>
            <MobileView>
            <FadeIn delay="600" transitionDuration="800">
                <Center style={{paddingTop: "100px"}}>
                    <Link to="/">
                        <img src={require("../assets/lightlogowtextapokto.png")} alt="logo" style={{width: "70vw"}}/>
                    </Link>
                </Center>
                <Center style={{paddingTop: "100px"}}>
                    <table style={{tableLayout: "fixed"}}>
                    <tr><Button style={{backgroundColor: "#C1272D", width: "150px", marginBottom: "10px"}}>
                        <Link to="/build" style={{ textDecoration: 'none', color: "white"}}>Build your repo</Link>
                    </Button></tr>
                    <tr><Button style={{backgroundColor: "#C1272D", width: "150px", marginBottom: "10px"}}>
                    <a href="https://repo.apokto.one" style={{ textDecoration: 'none', color: "white"}}>Add Apokto</a>
                    </Button></tr>
                    <tr><Button style={{backgroundColor: "#F15A24", width: "150px", marginBottom: "10px"}}>
                        <Link to="/about" style={{ textDecoration: 'none', color: "white"}}>About Apokto</Link>
                    </Button></tr>
                    </table>  
                </Center>
                </FadeIn>
            </MobileView>
        </div>
    )
}