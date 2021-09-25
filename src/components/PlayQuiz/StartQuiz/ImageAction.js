import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';

const ImageBox = styled.div`
  position: absolute;
  top: 40px;
  height: 520px;
  animation: ${fadeIn} 0.6s ease;
  z-index: 1;
`

const ImageContent = styled.img`
  height: 520px;
  position: relative;
  border-radius: 5px;
`

const ImageLeaveBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    color: tomato;
  }
`

const ImageAction = ({ question, setAction }) => {
  const onCLickLeaveBtn = () => {
    setAction(null)
  }
  return (<ImageBox>
    <ImageLeaveBtn onClick={onCLickLeaveBtn} ><FontAwesomeIcon icon={faTimes} /></ImageLeaveBtn>
    <ImageContent src={question.image}></ImageContent>
  </ImageBox>);
}

export default ImageAction;