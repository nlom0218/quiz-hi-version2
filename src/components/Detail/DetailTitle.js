import React from 'react';
import styled from 'styled-components';
import { faBook, faBookOpen, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Title = styled.div`
  font-size: 18px;
  grid-column: ${props => props.tag ? "1 / 2" : "1 / -1"};
  grid-row: 1 / 2;
  letter-spacing: 3px;
  line-height: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
    font-size: 16px;
  }
`

const DetailTitle = ({ title }) => {
  const processIcon = (title) => {
    if (title === "퀴즈") {
      return faBook
    } else if (title === "문제") {
      return faBookOpen
    } else {
      return faTag
    }
  }
  const processTag = (title) => {
    if (title !== "퀴즈" && title !== "문제") {
      return true
    } else {
      return false
    }
  }
  return (<Title tag={processTag(title)}>
    <FontAwesomeIcon icon={processIcon(title)} /> {title}
  </Title>);
}

export default DetailTitle;