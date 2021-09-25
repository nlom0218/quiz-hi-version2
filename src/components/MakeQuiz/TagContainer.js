import React, { useState } from 'react';
import { faMinusCircle, faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fadeIn } from '../../animation/fade';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import useUser from '../../hooks/useUser';

const TagInput = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const PlusBtn = styled.div`
  font-size: 30px;
  border-radius: 50%;
  grid-column: 2 / 4;
  align-self: center;
  justify-self: left;
  margin-left: 20px;
  cursor: pointer;
  color: rgb(201, 102, 255, 0.2);
  transition: color 0.4s linear;
  :hover {
    color: rgb(201, 102, 255, 0.6);
  }
`

const SeeTag = styled.div`
  margin-top: 10px;
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
`

const TagBox = styled.div`
  background-color: rgb(201, 102, 255, 0.4);
  font-size: 14px;
  margin-bottom: 10px;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.6s linear forwards;
`

const RemoveBtn = styled.div`
  margin-left: 5px;
  cursor: pointer;
`

const SuggestionTags = styled.div`
  margin-top: 20px;
  grid-column: 2 / 3;
  display: grid;
  row-gap: 20px;
`

const SuggestionTagsList = styled.div`
  line-height: 200%;
  background-color: rgb(200, 200, 200, 0.2);
  border-radius: 5px;
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;
  div {
    margin-right: 20px;
    cursor: pointer;
  }
`

const TagContainer = ({ getValues, tags, setTags, setValue, register, subMsg1, subMsg2, nextMode, question, color, bgColor, makeQuestion }) => {
  const [questionMark, setQuestionMark] = useState(false)
  const user = useUser()
  const onClickPlusQuizTag = () => {
    if (tags.includes(getValues("tag"))) {
      return
    }
    if (getValues("tag") === "" || makeQuestion) {
      return
    }
    const newQuizTags = [...tags, getValues("tag")]
    setTags(newQuizTags)
    setValue("tag", "")
  }
  const onClickRemoveQuizTag = (tag) => {
    const newQuizTags = tags.filter((item) => item !== tag)
    setTags(newQuizTags)
  }
  const limitEvent = (type) => {
    if (type === "read") {
      if (question && nextMode !== "" || makeQuestion) {
        return "readOnly"
      } else {
        return ""
      }
    } else if (type === "btn") {
      if (question && nextMode !== "" || makeQuestion) {
        return false
      } else {
        return true
      }
    }
  }
  const onClickQuestionMark = () => {
    setQuestionMark(prev => !prev)
  }
  const suggestionTags = [
    "1학년", "2학년", "3학년", "4학년", "5학년", "6학년",
    "국어", "도덕", "사회", "수학", "과학", "실과", "체육", "음악", "미술", "영어",
    "통합", "봄", "여름", "가을", "겨울", "창체", "안전", "1학기", "2학기",
    "1단원", "2단원", "3단원", "4단원", "5단원", "6단원", "7단원", "8단원"
  ]
  const onClickSuggestionTag = (tag) => {
    if (tags.includes(tag)) {
      return
    }
    const newQuizTags = [...tags, tag]
    setTags(newQuizTags)
  }
  return (<React.Fragment>
    <span className="inputTitle">
      태그 <FontAwesomeIcon onClick={onClickQuestionMark} icon={faQuestionCircle} />
      {questionMark && <span className="subMsg">{subMsg1}</span>}
    </span>
    <TagInput>
      <input
        {...register("tag")}
        type="text"
        autoComplete="off"
        readOnly={limitEvent("read")}
      />
      <PlusBtn><FontAwesomeIcon icon={faPlusCircle} onClick={onClickPlusQuizTag} /></PlusBtn>
      {tags.length !== 0 && <SeeTag>
        {tags.map((item, index) => {
          return <TagBox key={index} bgColor={bgColor}>
            {item}
            {limitEvent("btn") && <RemoveBtn>
              <FontAwesomeIcon
                icon={faMinusCircle}
                onClick={() => onClickRemoveQuizTag(item)}
              />
            </RemoveBtn>}
          </TagBox>
        })}
      </SeeTag>}
    </TagInput>
    <SuggestionTags>
      <div>추천태그 / 아래의 태그를 클릭하면 태그가 자동으로 추가 됩니다.</div>
      <SuggestionTagsList>
        {suggestionTags.map((item, index) => {
          return <div onClick={() => onClickSuggestionTag(item)} key={index}>{item}</div>
        })}
        {user?.tags.map((item) => item.name).filter((item) => !suggestionTags.includes(item))
          .map((item, index) => {
            return <div onClick={() => onClickSuggestionTag(item)} key={index}>{item}</div>
          })
        }
      </SuggestionTagsList>
    </SuggestionTags>
  </React.Fragment>);
}

export default TagContainer;