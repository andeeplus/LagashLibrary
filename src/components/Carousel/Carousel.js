import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import vinyl from '../../img/vinyl.svg'
import {truncateString} from '../../services/helper'

class Carousel extends Component {

  state = {
		currentImageIndex: 0,
		size: 'small',
		dots: false,
		dotsType: 'square',
		images: [vinyl],
		titleTrig: 60
	};

	componentDidMount(){
		this.sizeSelector(this.props.size)
		this.dotSelector(this.props.dots)
		const {images} = this.props
		images && this.setState({images})
		window.addEventListener('resize', this.triggerTitle());
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.triggerTitle());
	}

	triggerTitle(){
		if (window.innerWidth < 780){this.setState({titleTrig: 46})}
	}

  previousSlide = () => {
		const lastIndex = this.state.images.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === 0;
		const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;
		
		this.setState({
			currentImageIndex: index
		});
	}



	
	nextSlide = () => {
		const lastIndex = this.state.images.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === lastIndex;
		const index =  shouldResetIndex ? 0 : currentImageIndex + 1;

		this.setState({
			currentImageIndex: index
		});
  }
	
	sizeSelector(size){
		switch(size){
			case 'small-square':
			this.setState({size: '-small'})
			break
			case 'header': 
			this.setState({size: '-header'})
			break
			default: 
			this.setState({size: '-small'})
		}
	}

	dotSelector(dots){
		if (dots) {
			switch(dots.type){
				case 'square':
				this.setState({dots: true, dotsType: 'square'})
				break
				case 'circle': 
				this.setState({dots: true, dotsType: 'circle'})
				break
				default: 
				this.setState({dots: true, dotsType: 'square'})
			}
		}
	}


	render () {
		const {images, size, currentImageIndex, dots, titleTrig} = this.state
		return (
      <div className={`carousel${size}`}>
        <figure>
					<img className={`image-slide${size}`}  
					src={ size === '-small' ? images[currentImageIndex].uri : images[currentImageIndex].imgArticle} 
					alt={currentImageIndex} />
				{ size === '-header' &&
				<div className='title-overlay-header'>
					<p><span className="highlight">{truncateString(images[currentImageIndex].title, titleTrig)}
					<a href={images[currentImageIndex].link} target="_blank" rel="noopener noreferrer"> 
					<FontAwesomeIcon style={{paddingLeft:'5px', paddingBottom: '2px', height: '15px', lineHeight: '30px'}}icon='external-link-alt'/></a></span>
					</p>
				</div> }
				</figure>

				{dots &&
					<div className="dots-line">
					{images.map( (i, index) =>
						<FontAwesomeIcon 
						key= {index}
						onClick={ () => this.setState({currentImageIndex: index})} 
						style={currentImageIndex === index 
							&& {color:'red'}}
						icon="square" />)}
					</div>

				}

			{ images.length > 1 && 
				<React.Fragment>
				<div className={`left-arr${size}`}>
				<FontAwesomeIcon 
					className={`arrows-caro${size}`} 
					icon={'arrow-left'} onClick={ () => this.previousSlide() 
					}/>
				</div>
				<div className={`right-arr${size}`}>
				<FontAwesomeIcon 
					className={`arrows-caro${size}`} 
					icon={'arrow-right'} 
					onClick={ () => this.nextSlide() } 
				/>
				</div>
				</React.Fragment>
			}
			</div>
		);
	}
}





export default Carousel;