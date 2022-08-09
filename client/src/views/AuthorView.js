import React from 'react'
import styled from 'styled-components'
import { useMatch } from 'react-router-dom'

const Header = styled.h1`
  text-align: center;
`

const SubHeader = styled.h3`
  text-align: center;
`

const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Author = ({ users }) => {
  if (!users) return null

  const match = useMatch('/users/:id')
  const user = match ? users.find(u => u.id === match.params.id) : null

  return (
    <>
      <Header>{user.name}</Header>
      <SubHeader>Added blogs</SubHeader>
      <UnorderedList>
        {user.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </UnorderedList>
    </>
  )
}

export default Author
