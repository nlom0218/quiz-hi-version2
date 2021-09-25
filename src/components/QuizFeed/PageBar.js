import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import styled from 'styled-components';

const SPageBar = styled.div`
  justify-self: flex-end;
  align-self: flex-end;
  border: 1px solid rgb(200, 200, 200, 0.6);
  border-radius: 5px;
  display: flex;
  position: relative;
`

const PageBarBtn = styled.div`
  padding: 8px 20px;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
  :first-child {
    border-right: 1px solid rgb(200, 200, 200, 0.6);
    opacity: ${props => props.firstPage ? "0.4" : "1"};
    cursor: ${props => props.firstPage ? "not-allowd" : "pointer"};
  }
  :nth-child(2) {
    opacity: ${props => props.lastPage ? "0.4" : "1"};
    cursor: ${props => props.lastPage ? "not-allowd" : "pointer"};
  }
`

const PageBar = ({ lastPage }) => {
  let { type, seeType, sort, page, id, state, username } = useParams()
  page = parseInt(page)
  const location = useLocation()
  const history = useHistory()
  const onClickPageBtn = (btn) => {
    if (seeType) {
      if (btn === "pre") {
        if (page === 1) {
          return
        }
        if (location.search === "") {
          history.push(`/feed/${type}/${seeType}/${sort}/${page - 1}`)
        } else {
          history.push(`/feed/${type}/${seeType}/${sort}/${page - 1}${location.search}`)
        }
      } else if (btn === "next") {
        if (lastPage === page) {
          return
        }
        if (location.search === "") {
          history.push(`/feed/${type}/${seeType}/${sort}/${page + 1}`)
        } else {
          history.push(`/feed/${type}/${seeType}/${sort}/${page + 1}${location.search}`)
        }
      }
    } else if (state) {
      if (btn === "pre") {
        if (page === 1) { return }
        history.push(`/profile/${username}/quizQuestion/${state}/${type}/${page - 1}`)
      } else if (btn === "next") {
        if (lastPage === page) { return }
        history.push(`/profile/${username}/quizQuestion/${state}/${type}/${page + 1}`)
      }
    } else {
      if (btn === "pre") {
        if (page === 1) { return }
        history.push(`/detail/tag/${id}/${type}/${sort}/${page - 1}`)
      } else if (btn === "next") {
        if (lastPage === page) { return }
        history.push(`/detail/tag/${id}/${type}/${sort}/${page + 1}`)
      }
    }
  }
  return (
    <SPageBar>
      <PageBarBtn firstPage={page === 1 ? true : false} onClick={() => onClickPageBtn("pre")}>이전</PageBarBtn>
      <PageBarBtn lastPage={lastPage === page} onClick={() => onClickPageBtn("next")}>다음</PageBarBtn>
    </SPageBar>);
}

export default PageBar;