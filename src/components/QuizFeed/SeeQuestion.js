import React, { useEffect, useState } from 'react';
import QuizFeedContainer from './QuizFeedContainer';
import QuestionList from './QuestionList';
import SelectTags from './SelectTags';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import useParameter from '../../hooks/useParameter';

const SEE_QUESTION_QUERY = gql`
  query seeQuestion($seeType: String!, $page: Int!, $search: String, $sort: String!, $tags: String) {
    seeQuestion(seeType: $seeType, page: $page, search: $search, sort: $sort, tags: $tags) {
      totalNum
      question {
        id
        question
        user {
          id
          nickname
          avatarURL
          username
        }
        tags {
          id
          name
        }
        type
        isLiked
        likes
        hits
        createdAt
      }
    }
  }
`


const SeeQuestion = ({ feedType }) => {
  const { seeType, sort, page } = useParams()
  const query = useParameter()
  const search = query.get("search")
  const [putQuiz, setPutQuiz] = useState(true)
  const [tagsArr, setTagsArr] = useState(JSON.parse(localStorage.getItem("searchTag")) || [])
  const [lastPage, setLastPage] = useState(1)
  useEffect(() => {
    return () => setPutQuiz(false)
  }, [])
  const onCompleted = (data) => {
    if (data.seeQuestion.totalNum === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(data.seeQuestion.totalNum / 10)) {
      setLastPage(data.seeQuestion.totalNum / 10)
      return
    }
    const lastPage = Math.floor(data.seeQuestion.totalNum / 10) + 1
    setLastPage(lastPage)
  }
  const { data, loading, refetch } = useQuery(SEE_QUESTION_QUERY, {
    variables: {
      seeType,
      sort,
      page: parseInt(page),
      ...(search !== "" && { search }),
      ...(tagsArr.length !== 0 && { tags: tagsArr.join(",") })
    },
    onCompleted
  })
  return (
    <QuizFeedContainer
      feedType={feedType}
      sort={sort}
      setPutQuiz={setPutQuiz}
      page={parseInt(page)}
      lastPage={lastPage}
      tagsArr={tagsArr}
      seeType={seeType}
    >
      {seeType === "tags" && <SelectTags setTagsArr={setTagsArr} tagsArr={tagsArr} refetch={refetch} />}
      <QuestionList
        {...data}
        loading={loading}
        setPutQuiz={setPutQuiz}
      />
    </QuizFeedContainer>
  );
}

export default SeeQuestion;