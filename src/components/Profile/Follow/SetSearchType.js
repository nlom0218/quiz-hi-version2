import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
`

const TypeList = styled.ul`
  display: flex;
  justify-content: space-around;
`

const TypeItem = styled.li`
  svg {
    cursor: pointer;
  }
`

const SetSearchType = ({ setType, type, setPage }) => {
  const onClickType = (type) => {
    setType(type)
    setPage(1)
  }
  return (<Container>
    <div style={{ fontWeight: "600" }}>검색 유형</div>
    <TypeList>
      <TypeItem>
        <FontAwesomeIcon icon={type === "follower" ? faCheckCircle : faCircle}
          onClick={() => onClickType("follower")}
        /> 팔로워
      </TypeItem>
      <TypeItem>
        <FontAwesomeIcon icon={type === "following" ? faCheckCircle : faCircle}
          onClick={() => onClickType("following")}
        /> 팔로잉
      </TypeItem>
      <TypeItem>
        <FontAwesomeIcon icon={type === "all" ? faCheckCircle : faCircle}
          onClick={() => onClickType("all")}
        /> 모든 사용자
      </TypeItem>
    </TypeList>
  </Container>);
}

export default SetSearchType;