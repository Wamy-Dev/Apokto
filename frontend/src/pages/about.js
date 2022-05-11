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
                        <h1 style={{ fontSize: "40px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                            Why use Apokto? Because it's the easiest way to get the repos you want.
                        </h1>
                    </div>
                </FadeIn>
            </ParallaxLayer>
            <ParallaxLayer offset={1} speed={0.65} factor={2} style={{backgroundImage: `url(${SecondWave})`, backgroundSize: "cover", paddingLeft: "30px"}}>
                <div>
                    <h1 style={{ fontSize: "25px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                        Stack Used:
                    </h1>
                    <li>
                        Python
                    </li>
                    <li>
                        Javascript
                    </li>
                    <li>
                        React
                    </li>
                </div>
            </ParallaxLayer>
            <ParallaxLayer offset={2} speed={1} style={{backgroundImage: `url(${ThirdWave})`, backgroundSize: "cover", paddingLeft: "30px"}}>
                <div style={{inlineSize: "96%"}}>
                <h1 style={{ fontSize: "25px", fontFamily: 'Mukta, sans-serif', color:"white"}}>
                    Here is another header for another section.
                </h1>
                <p style={{ fontSize: "20px", fontFamily: 'Cabin, sans-serif', color:"white"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie aliquam pretium. Vestibulum eget turpis eu arcu volutpat consectetur sed sed elit. Donec nulla leo, hendrerit a faucibus et, iaculis in lectus. Vestibulum ac mollis ante. Fusce sit amet tempor odio. Duis sit amet molestie nibh, sed blandit massa. In suscipit a sem sit amet scelerisque. Pellentesque volutpat nec lacus id scelerisque. Nullam cursus malesuada leo lacinia molestie. Etiam vel risus quam. Donec pretium turpis elementum efficitur elementum. Mauris pulvinar, dolor nec ultricies maximus, lorem diam interdum lorem, vitae vestibulum purus lorem vel dolor. Praesent eu pulvinar turpis, at eleifend sapien. Suspendisse euismod egestas odio sit amet suscipit. Donec eu sodales mauris, a sagittis nisl. Quisque faucibus velit vel ultricies rutrum. Vivamus finibus et tellus at pretium. Donec placerat euismod convallis. Pellentesque commodo ante et felis imperdiet, quis fringilla risus fermentum. Phasellus eget porttitor nisi. Donec venenatis rutrum nunc tempor molestie. Suspendisse potenti. Curabitur dapibus, ipsum eu semper consequat, purus augue iaculis ante, ut egestas neque arcu eu massa. Vivamus augue lorem, pulvinar sit amet risus at, luctus tristique ex. Curabitur eu cursus dui. Phasellus viverra, tellus eget molestie efficitur, mi magna semper urna, in euismod mi mi in felis. Ut condimentum ante sed arcu commodo, et tristique risus efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pellentesque aliquet tortor vitae malesuada. Pellentesque id ante pulvinar, ultricies erat in, fringilla risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras posuere a libero eu malesuada. Phasellus tellus dui, hendrerit ut felis euismod, hendrerit lacinia metus. Proin volutpat felis non risus consequat sollicitudin. Fusce nec eleifend diam. In elementum luctus diam, ultrices varius neque mattis vel. Proin sed felis dapibus neque dignissim hendrerit id non massa. Nunc quis vehicula orci, in consequat erat.
                </p>
                </div>
            </ParallaxLayer>
        </Parallax>
    </div>
    )
}


