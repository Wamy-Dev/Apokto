import React from 'react';
import FadeIn from 'react-fade-in'
import { Link } from 'react-router-dom'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import FirstWave from '../assets/FirstWave.svg'
import SecondWave from '../assets/SecondWave.svg'
import ThirdWave from '../assets/ThirdWave.svg'
import Logo from '../assets/lightlogoapokto.svg';
export default function AboutPage () {
    return(
    <div>
        <Parallax pages={3} style={{top: '0', left: '0'}}>
            <ParallaxLayer speed={0.5} factor={1.67} style={{backgroundImage: `url(${FirstWave})`, backgroundSize: "cover", paddingLeft: "30px"}}>
                <FadeIn delay="400" transitionDuration="800">
                    <div >
                        <Link to="/">
                            <img src={Logo} alt="logo" style={{width: "150px", paddingTop: "15px"}}/>
                        </Link>
                    </div>
                    <div style={{inlineSize: "96%"}}>
                        <h1 style={{ fontSize: "50px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                            Why use Apokto? Because it's the easiest way to get the repos you want.
                        </h1>
                    </div>
                </FadeIn>
            </ParallaxLayer>
            <ParallaxLayer offset={1} speed={0.65} factor={2} style={{backgroundImage: `url(${SecondWave})`, backgroundSize: "cover", paddingLeft: "30px"}}>
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
            </ParallaxLayer>
            <ParallaxLayer offset={2} speed={1} style={{backgroundImage: `url(${ThirdWave})`, backgroundSize: "cover"}}>
                <div style={{inlineSize: "96%", paddingLeft: "30px"}}>
                    <h1 style={{ fontSize: "30px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                        Why does this exist?
                    </h1>
                    <p style={{ fontSize: "25px", fontFamily: 'Cabin, sans-serif', color:"white"}}>
                        Apokto exists because I have been a long time iOS jailbreak enthusiast (first iPhone ever jailbroken was the iPhone 4S) and finding and adding repos to get the tweaks I have been wanting has been hard.
                        Whether trying to find a small theme that I saw on Reddit, or discovering new tweaks to enhance my device any way, finding the right repo is hard. Throughout the years, there have been tweaks like Flame, or even Cydown
                        that has made it easier to add a lot of repositories at once, but they still had major flaws. Now that I have experience in coding and am finally fed up with the status of repositories, I have made Apokto, the easiest way to
                        pick and choose your repos as quickly as possible. I hope that this will be useful to even a small group of people.
                    </p>
                </div>
                <center>
                <div style={{position: "absolute", bottom: "10%", right: "50%"}}>
                        <p style={{ fontSize: "25px", fontFamily: 'Cabin, sans-serif', color:"white"}}>
                            Thank you for using Apokto.
                        </p>
                </div>
                </center>
            </ParallaxLayer>
        </Parallax>
    </div>
    )
}


