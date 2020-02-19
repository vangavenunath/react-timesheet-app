import React, { useState, useEffect } from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from '../constants';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DataTable from 'react-data-table-component';
import DatePicker from 'react-date-picker';
import {DropdownMultipleSelection} from './MultiDropdown'


export const TimeSheets = (props) => {
    const [tableDataItems, setTableDataItems] = useState([{ username: '', create_date: '', start_time:'',end_time:'',comment:''}])
    const [users, setUsers] = useState([])
    const [fromDate, setFromDate] = useState(new Date(new Date(Date.now()-24*60*60000).toLocaleDateString({timezone:"Australia/Melbourne"})))
    const [toDate, setToDate] = useState(new Date(new Date(Date.now()-24*60*60000).toLocaleDateString({timezone:"Australia/Melbourne"})))

    useEffect(()=>  {
        getLoginTimes()
        console.log(tableDataItems)
    },[users,fromDate,toDate])

    const getLoginTimes = () => {
        const requestData = {'username': users,'from_date':new Date(fromDate.valueOf()+11*60*60000).toISOString(),'to_date':new Date(toDate.valueOf()+11*60*60000).toISOString() }
        console.log('=======requestData=========',users)
        axios({
            method: 'POST',
            url: BASE_URL+'adminlog',
            data: requestData,
            headers: {'Content-Type': 'application/json'}
          })
            .then(result => {
                console.log(result)
                const arr1 = eval(result.data)
              let arr = []
              console.log("===================arr1=========",arr1, typeof(arr1))
              for (var row = 0; row < arr1.length; row++) {
                arr.push({ username: arr1[row][0], create_date: arr1[row][1], start_time: arr1[row][2], end_time: arr1[row][3], comment: <CKEditor
                    editor={ ClassicEditor }
                    config = {{toolbar : []}} 
                    disabled = {true}
                    data={arr1[row][4]}/> })
              }
              setTableDataItems(arr)              
            })
            .catch(error => console.warn(error))       
    }
    const columns = [
        {
          name: 'Username',
          selector: 'username',
          sortable: true,
        },
        {
          name: 'Logged Date',
          selector: 'create_date',
          sortable: true,
        },
        {
          name: 'Start Time',
          selector: 'start_time',
          sortable: true,
        },
        {
          name: 'End Time',
          selector: 'end_time',
          sortable: true,
        },
        {
          name: 'Comment',
          selector: 'comment',
          sortable: true,
        },
      ];
      

    return(
        <div>
        <DropdownMultipleSelection setUsers={setUsers}/>
        <label>From Date</label>
            <DatePicker onChange={setFromDate} value={fromDate} placeholder={new Date()} />
        <label>To Date</label>
            <DatePicker onChange={setToDate} value={toDate} placeholder={new Date()} />
        <DataTable
        title="User Login Details"
        data={tableDataItems}
        columns={columns}
      />
      </div>
    )
}