import styled from 'styled-components'

export const Button = styled.button`
 {
    width: 35%;
    background-color: rgb(247, 184, 12);
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  :hover {
    background-color: #f37a17;
  }
  :disabled {
    background-color: gainsboro;
  }
`

export const Button1 = styled.button`
 {
    width: 100%;
    background-color: rgb(247, 184, 12);
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  :hover {
    background-color: #f37a17;
  }
  :disabled {
    background-color: gainsboro;
  }
`

export const StyledInput = styled.input`
 {
    width: 35%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`