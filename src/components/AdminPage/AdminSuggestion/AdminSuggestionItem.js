import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 17px 20px;
  line-height: 160%;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
  display: grid;
  grid-template-columns: 2fr 4fr 0.5fr;
  column-gap: 10px;
  row-gap: 20px;
  :hover {
    background-color: ${props => props.theme.grayColor};
  }
`

const AdminSuggestionItem = ({ suggestion, sender }) => {
  return (<Container>
    <div>{sender}</div>
    <div>{suggestion}</div>
    <div className="detail_content"><FontAwesomeIcon icon={faCog} /></div>
  </Container>);
}

export default AdminSuggestionItem;