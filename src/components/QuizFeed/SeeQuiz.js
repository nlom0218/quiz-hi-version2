import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import QuizFeedContainer from './QuizFeedContainer';
import QuizList from './QuizList';
import SelectTags from './SelectTags';
import queryString from "query-string"
import useParameter from '../../hooks/useParameter';

const SEE_QUIZ_QUERY = gql`
  query seeQuiz($seeType: String!, $page: Int!, $search: String, $sort: String!, $tags: String) {
    seeQuiz(seeType: $seeType, page: $page, search: $search, sort: $sort, tags: $tags) {
     totalNum
     quiz {
      id
      title
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
      questionNum
      isLiked
      likes
      hits
      createdAt
      }
    }
  }
`

const SeeQuiz = ({ feedType }) => {
  const { seeType, sort, page } = useParams()
  const query = useParameter()
  const search = query.get("search")
  const [putQuiz, setPutQuiz] = useState(true)
  const [tagsArr, setTagsArr] = useState(JSON.parse(localStorage.getItem("searchTag")) || [])
  const [lastPage, setLastPage] = useState(null)
  useEffect(() => {
    return () => setPutQuiz(false)
  }, [])
  const onCompleted = (data) => {
    if (data.seeQuiz.totalNum === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(data.seeQuiz.totalNum / 10)) {
      setLastPage(data.seeQuiz.totalNum / 10)
      return
    }
    const lastPage = Math.floor(data.seeQuiz.totalNum / 10) + 1
    setLastPage(lastPage)
  }
  const { data, loading, refetch } = useQuery(SEE_QUIZ_QUERY, {
    variables: {
      seeType,
      sort,
      page: parseInt(page),
      ...(search && { search }),
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
      <QuizList
        {...data}
        loading={loading}
        setPutQuiz={setPutQuiz}
      />
    </QuizFeedContainer>
  );
}

export default SeeQuiz;