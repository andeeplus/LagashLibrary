import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import vinyl from '../../img/vinyl.svg'


class Carousel extends Component {

  state = {
		currentImageIndex: 0,
		images: [vinyl]
	};

	componentDidMount(){
		const {images} = this.props
		images && this.setState({images})
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
	


	render () {
		const {images} = this.state
		return (
      <div className="carousel">
        <figure>
          <img className="image-slide"  src={ this.state.images[this.state.currentImageIndex].uri} alt={this.state.currentImageIndex} />
        </figure>
			{ images.length > 1 && 
				<React.Fragment>
				<div className="left-arr">
				<FontAwesomeIcon 
					className="arrows-caro" 
					icon="arrow-left" onClick={ () => this.previousSlide() 
					}/>
				</div>
				<div className="right-arr">
				<FontAwesomeIcon 
					className="arrows-caro" 
					icon="arrow-right" 
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