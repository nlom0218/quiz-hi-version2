import { faChalkboardTeacher, faChild, faMale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import HomeLayout from './HomeLayout';

const Box = styled.div`
  grid-row: 2 / 3;
  background-color: rgb(39, 179, 192, 0.2);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  box-shadow: 0px 17px 6px -14px rgba(0,0,0,0.2);
`

const Wapper = styled.div`
  display: grid;
  grid-template-rows: 1.2fr 2fr;
  justify-items: center;
  transition: background-color 0.3s linear;
  :hover {
    background-color: rgb(39, 179, 192, 0.4);
  }
`

const Icon = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  svg {
    font-size: 30px;
    margin-bottom: 20px;
  }

`

const Description = styled.div`
  align-self: flex-start;
  padding: 30px;
  line-height: 30px;
`

const AccountType = () => {
  return (
    <HomeLayout
      className="accountLayout"
      layout="accountLayout"
      title="Account Type"
      msg="Which of the three types are you?"
      left={true}
    >
      <Box>
        <Wapper>
          <Icon><FontAwesomeIcon icon={faChalkboardTeacher} />선생님</Icon>
          <Description>
            선생님 계정은 QUIZ HI에서 제공하는 모든 컨텐츠를 사용할 수 있습니다.
            또한 학생 계정을 생성하여 학생들에게 퀴즈를 보낼 수 있습니다.
          </Description>
        </Wapper>
        <Wapper>
          <Icon><FontAwesomeIcon icon={faChild} />학생</Icon>
          <Description>
            학생 계정은 선생님 계정을 통해서 생성할 수 있습니다.
            학생들은 선생님이 봬는 퀴즈를 풀 수 있으며 얻은 점수로 레벨을 올릴 수 있습니다.
          </Description>
        </Wapper>
        <Wapper>
          <Icon><FontAwesomeIcon icon={faMale} />일반인</Icon>
          <Description>
            일반인 계정은 일부 컨텐츠가 제한이 되며 학생 계정을 생성할 수 없습니다.
            프로필에서 이메일을 인증하면 선생님 계정으로 변경 가능합니다.
          </Description>
        </Wapper>
      </Box>
    </HomeLayout>
  );
}

export default AccountType;