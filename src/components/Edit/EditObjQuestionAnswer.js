import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import EditInputLayout from './EditInputLayout';

const InputTitle = styled.div`
  
`

const DistractorBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 20px;
  .distractorWrapper {
    display: grid;
    grid-template-columns: 1fr 12fr 1fr;
    svg {
    justify-self: center;
    align-self: center;
    font-size: 18px;
    cursor: pointer;
    }
  }
`

const DistractorNum = styled.div`
  justify-self: center;
  align-self: flex-start;
  margin-top: 10px;
`

const EditObjQuestionAnswer = ({ objAnswer, setObjAnswer, register }) => {
  const onClickAnswer = (num) => {
    const ok = objAnswer.includes(num)
    if (ok) {
      const newAnswer = objAnswer.filter((item) => item !== num)
      setObjAnswer(newAnswer)
    } else {
      const newAnswer = [...objAnswer, num]
      setObjAnswer(newAnswer)
    }
  }
  const checkAnswer = (num) => {
    const ok = objAnswer.includes(num)
    if (ok) {
      return true
    } else {
      return false
    }
  }
  return (<EditInputLayout>
    <InputTitle>선택지 수정하기</InputTitle>
    <DistractorBox>
      {[1, 2, 3, 4].map((item) => {
        return <div className="distractorWrapper" key={item}>
          <DistractorNum>{item}번</DistractorNum>
          <textarea
            {...register(`distractor${item}`, {
              required: true
            })}
            cols={20}
            rows={2}
          ></textarea>
          <FontAwesomeIcon
            onClick={() => onClickAnswer(item)}
            icon={checkAnswer(item) ? faCheckCircle : faCircle}
          />
        </div>
      })}
    </DistractorBox>
  </EditInputLayout>);
}

export default EditObjQuestionAnswer;