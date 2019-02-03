import React, { Component } from 'react';
import ContactBox from '../../components/account/ContactBox/ContactBox'
import DatabaseApi from '../../services/dbApi';

const aboutInfo = 'X6yg98YtTfz3XajHriGV'

class About extends Component {

  state = {
    about:{}
  }

  async componentDidMount(){
    const about = await DatabaseApi.getDocumentById('content', aboutInfo)
    this.setState({about})
  }
  render() {
    return (

      <div className="about-block">
        <h1 className="title-pages">{this.state.about.title}</h1>
        <p className="page-desc-about" dangerouslySetInnerHTML={{__html:this.state.about.desc}} ></p>
        <ContactBox />
      </div>
    );
  }
}

export default About;