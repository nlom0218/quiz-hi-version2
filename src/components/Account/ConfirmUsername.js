import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';


const SConfirmUsername = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  animation: ${fadeIn} 0.6s ease;
  margin-bottom: 30px;
  input {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: rgb(200, 200, 200, 0.2);
    transition: background-color 1s ease, box-shadow 0.4s linear;
    :focus {
      box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    }
  }
`

const CONFRIM_USERNAME_QUERY = gql`
  query Query($email: String!) {
    findUsername(email: $email) {
      username
    }
  }
`

const ConfirmUsername = ({ email }) => {
  const { data, loading } = useQuery(CONFRIM_USERNAME_QUERY, {
    variables: { email }
  })
  return (<SConfirmUsername>
    <span>아이디</span>
    <input
      type="text"
      value={loading ? "loading..." : data?.findUsername?.username}
      readOnly="readOnly"
    />
  </SConfirmUsername>);
}

export default ConfirmUsername;