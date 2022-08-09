import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Header = styled.h1`
  text-align: center;
`

const Table = styled.table`
  color: black;
  text-align: center;
  font-size: 24px;
`

const AuthorLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    text-decoration: underline;
  }
`

const Loading = styled.div`
  text-align: center;
  font-size: 30px;
`

const Users = ({ users }) => {
  return (
    <>
      {users === null ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Header>Users</Header>
          <Table>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <b>blogs created</b>
                </td>
              </tr>
              {users.map(u => (
                <tr key={u.id}>
                  <td>
                    <AuthorLink to={`/users/${u.id}`}>{u.name}</AuthorLink>
                  </td>
                  <td>{u.blogs.length}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default Users
