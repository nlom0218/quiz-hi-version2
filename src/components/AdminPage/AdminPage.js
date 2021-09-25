import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
`

const Bar = styled.div`
  display: flex;
  justify-content: space-around;
`

const List = styled.div`
  svg {
    cursor: pointer;
  }
`

const AdminPage = () => {
  const history = useHistory()
  const { mode } = useParams()
  const onClickList = (mode) => {
    history.push(`/admin/${mode}`)
  }
  return (<Container>
    <Bar>
      <List>
        <FontAwesomeIcon
          icon={mode === "user" ? faCheckCircle : faCircle}
          onClick={() => onClickList("user")} /> 사용자
      </List>
      <List>
        <FontAwesomeIcon
          icon={mode === "msg" ? faCheckCircle : faCircle}
          onClick={() => onClickList("msg")} /> 신고메시지
      </List>
    </Bar>
    {mode === "user" && <div>user</div>}
    {mode === "msg" && <div>msg</div>}
  </Container>);
}

export default AdminPage;