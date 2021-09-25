import React from 'react';
import styled from 'styled-components';
import TagQuestion from './TagQuestion';
import TagQuiz from './TagQuiz';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router';

const Container = styled.div`
  margin-top: 20px;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 4fr 1fr;
  row-gap: 20px;
`

const TagType = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 20px;
`

const Title = styled.div`
  display: flex;
  cursor: pointer;
  opacity: ${props => props.selected ? 1 : 0.6};
  transition: opacity 0.3s linear;
  svg {
    margin-right: 10px;
  }
`

const TagContents = ({ id, totalQuizzes, totalQuestions }) => {
  const { type } = useParams()
  const history = useHistory()
  const onClickTagType = (type) => {
    history.push(`/detail/tag/${id}/${type}/recent/1`)
  }
  return (<Container>
    <TagType>
      <Title onClick={() => onClickTagType("quiz")} selected={type === "quiz"}>
        <FontAwesomeIcon icon={faBook} />
        <div>태그가 포함된 퀴즈</div>
      </Title>
      <Title onClick={() => onClickTagType("question")} selected={type === "question"}>
        <FontAwesomeIcon icon={faBookOpen} />
        <div>태그가 포함된 문제</div>
      </Title>
    </TagType>
    {type === "quiz" && <TagQuiz id={id} totalQuizzes={totalQuizzes} />}
    {type === "question" && <TagQuestion id={id} totalQuestions={totalQuestions} />}
  </Container>);
}

export default TagContents;