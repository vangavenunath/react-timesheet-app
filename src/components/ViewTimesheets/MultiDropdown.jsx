import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import { BASE_URL } from '../constants';
import 'semantic-ui-css/semantic.min.css'

export const DropdownMultipleSelection = (props) => {
    const [options, setOptions] = useState([])
    useEffect(() => {
        getUsers()
        console.log('==========options=============',options)
    },[])
    const getUsers = () => {
        axios({
            method: 'GET',
            url: BASE_URL+'users',
            headers: {'Content-Type': 'application/json'}
          })
            .then(result => {
                console.log(result)
                const arr1 = eval(result.data)
              let arr = []
              for (var row = 0; row < arr1.length; row++) {
                arr.push({ key: arr1[row][0], text: arr1[row][0], value: arr1[row][0] })
              }
              setOptions(arr)
              console.log('==========options=============',arr)              
            })
        }
    
    const handleDropdownChange = (event, data) => {
        console.log(data.value)
        props.setUsers(data.value)
    }
    
    return(
        <div style={{width:"20%"}}>
        <Dropdown placeholder='Select user' fluid multiple selection options={options} onChange={(event, data) => handleDropdownChange(event, data)} />
        </div>
    )
            
    
}
  

