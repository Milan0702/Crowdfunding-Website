import React from 'react';
import './Header.css';
import model3d from '../assets/final_island_2.glb'
import skyback from '../assets/sky1.jpg'
import logo from '../assets/logo.png'

function Header() {
	return (
		<header> 
			<div className='modelclass' id='scrolltop'>
				<div className='modelhead'>
					<img style={{marginTop: '30px', marginBottom:'30px'}} src={logo}/>
					<span style={{textAlign: 'center', fontSize: '80px', fontWeight: '900', color:'rgb(17, 50, 89)' }}>JOIN THE MOVEMENT</span>
					<p style={{textAlign: 'center', fontSize: '30px', fontWeight: '700', color:'rgb(17, 50, 89)' }}>The team is growing every day and scoring wins for the planet. Plant with us and track our progress!</p>
				</div>

				<div className='modelmodel'>
					<model-viewer alt="3d model" src={model3d} camera-controls disable-zoom disable-tap ></model-viewer>
				</div>
			</div>

		</header>
	);
}

export default Header;
