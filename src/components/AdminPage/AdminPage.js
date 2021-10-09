import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import AdminComplain from './AdminComplain/AdminComplain';
import AdminSuggestion from './AdminSuggestion/AdminSuggestion';
import AdminUser from './AdminUser/AdminUser';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
`

const TopContents = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
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
    <TopContents>
      <div style={{ fontWeight: "600" }}><FontAwesomeIcon icon={faUserShield} /> 관리자 페이지</div>
      <Bar>
        <List>
          <FontAwesomeIcon
            icon={mode === "user" ? faCheckCircle : faCircle}
            onClick={() => onClickList("user")} /> 사용자
      </List>
        <List>
          <FontAwesomeIcon
            icon={mode === "msg" ? faCheckCircle : faCircle}
            onClick={() => onClickList("msg")} /> 퀴즈 / 문제 신고
      </List>
        <List>
          <FontAwesomeIcon
            icon={mode === "sug" ? faCheckCircle : faCircle}
            onClick={() => onClickList("sug")} /> 건의사항
      </List>
      </Bar>
    </TopContents>
    {mode === "user" && <AdminUser />}
    {mode === "msg" && <AdminComplain />}
    {mode === "sug" && <AdminSuggestion />}
  </Container>);
}

export default AdminPage;