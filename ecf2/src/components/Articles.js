import React from 'react';
import './Articles.css';
import india from '../assets/india.jpg'
import burundi from '../assets/burundi.png'
import oregon from '../assets/oregon.jpg'
import mississippi from '../assets/mississippi.png'

import { Link } from 'react-router-dom';
function Articles() {
	const articlesData = [
		{
			heading: 'Protecting Mississippi with Trees',
			location: 'Mississippi',
			treesPlanted: 1000000,
			imageSrc: mississippi,
			details: 'The Mississippi Delta was once a 24-million-acre forested wetland. Today only 4.4 million forested acres remain, mostly in small patches, leading to water quality and habitat issues. Tree planting efforts will improve critical habitat for threatened and endangered species and protect the water quality of the rivers and streams within the delta.',
		},
		{
			heading: 'Reviving Africa',
			location: 'Burundi',
			treesPlanted: 400000,
			imageSrc: burundi,
			details: 'Burundi is one the poorest and most deforested countries in the world — with a vicious cycle of ever-increasing poverty, deforestation, and land degradation. In addition to establishing tree nurseries and planting trees, this project works to break the cycle through education. Farmers can learn about sustainable farming and the benefits of trees for their families and their communities.',
		},
		{
			heading: 'The river and the Trees',
			location: 'Oregon',
			treesPlanted: 50000,
			imageSrc: oregon,
			details: 'The iconic Willamette River is 187 miles in length, drains a 11,478-square-mile area (12% of Oregon’s landscape), and serves as a major tributary of the Columbia River. Tree planting efforts here will protect the watershed area of a basin that is home to two-thirds of Oregon’s population and generates 75% of its economic output. This project will reestablish forests to ensure clean drinking water for residents as well as improve water quality and habitat for wildlife dependent upon this area.',
		},
		{
			heading: 'Planted More Trees',
			location: 'India',
			treesPlanted: 2000000,
			imageSrc: india,
			details: 'Southern India’s Cauvery River Basin is in crisis. The river has shrunk by an estimated 40% from its historical flows over 70 years. This is resulting in drinking water scarcity. A loss of tree cover has also contributed to poor soil health. Reforesting this river basin and educating farmers about agroforestry practices will help to stabilize the river and improve soil conditions over time.',
		},
	];

	return (
		<div className="articles" id="scroll3">
			<h1 className='article-h1'>PLANTING PROJECTS</h1>
			<div className="article-container">
				{articlesData.map((article, index) => (
					<div className="article" key={index}>
						<span className='article-heading'>{article.heading}</span>
						<span className='article-location'><strong>Location:</strong> {article.location}</span>
						<span className="article-trees-planted">Trees Planted:{article.treesPlanted}</span>
						<span className='article-image'><img src={article.imageSrc} alt={article.heading} /></span>
						<span className='article-details'>{article.details}</span>
					</div>
				))}
			</div>
			<Link to="/all-articles" target='_blank' style={{color:"white", fontSize:'30px', textDecoration:'none', marginBottom:'10%'}}>See All Articles =&gt;</Link> {/* Link to the all articles page */}
		</div>
	);
}

export default Articles;
