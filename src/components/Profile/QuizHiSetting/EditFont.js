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

const FontList = styled.div`
  background-color: ${props => props.theme.bgColor};
  padding: 20px;
  border-radius: 5px;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  transition: background-color 1s ease;
`

const Font = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
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

const EditFont = ({ setFontFamily, fontFamily, username, id }) => {
  const [saveMsg, setSaveMsg] = useState(undefined)
  const update = (cache, result) => {
    const { data: { editHomeSetting: { ok } } } = result
    if (ok) {
      const UserId = `User:${id}`
      cache.modify({
        id: UserId,
        fields: {
          fontFamily() { return fontFamily }
        }
      })
      setSaveMsg("QUIZ HI 폰트가 수정 되었습니다.")
    }
  }
  const [editHomeSetting, { loading }] = useMutation(EDIT_HOME_SETTING_MUTATION, {
    update
  })
  const { handleSubmit } = useForm()
  const onClickFont = (font) => {
    setFontFamily(font)
  }
  const onSubmit = () => {
    if (loading) {
      return
    }
    editHomeSetting({
      variables: {
        username,
        type: "fontFamily",
        homeSetting: fontFamily
      }
    })
  }
  const processFont = (font) => {
    if (font === fontFamily) {
      return true
    } else {
      return false
    }
  }
  return (<EditProfileBox>
    <EditForm onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <div className="edit_title">QUIZ HI 폰트 설정</div>
        <FontList>
          <Font style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            <div><FontAwesomeIcon
              onClick={() => onClickFont("'Noto Sans KR', sans-serif")}
              icon={processFont("'Noto Sans KR', sans-serif") ? faCheckCircle : faCircle} />기본</div>
            <div>가나다라마바사아자차카타파하123456ABCDEabcde</div>
          </Font>
          <Font style={{ fontFamily: "'Nanum Myeongjo', serif" }}>
            <div><FontAwesomeIcon
              onClick={() => onClickFont("'Nanum Myeongjo', serif")}
              icon={processFont("'Nanum Myeongjo', serif") ? faCheckCircle : faCircle} />명조</div>
            <div>가나다라마바사아자차카타파하123456ABCDEabcde</div>
          </Font>
          <Font style={{ fontFamily: "'Nanum Gothic', sans-serif" }}>
            <div><FontAwesomeIcon
              onClick={() => onClickFont("'Nanum Gothic', sans-serif")}
              icon={processFont("'Nanum Gothic', sans-serif") ? faCheckCircle : faCircle} />고딕</div>
            <div>가나다라마바사아자차카타파하123456ABCDEabcde</div>
          </Font>
          <Font style={{ fontFamily: "'Gowun Batang', serif" }}>
            <div><FontAwesomeIcon
              onClick={() => onClickFont("'Gowun Batang', serif")}
              icon={processFont("'Gowun Batang', serif") ? faCheckCircle : faCircle} />바탕</div>
            <div>가나다라마바사아자차카타파하123456ABCDEabcde</div>
          </Font>
          <Font style={{ fontFamily: "'Hahmlet', serif" }}>
            <div><FontAwesomeIcon
              onClick={() => onClickFont("'Hahmlet', serif")}
              icon={processFont("'Hahmlet', serif") ? faCheckCircle : faCircle} />햄릿</div>
            <div>가나다라마바사아자차카타파하123456ABCDEabcde</div>
          </Font>
        </FontList>
      </Wrapper>
      {saveMsg && <SaveMsg>{saveMsg}</SaveMsg>}
      <SaveBtn type="submit" value={loading ? "저장중..." : "저장하기"} />
    </EditForm>
  </EditProfileBox>);
}

export default EditFont;