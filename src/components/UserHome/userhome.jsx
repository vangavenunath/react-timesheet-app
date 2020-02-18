import React, { useState, useEffect } from 'react'
import DatePicker from 'react-date-picker';
import TimeField from 'react-simple-timefield';
import {StyledInput, Button} from '../styles/commonStyles'
import axios from 'axios';
import { BASE_URL } from '../constants';
import DataTable, { createTheme } from 'react-data-table-component';

export const UserHome = (props) => {
    const [date, setDate] = useState(new Date('2020-02-18'))
    const [fromTime, setFromTime] = useState('09:00')
    const [toTime, setToTime] = useState('17:00')
    const [comment, setComment] = useState('')
    const [tableDataItems, setTableDataItems] = useState([{ username: '', create_date: '', start_time:'',end_time:'',comment:''}])

    useEffect(()=>  {
        getLoginTimes()
        console.log(tableDataItems)
    },[props.username])

    const getLoginTimes = () => {
        const requestData = {username: props.username}
        console.log('=======requestData=========',requestData)
        axios({
            method: 'GET',
            url: BASE_URL+'user_log/'+props.username,
            data: requestData,
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(result => {
                console.log(result)
                const arr1 = eval(result.data)
              // console.log("Get process done",Array.from(result.data),typeof(Array.from(result.data)))
              let arr = []
              console.log("===================arr1=========",arr1, typeof(arr1))
              for (var row = 0; row < arr1.length; row++) {
                arr.push({ username: arr1[row][0], create_date: arr1[row][1], start_time: arr1[row][2], end_time: arr1[row][3], comment: arr1[row][4] })
              }
              setTableDataItems(arr)              
            })       
    }

    const handleClick = () => {
        const userFormDetails = {username: props.username, create_date:date.toISOString().split('T')[0], start_time:fromTime, end_time: toTime, comment:comment}
        console.log(date.toISOString().split('T')[0],fromTime,toTime,comment)
        axios({
            method: 'POST',
            url: BASE_URL+'user_ops',
            data: userFormDetails,
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(result => {
              console.log('=========POST============='+result)
            })
            .then(()=> getLoginTimes())
    }

    const logout = () => {
        window.location.reload();
        return false;
    }

    const columns = [
        {
          name: 'Username',
          selector: 'username',
          sortable: true,
        },
        {
          name: 'Create Date',
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
      
    return (
        <div>
            
            <label>Date</label>
            <DatePicker onChange={setDate} value={date} placeholder={new Date()} />
            <label>From Time</label>
            <TimeField value={fromTime} onChange={(evt) => setFromTime(evt.target.value)} />
            <label>To Time</label>
            <TimeField value={toTime} onChange={(evt) => setToTime(evt.target.value)} />
            <textarea  onChange={(evt) => setComment(evt.target.value)}/>
            {/* <StyledInput type="text" onChange={(evt) => setComment(evt.target.value)}/> */}
            <Button onClick={handleClick}>Log Time</Button>
            <Button onClick={logout}>Log Out</Button>
            <DataTable
          title="Login History"
          columns={columns}
          data={tableDataItems}
          defaultSortField="title"
        />
        </div>
    )
}
