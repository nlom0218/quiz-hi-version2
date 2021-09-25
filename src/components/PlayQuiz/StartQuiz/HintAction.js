import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ActionBox, ActionContent, BottomLine, LeaveBtn, NextStep } from './sharedStyles';

const HintAction = ({ question, setAction, fontSize }) => {
  const onCLickLeaveBtn = () => {
    setAction(null)
  }
  return (<ActionBox>
    <LeaveBtn><FontAwesomeIcon icon={faTimes} onClick={onCLickLeaveBtn} /></LeaveBtn>
    <ActionContent fontSize={fontSize}>{question.hint}</ActionContent>
    <NextStep></NextStep>
    <BottomLine></BottomLine>
  </ActionBox>);
}

export default HintAction;