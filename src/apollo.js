import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from 'apollo-upload-client'
import { useHistory } from "react-router";

const DARK = "dark"
const TOKEN = "token"
const QUIZBASKET = "quizBasket"

export const homeworkQuizIdVar = makeVar(localStorage.getItem("homeworkQuizId") || null)
export const setHomeworkQuizId = (id) => {
  homeworkQuizIdVar(id)
}

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK)))
export const enableDarkMode = () => {
  localStorage.setItem(DARK, "true")
  darkModeVar(true)
}
export const disableDarkMode = () => {
  localStorage.removeItem(DARK)
  darkModeVar(false)
}

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)))
export const logInUser = (token) => {
  localStorage.setItem(TOKEN, token)
  isLoggedInVar(true)
}
export const logOutUser = () => {
  localStorage.clear()
  window.location.reload()
  isLoggedInVar(false)
}

const httpLink = createUploadLink({
  uri: process.env.NODE_ENV === "production"
    ? "https://quiz-hi-backend.herokuapp.com/graphql"
    : "http://localhost:4000/graphql",
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN) || ""
    }
  }
})


export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {

    }
  })
})