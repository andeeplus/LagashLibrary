import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import vinyl from '../../../img/vinyl.svg'
import {truncateString} from '../../../services/helper'

class Carousel extends Component {

  state = {
		currentIndex: 0,
		defaultImage: [vinyl],
		articles: null,

	};

	componentDidMount(){
		const {images} = this.props
		console.log(this.props.images)
		images && this.setState({articles: images})
	}

  previousSlide = () => {
		const lastIndex = this.state.articles.length - 2;
		const { currentIndex } = this.state;
		const shouldResetIndex = currentIndex === 0;
		const index =  shouldResetIndex ? lastIndex : currentIndex - 1;
		
		this.setState({
			currentIndex: index
		});
	}
	
	nextSlide = () => {
		const lastIndex = this.state.articles.length - 2;
		const { currentIndex } = this.state;
		const shouldResetIndex = currentIndex === lastIndex;
		const index =  shouldResetIndex ? 0 : currentIndex + 1;

		this.setState({
			currentIndex: index
		});
  }
	

	render () {
		const {articles, currentIndex} = this.state
		return (
			articles &&

			<div className='multi-carousel'>

			{ articles.length > 1 && 
				<div className={'multi-left-arr'}>
				<FontAwesomeIcon 
					className='multi-arrows-caro' 
					icon='arrow-left' onClick={ () => this.previousSlide() 
					}/>
				</div>}
			
			<div key={currentIndex} className='multi-card-carousel'>
        <figure  className='multi-card-figure'>
					<img className='multi-image-slide' 
					src={ articles[currentIndex].imgArticle} 
					alt={this.state.currentIndex} />
				</figure>
				<a href={articles[currentIndex].link} 
				target="_blank" 
				rel="noopener noreferrer" 
				className="article-mono" >
				{truncateString(articles[currentIndex].title,23)}</a>
			</div>

			{ articles.length > 1 && 
			<div key={currentIndex+1} className='multi-card-carousel'>
				<figure  className='multi-card-figure'>
					<img className='multi-image-slide' 
					src={ articles[currentIndex+1].imgArticle} 
					alt={this.state.currentIndex+1} />
				</figure>
				<a href={articles[currentIndex+1].link} 
				target="_blank" 
				rel="noopener noreferrer" 
				className="article-mono" >
				{truncateString(articles[currentIndex+1].title,23)}</a>
			</div>
			}
			{ articles.length > 1 && 
				<div className={'multi-right-arr'}>
				<FontAwesomeIcon 
					className='multi-arrows-caro' 
					icon='arrow-right'
					onClick={ () => this.nextSlide() } 
				/>
				</div>
			}
			
			</div>
		);
	}
}





export default Carousel;