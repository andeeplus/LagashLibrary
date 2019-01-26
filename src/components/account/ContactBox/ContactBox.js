import React, { Component } from 'react';
import DatabaseApi from '../../../services/dbApi'
import mailPlane from '../../../img/mailPlane.svg'
import {withRouter} from 'react-router'

class ContactBox extends Component {

  state = {
    name: '',
    email: '',
    subject: '',
    msgSent: false
  }

  sendContact = () => {
    const {name,email,subject} = this.state
    const sendContactText = {name, email, subject}
    DatabaseApi.addDocument('contact', sendContactText)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.sendContact()
    this.setState({msgSent: true})
    setTimeout(() => this.props.history.push('/home'), 4000); 
  }

  render() {

    const {msgSent} = this.state

    return (

      !msgSent 
      ?<div className="contact-box">
        <h1 className="title-pages">Write us a message!</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="firstname" autoComplete="firstname" onChange={this.handleChange} placeholder="Your name.." />

          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" name="email" autoComplete="email" onChange={this.handleChange} placeholder="Your email.." required />
      
          <label htmlFor="subject">Subject</label>
          <textarea id="subject" className="text-area-msg" onChange={this.handleChange} name="subject" placeholder="Write something.." required></textarea>
      
          <input type="submit" className="buttonSubmit" value="Submit" />
        </form>
      </div>
      : <div className="msgSent">
          <img src={mailPlane} className="airplane" alt="mailPlane" />
          <p className="mailSent">Message Sent Succesfully</p>
        </div> 
    );
  }
}

export default withRouter(ContactBox);