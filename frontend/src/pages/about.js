import React from 'react';
import FadeIn from 'react-fade-in'
import { Link } from 'react-router-dom'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { Center } from '@mantine/core';
import FirstWave from '../assets/FirstWave.svg'
import SecondWave from '../assets/SecondWave.svg'
import ThirdWave from '../assets/ThirdWave.svg'
import Logo from '../assets/lightlogoapokto.svg';
import { BrowserView, MobileView } from 'react-device-detect';
export default function AboutPage () {
    return(
    <div>
        <BrowserView>
        <Parallax pages={2.5} style={{top: '0', left: '0'}}>
            <ParallaxLayer style={{backgroundImage: `url(${FirstWave})`, backgroundSize: "cover", paddingLeft: "30px", paddingRight: "30px"}}>
                <FadeIn delay="400" transitionDuration="800">
                    <div>
                        <Link to="/">
                            <img src={Logo} alt="logo" style={{width: "150px", paddingTop: "15px"}}/>
                        </Link>
                    </div>
                    <div>
                        <h1 style={{ fontSize: "50px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                            Why use Apokto? Because it's the easiest way to get the repos you want.
                        </h1>
                    </div>
                    <div>
                        <h3 style={{ fontSize: "35px", fontFamily: 'Mukta, sans-serif', color:"white", paddingTop: "20vh"}}>
                            Apokto is used by hundreds to create their perfect repo list for their iOS jailbroken device.
                        </h3>
                        <h3 style={{ fontSize: "35px", fontFamily: 'Mukta, sans-serif', color:"white", paddingTop: "10vh"}}>
                            Like a horse, Apokto is fast, and intelligent, making your repo lists available basically instantly. 
                        </h3>
                    </div>
                    </FadeIn>
                    
            </ParallaxLayer>
            <ParallaxLayer offset={1} style={{backgroundImage: `url(${SecondWave})`, backgroundSize: "cover", paddingLeft: "30px", paddingRight: "30px", zIndex: "-1"}}>
            <div style={{paddingTop: "200px"}}>
                    <h1 style={{ fontSize: "30px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                        Why should I use Apokto?
                    </h1>
                    <p style={{ fontSize: "20px", fontFamily: 'Cabin, sans-serif', color:"white", paddingLeft: "30px", paddingRight: "30px"}}>
                        There is no real reason to use Apokto, unless you like copying and pasting all of your favorite repos in your package manager, repetitvely and slowly.
                        <br/>
                        With Apokto, everyone wins. You get a nice long list of quality repos, and more jailbreak developers have the opportunity to show of their work with the increased exposure of their repository.
                    </p>
                    </div>
                    <div style={{inlineSize: "95%"}}>
                    <h1 style={{ fontSize: "30px", fontFamily: 'Mukta, sans-serif', color:"white", paddingRight: "30px"}}>
                        Why does this exist?
                    </h1>
                    <p style={{ fontSize: "20px", fontFamily: 'Cabin, sans-serif', color:"white", paddingLeft: "30px", paddingRight: "30px"}}>
                        Apokto exists because I have been a long time iOS jailbreak enthusiast (first iPhone ever jailbroken was the iPhone 4S) and finding and adding repos to get the tweaks I have been wanting has been hard.
                        Whether trying to find a small theme that I saw on Reddit, or discovering new tweaks to enhance my device any way, finding the right repo is hard. Throughout the years, there have been tweaks like Flame, or even Cydown
                        that has made it easier to add a lot of repositories at once, but they still had major flaws. Now that I have experience in coding and am finally fed up with the status of repositories, I have made Apokto, the easiest way to
                        pick and choose your repos as quickly as possible. I hope that this will be useful to even a small group of people.
                    </p>
                </div>
            </ParallaxLayer>
            <ParallaxLayer offset={1.75} style={{backgroundImage: `url(${ThirdWave})`, backgroundSize: "cover", paddingLeft: "30px", paddingRight: "30px"}}>
            <div>
                <h1 style={{ fontSize: "30px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                    Built on:
                </h1>
                <ul style={{ fontSize: "25px", fontFamily: 'Cabin, sans-serif', color:"white"}}>
                    <li>
                            Python
                        </li>
                        <li>
                            Javascript
                        </li>
                        <li>
                            React
                        </li>
                        <li>
                            MantineUI
                        </li>
                        <li>
                            Smaller sources listed <a href="https://github.com/Wamy-Dev/Apokto/wiki">here</a>.
                        </li>
                    </ul>
                </div>
                
            <div style={{inlineSize: "95%"}}>
                    <h1 style={{ fontSize: "30px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                        Links: 
                    </h1>
                    <p style={{ fontSize: "25px", fontFamily: 'Cabin, sans-serif', color:"white", paddingLeft: "30px", paddingRight: "30px"}}>
                        <a href="https://github.com/Wamy-Dev/Apokto" target="_blank" rel="noreferrer" style={{color: "white"}}>View the Github Repo</a>. Here you can report bugs, give feedback, and contribute to the code.
                    </p>
                    <p style={{ fontSize: "25px", fontFamily: 'Cabin, sans-serif', color:"white", paddingLeft: "30px", paddingRight: "30px"}}>
                    <a href="https://homeonacloud.com/donate" target="_blank" rel="noreferrer" style={{color: "white"}}>Donate to the project</a>. Here you can donate to the project to help pay for the servers that run Apokto.
                    </p>
                    <p style={{ fontSize: "25px", fontFamily: 'Cabin, sans-serif', color:"white", paddingLeft: "30px", paddingRight: "30px"}}>
                    <a href="https://homeonacloud.com/donate" target="_blank" rel="noreferrer" style={{color: "white"}}>Join the Discord</a>. Here you can join the Discord server where you can get help, view my other projects and chat with others.
                    </p>
                </div>
                <Center style={{paddingTop: "100px"}}>
                    <p style={{ fontSize: "25px", fontFamily: 'Cabin, sans-serif', color:"white"}}>
                        Thank you for using Apokto.
                    </p>
                </Center>
        </ParallaxLayer>
        </Parallax>
        </BrowserView>
        <MobileView>
        <Parallax pages={3} style={{top: '0', left: '0'}}>
            <ParallaxLayer style={{backgroundImage: `url(${FirstWave})`, backgroundSize: "cover", paddingLeft: "10px"}}>
                <FadeIn delay="400" transitionDuration="800">
                    <div>
                        <Link to="/">
                            <img src={Logo} alt="logo" style={{width: "100px", paddingTop: "10px"}}/>
                        </Link>
                    </div>
                    <div>
                        <h1 style={{ fontSize: "25px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                            Why use Apokto? Because it's the easiest way to get the repos you want.
                        </h1>
                    </div>
                    <div>
                        <h3 style={{ fontSize: "25px", fontFamily: 'Mukta, sans-serif', color:"white", paddingTop: "50px", paddingRight: "10px"}}>
                            Apokto is used by hundreds to create their perfect repo list for their iOS jailbroken device.
                        </h3>
                        <h3 style={{ fontSize: "25px", fontFamily: 'Mukta, sans-serif', color:"white", paddingTop: "30px", paddingRight: "10px"}}>
                            Like a horse, Apokto is fast, and intelligent, making your repo lists available basically instantly. 
                        </h3>
                    </div>
                    </FadeIn>
            </ParallaxLayer>
            <ParallaxLayer offset={1} style={{backgroundImage: `url(${SecondWave})`, backgroundSize: "cover", paddingLeft: "10px"}}>
                    <h1 style={{ fontSize: "20px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                        Why should I use Apokto?
                    </h1>
                    <p style={{ fontSize: "15px", fontFamily: 'Cabin, sans-serif', color:"white", paddingLeft: "10px", paddingRight: "10px"}}>
                        There is no real reason to use Apokto, unless you like copying and pasting all of your favorite repos in your package manager, repetitvely and slowly.
                        <br/>
                        With Apokto, everyone wins. You get a nice long list of quality repos, and more jailbreak developers have the opportunity to show of their work with the increased exposure of their repository.
                    </p>
                    <h1 style={{ fontSize: "20px", fontFamily: 'Mukta, sans-serif', color:"white", paddingRight: "10px"}}>
                        Why does this exist?
                    </h1>
                    <p style={{ fontSize: "15px", fontFamily: 'Cabin, sans-serif', color:"white", paddingLeft: "10px", marginRight: "10px"}}>
                        Apokto exists because I have been a long time iOS jailbreak enthusiast (first iPhone ever jailbroken was the iPhone 4S) and finding and adding repos to get the tweaks I have been wanting has been hard.
                        Whether trying to find a small theme that I saw on Reddit, or discovering new tweaks to enhance my device any way, finding the right repo is hard. Throughout the years, there have been tweaks like Flame, or even Cydown
                        that has made it easier to add a lot of repositories at once, but they still had major flaws. Now that I have experience in coding and am finally fed up with the status of repositories, I have made Apokto, the easiest way to
                        pick and choose your repos as quickly as possible. I hope that this will be useful to even a small group of people.
                    </p>
            </ParallaxLayer>
            <ParallaxLayer offset={2} style={{backgroundImage: `url(${ThirdWave})`, backgroundSize: "cover", paddingLeft: "10px"}}>
            <h1 style={{ fontSize: "20px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                        Links: 
                    </h1>
                    <p style={{ fontSize: "15px", fontFamily: 'Cabin, sans-serif', color:"white", paddingLeft: "10px", paddingRight: "10px"}}>
                        <a href="https://github.com/Wamy-Dev/Apokto" target="_blank" rel="noreferrer" style={{color: "white"}}>View the Github Repo</a>. Here you can report bugs, give feedback, and contribute to the code.
                    </p>
                    <p style={{ fontSize: "15px", fontFamily: 'Cabin, sans-serif', color:"white", paddingLeft: "10px", paddingRight: "10px"}}>
                    <a href="https://homeonacloud.com/donate" target="_blank" rel="noreferrer" style={{color: "white"}}>Donate to the project</a>. Here you can donate to the project to help pay for the servers that run Apokto.
                    </p>
                    <p style={{ fontSize: "15px", fontFamily: 'Cabin, sans-serif', color:"white", paddingLeft: "10px", paddingRight: "10px"}}>
                    <a href="https://homeonacloud.com/donate" target="_blank" rel="noreferrer" style={{color: "white"}}>Join the Discord</a>. Here you can join the Discord server where you can get help, view my other projects and chat with others.
                    </p>
                <Center style={{paddingTop: "200px"}}>
                    <p style={{ fontSize: "20px", fontFamily: 'Cabin, sans-serif', color:"white"}}>
                        Thank you for using Apokto.
                    </p>
                </Center>
            </ParallaxLayer>
        </Parallax>
        </MobileView>
    </div>
    )
}


