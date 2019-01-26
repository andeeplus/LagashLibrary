import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class VersionList extends Component {

  render() {

    const {versions} = this.props
    return (

    versions &&
      <React.Fragment>
      <h1 className="page-h1">
      <FontAwesomeIcon icon="code-branch" /> 
      Versions
      </h1>
      <div className="table-versions">
      <ReactTable
        data={versions.versions}
        columns={[
          {
            columns: [
              {
                Header: "Cat #",
                accessor: "catno",
                Cell: ({ row }) => {
                  return (<NavLink to={{ pathname: `/record/releases/${row._original.id}` }}>{row.catno}</NavLink>)}
              },
              {
                Header: "Label",
                accessor: "label"
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
                Header: "Country",
                accessor: "country"
              },
              {
                Header: "Year",
                accessor: "released"
              }
            ]

          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
      <br />
    </div>
    </React.Fragment>
    );
  }
}

export default VersionList;
