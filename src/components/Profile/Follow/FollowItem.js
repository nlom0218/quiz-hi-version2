import { faLockOpen, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';

const Container = styled.div`
  padding: 20px 10px;
  display: grid;
  grid-template-columns: 40px 1fr auto;
  column-gap: 10px;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
  align-items: center;
  animation: ${fadeIn} 0.6 ease;
  :hover {
    background-color: ${props => props.theme.bgColor};
  }
`

const Avatar = styled.div`
  justify-self: center;
  svg {
    font-size: 24px;
  }
  cursor: pointer;
`

const AvatarImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`

const Nickname = styled.div`
  cursor: pointer;
  justify-self: flex-start;
`

const UserType = styled.span`
  margin-left: 10px;
  font-size: 14px;
  opacity: 0.8;
`

const QuizQuestionNum = styled.div`
  justify-self: flex-end;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 5px;
  font-size: 14px;
  margin-right: 10px;
`

const FollowItem = ({ username, avatarURL, nickname, type, totalPublicQuiz, totalPublicQuestion }) => {
  const history = useHistory()
  const processType = () => {
    if (type === "teacher") {
      return "선생님"
    } else if (type === "student") {
      return "학생"
    } else if (type === "nomal") {
      return "일반인"
    }
  }
  const processNum = (num) => {
    if (num < 1000) {
      return num
    } else {
      return `${Math.floor(num / 1000)}k`
    }
  }
  const onClickNickname = () => {
    history.push(`/profile/${username}/info`)
  }
  return (<Container>
    <Avatar onClick={onClickNickname}>
      {avatarURL ?
        <AvatarImage src={avatarURL} /> :
        <div>
          <FontAwesomeIcon icon={faUser} />
        </div>
      }
    </Avatar>
    <Nickname onClick={onClickNickname}>
      {nickname.length > 8 ? `${nickname.substring(0, 8)}...` : nickname}
      <UserType>
        ({processType()})
      </UserType>
    </Nickname>
    {type === "teacher" && <QuizQuestionNum>
      <FontAwesomeIcon icon={faLockOpen} />
      <div>퀴즈{processNum(totalPublicQuiz)}</div>
      <div>문제{processNum(totalPublicQuestion)}</div>
    </QuizQuestionNum>}
  </Container>);
}

export default FollowItem;