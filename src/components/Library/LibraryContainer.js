import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
import { LibraryFeedBottomContainerGsap } from '../../hooks/Gsap';
import LibraryLeftContent from './LibraryLeftContent';
gsap.registerPlugin(ScrollTrigger)

const SLibraryContainer = styled.div`
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 30px;
`

const TopBar = styled.div`
  margin-top: 30px;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  gap: 30px;
`

const ContentsNum = styled.div`
  grid-column: 1 / 2;
  align-self: flex-end;
  svg {
    margin-right: 10px;
  }
`

const PageBar = styled.div`
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

const LibarayContainer = ({ children, loading, totalNum, lastPage, quiz, setPutQuiz }) => {
  const { page, type } = useParams()
  const history = useHistory()
  const onClickPageBtn = (btn) => {
    if (btn === "pre") {
      if (parseInt(page) === 1) {
        return
      } else {
        history.push(`/library/${type}/${parseInt(page) - 1}`)
      }
    } else if (btn === "next") {
      if (lastPage === parseInt(page)) {
        return
      } else {
        history.push(`/library/${type}/${parseInt(page) + 1}`)
      }
    }
  }
  return (
    <SLibraryContainer className="libraryContainer">
      <LibraryFeedBottomContainerGsap />
      {loading ? "loading..." :
        <React.Fragment>
          <TopBar>
            <ContentsNum>
              <FontAwesomeIcon icon={quiz ? faBook : faBookOpen} />{totalNum}개의 퀴즈
            </ContentsNum>
            <PageBar>
              <PageBarBtn firstPage={parseInt(page) === 1 ? true : false} onClick={() => onClickPageBtn("pre")}>이전</PageBarBtn>
              <PageBarBtn lastPage={lastPage === parseInt(page)} onClick={() => onClickPageBtn("next")}>다음</PageBarBtn>
            </PageBar>
          </TopBar>
          {children}
          <LibraryLeftContent setPutQuiz={setPutQuiz} />
        </React.Fragment>
      }
    </SLibraryContainer>
  );
}

export default LibarayContainer;