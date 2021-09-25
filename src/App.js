import React from 'react';
import { darkTheme, GlobalStyle, lightTheme } from './styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './pages/Home';
import { ThemeProvider } from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import { darkModeVar, isLoggedInVar } from './apollo';
import Login from './pages/Login';
import PlayQuiz from "./pages/PlayQuiz"
import CreateAccount from './pages/CreateAccount';
import ScrollToTop from './hooks/ScrollToTop';
import Feed from './pages/Feed';
import MakeQuiz from './pages/MakeQuiz';
import Profile from './pages/Profile';
import useUser from './hooks/useUser';
import NotFound from './pages/NotFound';
import FeedQuiz from './pages/FeedQuiz';
import FeedQuestion from './pages/FeedQuestion';
import FeedTag from './pages/FeedTag';
import Edit from './pages/Edit';
import Delete from './pages/Delete';
import Library from './pages/Library';
import LibraryMakeQuiz from './pages/LibraryMakeQuiz';
import StudentNotFound from './pages/StudentNotFound';
import PasswordReset from './pages/PasswordReset';

function App() {
  const darkMode = useReactiveVar(darkModeVar)
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const user = useUser()
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme} >
      <GlobalStyle fontFamily={user ? user?.fontFamily : "'Noto Sans KR', sans-serif"} />
      <Router>
        <ScrollToTop />
        {user?.type !== "student" ? <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/feed/:type/:seeType/:sort/:page">{isLoggedIn ? <Feed /> : <NotFound />}</Route>
          <Route exact path="/detail/quiz/:id">{isLoggedIn ? <FeedQuiz /> : <NotFound />}</Route>
          <Route exact path="/detail/question/:id">{isLoggedIn ? <FeedQuestion /> : <NotFound />}</Route>
          <Route exact path="/detail/tag/:id/:type/:sort/:page">{isLoggedIn ? <FeedTag /> : <NotFound />}</Route>
          <Route exact path="/make-quiz">{isLoggedIn ? <MakeQuiz /> : <NotFound />}</Route>
          <Route exact path="/play-quiz">{isLoggedIn ? <PlayQuiz /> : <NotFound />}</Route>
          <Route exact path="/library/:type/:page">{isLoggedIn ? <Library /> : <NotFound />}</Route>
          <Route exact path="/library/make-quiz">{isLoggedIn ? <LibraryMakeQuiz /> : <NotFound />}</Route>
          <Route exact path="/profile/:username/:mode/:state/:type/:page">{isLoggedIn ? <Profile /> : <NotFound />}</Route>
          <Route exact path="/profile/:username/:mode">{isLoggedIn ? <Profile /> : <NotFound />}</Route>
          <Route exact path="/edit/:type/:id">{isLoggedIn ? <Edit /> : <NotFound />}</Route>
          <Route exact path="/delete/:type/:id">{isLoggedIn ? <Delete /> : <NotFound />}</Route>
          <Route exact path="/login">{!isLoggedIn ? <Login /> : <NotFound />}</Route>
          <Route exact path="/create-account">{!isLoggedIn ? <CreateAccount /> : <NotFound />}</Route>
          <Route exact path="/password-reset">{!isLoggedIn ? <PasswordReset /> : <NotFound />}</Route>
          <Route><NotFound /></Route>
        </Switch>
          :
          <Switch>
            <Route exact path="/profile/:username/:mode">{isLoggedIn ? <Profile /> : <NotFound />}</Route>
            <Route><StudentNotFound /></Route>
          </Switch>
        }
      </Router>
    </ThemeProvider >
  );
}

export default App;
