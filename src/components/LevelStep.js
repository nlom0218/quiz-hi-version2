import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  text-align: center;
`

const Icon = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
`

const Level = styled.div``

const LevelStep = ({ level }) => {
  const LevelIcon = (level) => {
    if (level === 1) {
      return "🥚"
    } else if (level === 2) {
      return "🐣"
    } else if (level === 3) {
      return "🐥"
    } else if (level === 4) {
      return "🥉"
    } else if (level === 5) {
      return "🥈"
    } else if (level === 6) {
      return "🥇"
    } else if (level === 7) {
      return "🏅"
    } else if (level === 8) {
      return "🎖"
    } else if (level === 9) {
      return "⭐️"
    } else if (level === 10) {
      return "🌈"
    }
  }
  return (<Layout>
    <Icon>{LevelIcon(level)}</Icon>
    <Level>Level {level}</Level>
  </Layout>);
}

export default LevelStep;