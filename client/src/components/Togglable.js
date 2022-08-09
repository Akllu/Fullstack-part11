import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.button`
  border-radius: 50px;
  background: rgb(0, 0, 0);
  padding: 10px 22px;
  color: white;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: 15px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: white;
    color: black;
  }
`

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Container>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </div>
    </Container>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
