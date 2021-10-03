import React from 'react';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';

const Msg = styled.div`
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  padding-top: 30px;
  color: tomato;
`

const NoDataMsg = ({ content }) => {
  const user = useUser()
  return (<Msg>
    {user?.type === "teacher" ?
      `라이브러리에 저장된 ${content}가 없습니다.`
      :
      "라이브러리는 선생님 계정에서만 이용가능합니다."
    }
  </Msg>);
}

export default NoDataMsg;