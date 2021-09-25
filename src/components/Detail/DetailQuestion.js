import { faBell, faFile } from '@fortawesome/free-regular-svg-icons';
import { faImage, faListOl, faMagic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Question = styled.div`
  margin-top: ${props => props.tags ? "10px" : "20px"};
  grid-column: 1 / -1;
  line-height: 25px;
  display: grid;
  grid-template-columns: 90px 1fr;
  align-items: flex-start;
`

const QuestionText = styled.textarea`
  line-height: 25px;
  width: 100%;
  height: ${props => props.txtHeight}px;
  resize: none;
  border: none;
  font-size: 16px;
  padding: 0px;
  color: ${props => props.theme.fontColor};
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease, color 1s ease;
  :focus {
    outline: none;
  }
`

const Answer = styled.div`
  margin-top: 20px;
  grid-column: 1 / -1;
  line-height: 25px;
  display: grid;
  grid-template-columns: 90px 1fr;
  .title, .content {
    align-self: flex-start;
  }
`

const DisTractorList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
`

const DisTractorItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  .num {
    margin-right: 10px;
    align-self: flex-start;
  }
`

const DistractorTextarea = styled.textarea`
  line-height: 25px;
  align-self: flex-start;
  justify-self: flex-start;
  width: 100%;
  height: ${props => props.txtHeight}px;
  resize: none;
  border: none;
  font-size: 16px;
  padding: 0px;
  color: ${props => props.answer ? "tomato" : props.theme.fontColor};
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease, color 1s ease;
  :focus {
    outline: none;
  }

`

const Hint = styled.div`
  margin-top: 20px;
  grid-column: 1 / -1;
  line-height: 25px;
  display: grid;
  grid-template-columns: 90px 1fr;
  .title, .content {
    align-self: flex-start;
  }
`

const Image = styled.div`
  margin-top: 20px;
  grid-column: 1 / -1;
  line-height: 25px;
  display: grid;
  grid-template-columns: 90px 1fr;
  .title, .content {
    align-self: flex-start;
  }
  .content {
    width: 100%;
  }
`

const DetailQuestion = ({ question, tags, answer, type, distractor, hint, image }) => {
  const textarea = useRef()
  const distractor1 = useRef()
  const distractor2 = useRef()
  const distractor3 = useRef()
  const distractor4 = useRef()
  const processDistractor = (index) => {
    if (index === 0) {
      return distractor1
    } else if (index === 1) {
      return distractor2
    } else if (index === 2) {
      return distractor3
    } else if (index === 3) {
      return distractor4
    }
  }
  const [txtHeight, setTxtHeight] = useState(null)
  const [distractor1Height, setDistractor1Height] = useState(null)
  const [distractor2Height, setDistractor2Height] = useState(null)
  const [distractor3Height, setDistractor3Height] = useState(null)
  const [distractor4Height, setDistractor4Height] = useState(null)
  useEffect(() => {
    setTxtHeight(textarea.current.scrollHeight)
    if (type === "obj") {
      setDistractor1Height(distractor1.current.scrollHeight)
      setDistractor2Height(distractor2.current.scrollHeight)
      setDistractor3Height(distractor3.current.scrollHeight)
      setDistractor4Height(distractor4.current.scrollHeight)
    }
  }, [])
  const processDistractorHeight = (index) => {
    if (index === 0) {
      return distractor1Height
    } else if (index === 1) {
      return distractor2Height
    } else if (index === 2) {
      return distractor3Height
    } else if (index === 3) {
      return distractor4Height
    }
  }
  const checkAnswer = (num) => {
    const answerArr = answer.split(",").map((item) => parseInt(item))
    const checked = answerArr.includes(num)
    if (checked) {
      return true
    } else {
      return false
    }
  }
  return (<React.Fragment>
    <Question tags={tags.length !== 0 ? true : false}>
      <div className="title"><FontAwesomeIcon icon={faFile} /> 문제</div>
      <QuestionText
        value={question}
        cols={20}
        rows={1}
        txtHeight={txtHeight}
        readOnly="readOnly"
        ref={textarea}
      ></QuestionText>
    </Question>
    {type === "obj" &&
      <Answer>
        <div className="title"><FontAwesomeIcon icon={faListOl} /> 선택지</div>
        <div className="content">
          <DisTractorList>
            {distractor.split("//!@#").map((item, index) => {
              return <DisTractorItem key={index}>
                <div className="num">{`${index + 1}번`}</div>
                <DistractorTextarea
                  answer={checkAnswer(index + 1) ? true : false}
                  value={item}
                  cols={20}
                  rows={1}
                  ref={processDistractor(index)}
                  txtHeight={processDistractorHeight(index)}
                  readOnly="readOnly"
                ></DistractorTextarea>
              </DisTractorItem>
            })}
          </DisTractorList>
        </div>
      </Answer>
    }
    <Answer>
      <div className="title"><FontAwesomeIcon icon={faBell} /> 정답</div>
      {type === "tf" ?
        <div className="content">{answer === "true" ? "○" : "✕"}</div>
        :
        <div className="content">{answer}</div>}
    </Answer>
    {hint && <Hint>
      <div className="title"><FontAwesomeIcon icon={faMagic} /> 힌트</div>
      <div className="content">{hint}</div>
    </Hint>}
    {image && <Image>
      <div className="title"><FontAwesomeIcon icon={faImage} /> 이미지</div>
      <img className="content" src={image} />
    </Image>}
  </React.Fragment>);
}

export default DetailQuestion;