import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faHome, faMoon, faPaperPlane, faRedoAlt, faSignInAlt, faSun, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  margin-top: 40px;
  grid-gap: 20px;
`

const Title = styled.div`
`

const Description = styled.div`
  margin-top: 20px;
  padding-left: 20px;
  line-height: 25px;
`

const Emphasis = styled.div`
  margin-top: 20px;
  padding-left: 20px;
  line-height: 25px;
  color: rgb(255, 99, 80);
  font-weight: 600;
`

const CreateAccountQuestion = () => {
  return (<Container>
    <div>
      <Title>1. 가입 유형을 선택하세요.</Title>
      <Description>선생님, 일반인 중 하나를 선택하세요.</Description>
      <Emphasis>학생 계정은 선생님의 계정을 통해 생성할 수 있습니다.</Emphasis>
    </div>
    <div>
      <Title>2. 이메일을 인증하세요.</Title>
      <Description>선생님 계정을 선택한 경우 추가적으로 이메일을 인증해야 합니다.</Description>
      <Description>사용하는 이메일을 입력한 후 옆의 버튼을 누르면 바로 아래에 인증숫자 입력폼이 나타납니다.</Description>
      <Emphasis>인증숫자를 정확히 입력을 해야 맨 아래의 회원가입 버튼이 활성화 됩니다.</Emphasis>
      <Description>
        <FontAwesomeIcon icon={faPaperPlane} /> 입력한 이메일로 인증번호가 전송됩니다.
      </Description>
      <Description>
        확인 인증번호를 확인합니다.
      </Description>
      <Description>
        <FontAwesomeIcon icon={faCheck} /> 인증이 성공된 상태입니다.
      </Description>
      <Description>
        <FontAwesomeIcon icon={faTimes} /> 인증이 실패된 상태입니다.
      </Description>
      <Description>
        <FontAwesomeIcon icon={faRedoAlt} /> 인증을 다시 시도합니다.
      </Description>
    </div>
    <div>
      <Title>3. 아이디와 비밀번호를 입력하세요.</Title>
      <Description>아이디와 비밀번호를 입력하면 회원가입 버튼이 활성화 되고 버튼을 누르면 로그인 화면으로 이동합니다.</Description>
      <Emphasis>아이디 및 비밀번호에 오류가 있을 경우 화면 아래에 메세지가 나타납니다.</Emphasis>
      <Description>
        <FontAwesomeIcon icon={faEye} /> 비밀번호가 보여진 상태입니다.
      </Description>
      <Description>
        <FontAwesomeIcon icon={faEyeSlash} /> 비밀번호가 가려진 상태입니다.
      </Description>
    </div>
    <div>
      <Title>• 네비게이션 아이콘</Title>
      <Description>
        <FontAwesomeIcon icon={faHome} /> 시작화면으로 돌아갑니다.(홈화면)
      </Description>
      <Description>
        <FontAwesomeIcon icon={faMoon} /> 다크모드로 바뀝니다.
      </Description>
      <Description>
        <FontAwesomeIcon icon={faSun} /> 라이트모드로 바뀝니다.
      </Description>
    </div>
  </Container>);
}

export default CreateAccountQuestion;