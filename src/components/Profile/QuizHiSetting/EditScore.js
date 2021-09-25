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

const ScoreList = styled.div`
  background-color: ${props => props.theme.bgColor};
  padding: 20px;
  border-radius: 5px;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 20px;
  transition: background-color 1s ease;
`

const Score = styled.div``

const SaveMsg = styled.div`
  justify-self: center;
  color: tomato;
  font-weight: 600;
  animation: ${fadeIn} 0.4s linear;
`

const EDIT_HOME_SETTING_MUTATION = gql`
  mutation EditHomeSettingMutation($goldenbellScore: Int, $cooperationScore: Int $username: String!, $type: String!) {
    editHomeSetting(goldenbellScore: $goldenbellScore, cooperationScore: $cooperationScore, username: $username, type: $type) {
      ok
      error
    }
  }
`

const EditScore = ({ goldenbellScore, setGoldenbellScore, cooperationScore, setCooperationScore, username, id }) => {
  const [saveMsg, setSaveMsg] = useState(undefined)
  const update = (cache, result) => {
    const { data: { editHomeSetting: { ok } } } = result
    if (ok) {
      const UserId = `User:${id}`
      cache.modify({
        id: UserId,
        fields: {
          goldenbellScore() { return goldenbellScore },
          cooperationScore() { return cooperationScore }
        }
      })
      setSaveMsg("골든벨, 협동 모드 점수가 수정 되었습니다.")
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
        type: "score",
        goldenbellScore,
        cooperationScore
      }
    })
  }
  const processGoldenBellScore = (score) => {
    if (score === goldenbellScore) {
      return true
    } else {
      return false
    }
  }
  const processCooperationScore = (score) => {
    if (score === cooperationScore) {
      return true
    } else {
      return false
    }
  }
  const onClickGoldenBellBtn = (score) => {
    setGoldenbellScore(score)
  }
  const onClickCooperationBtn = (score) => {
    setCooperationScore(score)
  }
  return (<EditProfileBox>
    <EditForm onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <div className="edit_title">골든벨 모드 점수 설정</div>
        <div>골든벨을 울린 학생들에게 부여하는 점수를 설정합니다.</div>
        <ScoreList>
          {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((item, index) => {
            return <Score key={index}>
              <FontAwesomeIcon
                onClick={() => onClickGoldenBellBtn(item)}
                icon={processGoldenBellScore(item) ? faCheckCircle : faCircle}
              /> {item}점
          </Score>
          })}
        </ScoreList>
      </Wrapper>
      <Wrapper>
        <div className="edit_title">협동 모드 점수 설정</div>
        <div>협동 모드에서 목표 점수를 넘기면 부여하는 점수를 설정합니다.</div>
        <div>학생 개인의 최종 점수: 개인 점수 + 협동 모드 점수</div>
        <ScoreList>
          {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((item, index) => {
            return <Score key={index}>
              <FontAwesomeIcon
                onClick={() => onClickCooperationBtn(item)}
                icon={processCooperationScore(item) ? faCheckCircle : faCircle}
              /> {item}점
          </Score>
          })}
        </ScoreList>
      </Wrapper>
      {saveMsg && <SaveMsg>{saveMsg}</SaveMsg>}
      <SaveBtn type="submit"
        value={loading ? "저장중..." : "저장하기"}
      />
    </EditForm>
  </EditProfileBox>);
}

export default EditScore;