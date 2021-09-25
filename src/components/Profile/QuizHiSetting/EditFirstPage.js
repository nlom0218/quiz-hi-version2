import { useMutation } from '@apollo/client';
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import EditProfileBox from '../Edit/EditProfileBox';
import SaveBtn from '../Edit/SaveBtn';

const EditForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  svg {
    margin-right: 10px;
    cursor: pointer;
  }
  .edit_title {
    font-weight: 600;
  }
`

const PageList = styled.div`
  background-color: ${props => props.theme.bgColor};
  padding: 20px;
  border-radius: 5px;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 20px;
  transition: background-color 1s ease;
`

const SaveMsg = styled.div`
  justify-self: center;
  color: tomato;
  font-weight: 600;
  animation: ${fadeIn} 0.4s linear;
`

const EDIT_HOME_SETTING_MUTATION = gql`
  mutation EditHomeSettingMutation($homeSetting: String, $username: String!, $type: String!) {
    editHomeSetting(homeSetting: $homeSetting, username: $username, type: $type) {
      ok
      error
    }
  }
`

const EditFirstPage = ({ firstPage, setFirstPage, username, id, type }) => {
  const [saveMsg, setSaveMsg] = useState(undefined)
  const update = (cache, result) => {
    const { data: { editHomeSetting: { ok } } } = result
    if (ok) {
      const UserId = `User:${id}`
      cache.modify({
        id: UserId,
        fields: {
          firstPage() { return firstPage }
        }
      })
      setSaveMsg("로그인 후 첫 페이지가 수정 되었습니다.")
    }
  }
  const [editHomeSetting, { loading }] = useMutation(EDIT_HOME_SETTING_MUTATION, {
    update
  })
  const { handleSubmit } = useForm()
  const onSubmit = () => {
    if (loading) {
      return
    }
    editHomeSetting({
      variables: {
        username,
        type: "firstPage",
        homeSetting: firstPage
      }
    })
  }
  const onClickpage = (page) => {
    setFirstPage(page)
  }
  const processFirstpage = (page) => {
    if (firstPage === page) {
      return true
    } else {
      return false
    }
  }
  return (<EditProfileBox>
    <EditForm onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <div className="edit_title">QUIZ HI 첫 페이지 설정</div>
        <div className="sub_msg">로그인 후 첫 페이지를 설정합니다.</div>
        <PageList>
          <div><FontAwesomeIcon
            onClick={() => onClickpage("/")}
            icon={processFirstpage("/") ? faCheckCircle : faCircle} />홈</div>
          {type === "teacher" && <React.Fragment>
            <div><FontAwesomeIcon
              onClick={() => onClickpage("/feed/quiz/all/recent/1")}
              icon={processFirstpage("/feed/quiz/all/recent/1") ? faCheckCircle : faCircle} />피드</div>
            <div><FontAwesomeIcon
              onClick={() => onClickpage("/library/quiz/1")}
              icon={processFirstpage("/library/quiz/1") ? faCheckCircle : faCircle} />라이브러리</div>
          </React.Fragment>}
          <div><FontAwesomeIcon
            onClick={() => onClickpage("/make-quiz")}
            icon={processFirstpage("/make-quiz") ? faCheckCircle : faCircle} />퀴즈 만들기</div>
          <div><FontAwesomeIcon
            onClick={() => onClickpage("/play-quiz")}
            icon={processFirstpage("/play-quiz") ? faCheckCircle : faCircle} />퀴즈 진행하기</div>
          <div><FontAwesomeIcon
            onClick={() => onClickpage(`/profile/${username}/info`)}
            icon={processFirstpage(`/profile/${username}/info`) ? faCheckCircle : faCircle} />프로필</div>
        </PageList>
      </Wrapper>
      {saveMsg && <SaveMsg>{saveMsg}</SaveMsg>}
      <SaveBtn type="submit" value={"저장하기"} />
    </EditForm>
  </EditProfileBox>);
}

export default EditFirstPage;