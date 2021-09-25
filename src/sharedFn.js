import { disableDarkMode, enableDarkMode } from "./apollo"

export const MoveTopScreen = () => {
  return window.scrollTo({
    behavior: "smooth",
    top: 0
  })
}

export const onCLickDarkMode = (darkMode) => {
  if (darkMode === true) {
    disableDarkMode()
  } else if (darkMode === false) {
    enableDarkMode()
  }
}

export const processUserLevel = (type, score) => {
  if (type === "student") {
    if (score < 200) {
      return 1
    } else if (score < 500) {
      return 2
    } else if (score < 1000) {
      return 3
    } else if (score < 1600) {
      return 4
    } else if (score < 2300) {
      return 5
    } else if (score < 3300) {
      return 6
    } else if (score < 5000) {
      return 7
    } else if (score < 7000) {
      return 8
    } else if (score < 10000) {
      return 9
    } else {
      return 10
    }
  }
  if (type === "teacher") {
    if (score < 20) {
      return 1
    } else if (score < 60) {
      return 2
    } else if (score < 140) {
      return 3
    } else if (score < 300) {
      return 4
    } else if (score < 620) {
      return 5
    } else if (score < 1240) {
      return 6
    } else if (score < 2520) {
      return 7
    } else if (score < 5080) {
      return 8
    } else if (score < 10200) {
      return 9
    } else {
      return 10
    }
  }
}

export const processNextLevelScore = (type, level, score) => {
  if (type === "student") {
    if (level === 1) {
      return 200 - score
    } else if (level === 2) {
      return 500 - score
    } else if (level === 3) {
      return 1000 - score
    } else if (level === 4) {
      return 1600 - score
    } else if (level === 5) {
      return 2300 - score
    } else if (level === 6) {
      return 3300 - score
    } else if (level === 7) {
      return 5000 - score
    } else if (level === 8) {
      return 7000 - score
    } else if (level === 9) {
      return 10000 - score
    }
  }
  if (type === "teacher") {
    if (level === 1) {
      return 20 - score
    } else if (level === 2) {
      return 60 - score
    } else if (level === 3) {
      return 140 - score
    } else if (level === 4) {
      return 300 - score
    } else if (level === 5) {
      return 620 - score
    } else if (level === 6) {
      return 1240 - score
    } else if (level === 7) {
      return 2520 - score
    } else if (level === 8) {
      return 5080 - score
    } else if (level === 9) {
      return 10200 - score
    }
  }
}

export const getCreatedDay = (createdAt) => {
  const createDay = new Date(parseInt(createdAt))
  var year = createDay.getFullYear();
  var month = ('0' + (createDay.getMonth() + 1)).slice(-2);
  var day = ('0' + createDay.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}

export const compare = (key) => {
  return (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0))
}

export const compareDesc = (key) => {
  return (a, b) => (a[key] < b[key] ? 1 : (a[key] > b[key] ? -1 : 0))
}

export const compareNickname = () => {
  return (a, b) => (a["nickname"] < b["nickname"] ? -1 : (a["nickname"] > b["nickname"] ? 1 : 0))
}