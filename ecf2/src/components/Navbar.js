// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Import your CSS for styling

function Navbar() {
	const [isNavbarOpen, setIsNavbarOpen] = useState(false);

	const toggleNavbar = () => {
		setIsNavbarOpen(!isNavbarOpen);
		// Force body to stop scrolling when menu is open on mobile
		document.body.style.overflow = !isNavbarOpen ? 'hidden' : '';
	};

	// Close navbar when clicking outside on mobile
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (isNavbarOpen && !event.target.closest('.navbar-nav') && !event.target.closest('.toggle-button-nav')) {
				setIsNavbarOpen(false);
				document.body.style.overflow = '';
			}
		};

		// Close navbar when scrolling on mobile
		const handleScroll = () => {
			if (isNavbarOpen && window.innerWidth <= 768) {
				setIsNavbarOpen(false);
				document.body.style.overflow = '';
			}
		};

		// Close navbar when ESC key is pressed
		const handleEscKey = (event) => {
			if (event.key === 'Escape' && isNavbarOpen) {
				setIsNavbarOpen(false);
				document.body.style.overflow = '';
			}
		};

		document.addEventListener('click', handleClickOutside);
		window.addEventListener('scroll', handleScroll);
		document.addEventListener('keydown', handleEscKey);

		// Make sure to clean up event listeners
		return () => {
			document.removeEventListener('click', handleClickOutside);
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('keydown', handleEscKey);
			document.body.style.overflow = ''; // Reset overflow when component unmounts
		};
	}, [isNavbarOpen]);

	// Handle clicking on nav links to close menu on mobile
	const handleNavLinkClick = () => {
		setIsNavbarOpen(false);
		document.body.style.overflow = '';
	};

	return (
		<>
			<button className="toggle-button-nav" onClick={toggleNavbar} aria-label="Toggle navigation menu">
				☰
			</button>
			<nav className={`navbar-nav ${isNavbarOpen ? 'open-nav' : ''}`} aria-expanded={isNavbarOpen}>
				<button className="close-button-nav" onClick={toggleNavbar} aria-label="Close navigation menu">
					✕
				</button>
				<ul className='apple'>
					<li><a href="#scrolltop" onClick={handleNavLinkClick}>HOME</a></li>
					<li><a href="#scroll1" onClick={handleNavLinkClick}>JOIN #TEAMTREES</a></li>
					<li><a href="#scroll2" onClick={handleNavLinkClick}>LEADERBOARD</a></li>
					<li><a href="#scroll3" onClick={handleNavLinkClick}>ARTICLES</a></li>	
					<li><a href="#scroll4" onClick={handleNavLinkClick}>SOCIALS</a></li>
					{/* Add more menu items as needed */}
				</ul>
			</nav>
		</>
	);
}

export default Navbar;
