import React from 'react';
import styled from 'styled-components';
import useUser from '../../../hooks/useUser';
import FollowSearch from './FollowSearch';
import SeeFollower from './SeeFollower';
import SeeFollowing from './SeeFollowing';

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
  row-gap: 60px;
  align-items: flex-start;
`

const DivisionLine = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  background-color: rgb(200, 200, 200, 0.6);
  transition: background-color 1s ease;
`

const ProfileFollow = ({ id, totalFollow, totalFollowing }) => {
  const user = useUser()
  const allowAccess = () => {
    if (!user) {
      return false
    } else {
      if (user.id === id) {
        return true
      } else {
        return false
      }
    }
  }
  return (<Container>
    <SeeFollower userId={id} totalFollower={totalFollow} />
    <SeeFollowing userId={id} totalFollowing={totalFollowing} />
    {allowAccess() && <React.Fragment>
      <DivisionLine></DivisionLine>
      <FollowSearch userId={id} />
    </React.Fragment>}
  </Container>);
}

export default ProfileFollow;