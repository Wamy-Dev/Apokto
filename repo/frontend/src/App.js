import React from 'react';
import { Button, Center } from '@mantine/core';
import FadeIn from 'react-fade-in';
import { BrowserView, MobileView } from 'react-device-detect';
import './index';

export default function Repo () {
    return (
        <div>
            <BrowserView>
            <Center style={{paddingTop: "100px"}}>
                <FadeIn delay="600" transitionDuration="800">
                    <a href="https://apokto.one">
                        <img src={require("./lightlogowtextapokto.png")} alt="logo"/>
                    </a>
                <Center>
                    <div style={{position: "relative", top: "100px"}}>
                      <h2 style={{ fontFamily: 'Mukta, sans-serif', color:"white"}}>Please use your jailbroken iOS device to access this page. Thanks!</h2>
                    </div>
                </Center>
                </FadeIn>
                </Center>
            </BrowserView>
            <MobileView>
            <FadeIn delay="600" transitionDuration="800">
                <Center style={{paddingTop: "100px"}}>
                    <a href="https://apokto.one">
                        <img src={require("./lightlogowtextapokto.png")} alt="logo" style={{width: "70vw"}}/>
                    </a>
                </Center>
                <Center style={{paddingTop: "100px"}}>
                    <table style={{tableLayout: "fixed"}}>
                    <tr><Button style={{backgroundColor: "#C1272D", width: "150px", marginBottom: "10px"}}>
                    <a href="cydia://url/https://cydia.saurik.com/api/share#?source=https://repo.apokto.one/" style={{ textDecoration: 'none', color: "white"}}>Add to Cydia</a>
                    </Button></tr>
                    <tr><Button style={{backgroundColor: "#C1272D", width: "150px", marginBottom: "10px"}}>
                    <a href="sileo://source/https://repo.apokto.one/" style={{ textDecoration: 'none', color: "white"}}>Add to Sileo</a>
                    </Button></tr>
                    <tr><Button style={{backgroundColor: "#C1272D", width: "150px", marginBottom: "10px"}}>
                    <a href="zbra://sources/add/https://repo.apokto.one/" style={{ textDecoration: 'none', color: "white"}}>Add to Zebra</a>
                    </Button></tr>
                    </table>  
                </Center>
                </FadeIn>
            </MobileView>
        </div>
    )
}
