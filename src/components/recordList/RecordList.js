import React, { Component } from 'react';
import RecordCard from '../recordList/RecordCard/RecordCard'
// import {connect} from 'react-redux'

class RecordList extends Component {

  componentDidMount(){
    console.log('didMount RecordList --->', this.props)
  }

  render () {

    const {records, comingFrom} = this.props

    return (
      <div className='RecordList'>
      
        {records && records.map(records => {
            console.log(records)
            return (
              <div key={records.id} className='RecordList-item'>
                <RecordCard
                  id={records.id}
                  artist={records.artist}
                  title={records.title}
                  label={records.label}
                  style={records.style}
                  genre={records.genre}
                  format={records.format}
                  country={records.country}
                  catno={records.catno}
                  cover_image={comingFrom === 'labelDetail' ? records.thumb : records.cover_image}
                  year={records.year}
                  type={records.type}
                  comingFrom={comingFrom}
                />
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default RecordList

// const mapStateToProps = (state) => {
//   console.log(' mapStateToProps -->',state)
//   return { results: state.results };
// };

//  connect(mapStateToProps)(RecordList);