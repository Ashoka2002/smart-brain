import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'

const Logo = () => {
    return (
        <div className='ma4 mt0' style={{width:"150px"}}>
            <Tilt className='br2 shadow-2 Tilt' glareEnable="true">
                <div>
                    <img src={brain} alt="Logo" />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;