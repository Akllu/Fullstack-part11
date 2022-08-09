import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const SuccessMessage = styled.div`
  font-size: 18px;
  background-color: lightgray;
  color: green;
  border: 3px solid green;
  border-radius: 10px;
  padding: 10px;
`

const ErrorMessage = styled.div`
  font-size: 18px;
  background-color: lightgray;
  color: red;
  border: 3px solid red;
  border-radius: 10px;
  padding: 10px;
`

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) return null

  return notification.type === 'success' ? (
    <SuccessMessage>{notification.message}</SuccessMessage>
  ) : (
    <ErrorMessage className="error">{notification.message}</ErrorMessage>
  )
}

export default Notification
