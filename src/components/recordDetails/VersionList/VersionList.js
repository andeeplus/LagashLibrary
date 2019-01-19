import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import ReactTable from "react-table";
import "react-table/react-table.css";

class VersionList extends Component {

  componentDidMount(){
    console.log('versions mounted')
  }
  render() {

    const {versions} = this.props
    return (

      versions &&
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
                  console.log(row)
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
    );
  }
}

export default VersionList;


// <div>
// <table>
// <tbody>
//   <th>Cat#</th>
//   <th>Label</th>
//   <th>Title</th>
//   <th>Format</th>
//   <th>Country</th>
//   <th>Released</th>
// </tbody>
// {
//   versions.versions.map((i,index) =>
//       <tr key={i.id + index}>
//         <td>{i.catno}</td>
//         <td>{i.label}</td>
//         <td>{i.title}</td>
//         <td>{i.format}</td>
//         <td>{i.country}</td>
//         <td>{i.released}</td>
//       </tr>
//     )
// }

// </table>
// </div>