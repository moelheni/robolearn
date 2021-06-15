
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import FirstQuiz from './pages/FirstQuiz';
import EndQuiz from './pages/EndQuiz';

import SpeQuiz from './pages/SpeQuiz';

import PostExploration from './pages/PostExploration'
import QaPhase from "./pages/QaPhase";
import PreExplorationIntro from "./pages/PreExplorationIntro";
import PreExplorationOutro from "./pages/PreExplorationOutro";
import Exploration from "./pages/Exploration";
import PostExplorationIntroFinished from "./pages/PostExplorationIntroFinished";
import Intro from "./pages/Intro";
import UserContext from "./context/UserContext";
import { useEffect, useState } from "react";
import Home from "./pages/Home";

function App() {
  const [user, updateUser] = useState({
    identified: false
  })
  const setUser = (u) => {
    updateUser({
      ...user,
      ...u
    })
  }
  const [notLogin, setNotLogin] = useState(false)
  useEffect(() => {
    if (user) {
      window.localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  useEffect(() => {
    const savedUser = window.localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      setNotLogin(true)
    }
  }, [])
  return (
    <div>
      <UserContext.Provider value={{user, setUser}}>
        <Router>
          {
            notLogin &&
            <Redirect to="/" />
          }
          <Switch>
          <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/intro">
              <Intro />
            </Route>
            <Route path="/first-quiz/:id">
              <FirstQuiz />
            </Route>

            <Route exact path="/spe-quiz/:id">
              <SpeQuiz />
            </Route>

            <Route path="/spe-quiz/:id/:exploration">
              <SpeQuiz />
            </Route>

            <Route path="/end-quiz">
              <EndQuiz />
            </Route>

            <Route path="/qa-phase/:id/:nextTopic">
              <QaPhase />
            </Route>

            <Route path="/pre-exploration-intro/:id">
              <PreExplorationIntro />
            </Route>

            <Route path="/pre-exploration-outro/:id">
              <PreExplorationOutro />
            </Route>

            <Route path="/exploration/:id">
              <Exploration />
            </Route>

            <Route path="/post-exploration/:id">
              <PostExploration />
            </Route>

            <Route path="/post-exploration-finished/:id">
              <PostExplorationIntroFinished />
            </Route>
            
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
