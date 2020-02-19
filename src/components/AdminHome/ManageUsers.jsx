import axios from 'axios';
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { Button, Button1, StyledInput } from '../styles/commonStyles'
import { BASE_URL } from '../constants';
import memoize from 'memoize-one';
import { viewTimesheets } from '../ViewTimesheets/viewTimesheets'
import Router from '../Router'
import { Link } from 'react-router-dom' 
export const ManageUsers = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableDataItems, setTableDataItems] = useState([{ Name: 'User1', CreatedDate: 'Date1' }])
  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    // setInterval(getUsers,5000)
    getUsers()
    // console.log('state', selectedRows);
    console.log(tableDataItems);
  }, []);

  const contextActions = memoize(deleteHandler => (
    <Button1
      color="secondary"
      onClick={deleteHandler}
    >
      Delete
    </Button1>
  ))

  const deleteAll = () => {
    const rows = selectedRows.map(r => r.Name);

    if (window.confirm(`Are you sure you want to delete:\r ${rows}?`)) {
      // this.setState(state => ({ toggleCleared: !state.toggleCleared, data: differenceBy(state.data, state.selectedRows, 'name') }));
      axios({
        method: 'DELETE',
        url: BASE_URL,
        data: rows,
        headers: {
          'Content-Type': 'application/json',
          //   'Authorization': 'Basic ' + userpass
        }
      })
        .then(result => {console.log("Delete process done", result)
        getUsers()
    }
        )
      console.log('clicked', rows);
    }
  }

  const getUsers = () => {
    axios({ method: 'GET',
      url: BASE_URL,
      data: userDetails,
      headers: {'Content-Type': 'application/json'}
    })
      .then(result => {
        // console.log("Get process done",Array.from(result.data),typeof(Array.from(result.data)))
        let arr = []
        for (var row in result.data) {
          console.log(result.data[row][0], result.data[row][2])
          arr.push({ Name: result.data[row][0], Password: result.data[row][1], CreatedDate: result.data[row][2] })
        }
        setTableDataItems(arr)
        })
    console.log(tableDataItems)
  }

  const handleButtonClick = (row) => {
    console.log("Delete button is clicked", row)
    console.log('clicked');
  };

  const handleChange = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const columns = useMemo(() => [
    // {

    //   cell: () => <button onClick={handleButtonClick}>Delete</button>,
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    // },
    {
      name: 'Name',
      selector: 'Name',
      sortable: true,
      grow: 2,
    },
    {
      name: 'Password',
      selector: 'Password',
      sortable: true,
      grow: 2,
    },
    {
      name: 'CreatedDate',
      selector: 'CreatedDate',
      sortable: true,
      //   right: true,
    },
  ], []);

  const createUser = () => {
    axios({
      method: 'PUT',
      url: BASE_URL,
      data: userDetails,
      headers: {
        'Content-Type': 'application/json',
        //   'Authorization': 'Basic ' + userpass
      }
    }).then(result => {
      getUsers()
      console.log("insert process done", result)
    })
  }

  const onInputChange = event => {
    setUserDetails({
      ...userDetails,
      [event.target.id]: event.target.value
    });
  }

  return (
    <div>
      <StyledInput id="username" onChange={onInputChange} placeholder="Enter Username" />
      <br/>
      <StyledInput id="password" onChange={onInputChange} placeholder="Enter password" />
      <br/>
      <Button onClick={createUser}>Add New User</Button>
      <DataTable
        title="Users"
        data={tableDataItems}
        columns={columns}
        onSelectedRowsChange={handleChange}
        onRowClicked={handleButtonClick}
        contextActions={contextActions(deleteAll)}
        selectableRows
      />
      {console.log(tableDataItems)}
    </div>

  );
};