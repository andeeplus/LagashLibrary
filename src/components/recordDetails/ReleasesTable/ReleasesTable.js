import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import ReactTable from "react-table";
import "react-table/react-table.css";

class ReleasesLabel extends Component {

  componentDidMount(){
    console.log('releases label mounted', this.props.releases)
  }
  render() {

    const {releases} = this.props

    return (

      releases &&
      <div className="table-versions">
      <ReactTable
        data={releases.releases}
        columns={[
          {
            columns: [
              {
                Header: "Cat #",
                accessor: "catno",
                Cell: ({ row }) => (<NavLink to={{ pathname: `/record/releases/${row._original.id}` }}>{row.catno}</NavLink>)
              },
              {
                Header: "Artist",
                accessor: "artist"
              },
              {
                Header: "Title",
                accessor: "title"
              },
              {
                Header: "Format",
                accessor: "format"
              },
              {
                Header: "Year",
                accessor: "year"
              }
            ]

          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
      <br />
    </div>
    );
  }
}

export default ReleasesLabel;
