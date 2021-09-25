import React from 'react';
import styled from 'styled-components';

const SEditProfileBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  transition: border 1s ease;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const EditProfileBox = ({ children }) => {
  return (<SEditProfileBox>
    {children}
  </SEditProfileBox>);
}

export default EditProfileBox;