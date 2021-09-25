import { faBook, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';


const SSeeType = styled.div`
  width: 100%;
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: auto auto 1fr;
  animation: ${fadeIn} 0.4s linear;
`

const Wrapper = styled.div`
  justify-self: flex-start;
  display: flex;
  margin-right: 20px;
  opacity: ${props => props.selected ? 1 : 0.6};
  cursor: pointer;
  transition: opacity 0.3s linear;
`

const SeeText = styled.div`
  margin-left: 5px;
`

const SeeType = ({ seeType }) => {
  const location = useLocation()
  const { type } = useParams()
  const history = useHistory()
  const onClickSeeType = (seeType) => {
    history.push(`/feed/${type}/${seeType}/recent/1${location.search}`)
  }
  return (<SSeeType>
    <Wrapper selected={seeType === "all"} onClick={() => onClickSeeType("all")}>
      <FontAwesomeIcon icon={faBook} />
      <SeeText>전체보기</SeeText>
    </Wrapper>
    <Wrapper selected={seeType === "tags"} onClick={() => onClickSeeType("tags")}>
      <FontAwesomeIcon icon={faTags} />
      <SeeText>태그별 보기</SeeText>
    </Wrapper>
  </SSeeType>);
}

export default SeeType;