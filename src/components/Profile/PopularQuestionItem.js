import { useMutation } from '@apollo/client';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const ContentItem = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  svg {
    color: tomato;
    margin-right: 10px;
  }
  .contentTitle{
    cursor: pointer;
  }
`

const UPDATE_HIT_MUTATION = gql`
  mutation updateHit($id: Int!, $type: String!) {
    updateHit(id: $id, type: $type) {
      ok
      error
    }
  }
`

const PopularQuestionItem = ({ id, question, likes, index }) => {
  const history = useHistory()
  const update = (cache, result) => {
    const { data: { updateHit: { ok } } } = result
    if (ok) {
      const QuestionId = `Question:${parseInt(id)}`
      cache.modify({
        id: QuestionId,
        fields: {
          hits(prev) {
            return prev + 1
          }
        }
      })
      history.push(`/detail/question/${id}`)
    }
  }
  const [updateHit] = useMutation(UPDATE_HIT_MUTATION, {
    variables: {
      type: "question",
      id
    },
    update
  })
  const onClickTitle = () => {
    updateHit()
  }
  return (<ContentItem>
    <div className="contentTitle" onClick={onClickTitle}>
      {index + 1}. {question.length > 10 ? `${question.substring(0, 10)}...` : question}
    </div>
    <div className="contentLikes"><FontAwesomeIcon icon={faHeart} />{likes}</div>
  </ContentItem>);
}

export default PopularQuestionItem;