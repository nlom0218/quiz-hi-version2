import { useQuery } from '@apollo/client';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import { compare } from '../../../sharedFn';
import HomeworkQuizItem from './HomeworkQuizItem';
import HomeworkSubmitBtn from './HomeworkSubmitBtn';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`

const QuizTitle = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  display: grid;
  grid-template-columns: 30px 1fr;
`

const HomeworkQuizList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
`

const Savemsg = styled.div`
  margin-left: 180px;
  color: tomato;
  text-align: center;
  animation: ${fadeIn} 0.6s ease;
`

const DETATIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
      order
      questions {
        id
        type
        question
        answer
        distractor
        hint
        image
        user {
          nickname
        }
      }
    }
  }
`

const SolveHomework = ({ quizId, complete, setComplete, setNoQuiz }) => {
  useEffect(() => {
    if (complete === false) {
      refetch()
    }
  }, [])
  useEffect(() => {
    window.scrollBy({
      top: 400,
      behavior: "smooth"
    })
  }, [complete])
  const [change, setChange] = useState(false)
  const [saveMsg, setSaveMsg] = useState(undefined)
  const [homeworkQuiz, setHomeworkQuiz] = useState(JSON.parse(localStorage.getItem("homeworkQuiz")) || [])
  const onCompleted = () => {
    if (data.detailQuiz === null) {
      setNoQuiz(true)
      return
    }
    setNoQuiz(false)
    const orderArr = JSON.parse(data.detailQuiz.order)
    const scoreArr = JSON.parse(localStorage.getItem("homeworkScore"))
    const quizList = data.detailQuiz.questions.map((item, index) => {
      const questionScore = scoreArr.filter((scoreArrItem) => scoreArrItem.id === item.id)[0] || null
      return {
        id: item.id,
        order: (orderArr ?
          orderArr.findIndex(id => id === item.id) + 1
          :
          index + 1),
        type: item.type,
        question: item.question,
        answer: item.answer,
        distractor: item.distractor,
        hint: item.hint,
        image: item.image,
        author: item.user.nickname,
        ...(questionScore && { score: questionScore.score })
      }
    }).sort(compare("order"))
    localStorage.setItem("homeworkQuiz", JSON.stringify(quizList))
    setHomeworkQuiz(quizList)
    setComplete(true)
  }
  const { data, loading, refetch } = useQuery(DETATIL_QUIZ_QUERY, {
    variables: { id: parseInt(quizId) },
    skip: !quizId,
    onCompleted
  })
  return (<Container>
    {complete && <React.Fragment>
      <QuizTitle>
        <FontAwesomeIcon icon={faBook} />
        <div>{data?.detailQuiz?.title}</div>
      </QuizTitle>
      <HomeworkQuizList>
        {homeworkQuiz.filter((item) => item.score).map((item, index) => {
          return <HomeworkQuizItem question={item} key={index} index={index} setChange={setChange} />
        })}
        {saveMsg && <Savemsg>{saveMsg}</Savemsg>}
        <HomeworkSubmitBtn setSaveMsg={setSaveMsg} quizTitle={data?.detailQuiz?.title} />
      </HomeworkQuizList>
    </React.Fragment>
    }
  </Container>);
}

export default SolveHomework;