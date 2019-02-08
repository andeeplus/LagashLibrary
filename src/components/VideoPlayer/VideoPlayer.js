import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import {truncateString} from '../../services/helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class VideoPlayer extends Component {

  state={
    index: 0,
    playing: false
  }

  changeTrack(i){
    this.setState({index: i, playing:true})
  }
  

  render() {


    const {index,playing} = this.state
    const {videos} = this.props

      return (

      <div className="video-block">
      <h1 className="page-h1">
      <FontAwesomeIcon icon="video" /> 
      Videos
      </h1>
      <div className='player-wrapper'> 
        <ReactPlayer width={'340px'} height={'200px'} url={videos[index].uri} playing={playing} controls={true} />
        
        <ul className='playlist'>
        {videos.map((v,i) => 
          <li onClick={() => this.changeTrack(i)} 
          key={i}>{truncateString(v.title, 42)}</li>)}
        </ul>
      </div>
      </div>
    );
  }
}

  