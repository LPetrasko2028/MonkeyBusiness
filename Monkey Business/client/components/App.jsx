import React from 'react'
import { Route, Routes, Switch, BrowserRouter as Router, useLocation } from 'react-router-dom'
import MyNavBar from './Navigation/MyNavBar.jsx'
import Home from './Home/HomePage.jsx'
import MonkeTech from './MonkeyTech/MonkeyTechPage.jsx'
import IntroPage from './Intro/IntroPage.jsx'
import SettingsPage from './Setting/SettingsPage.jsx'
import StatsPage from './Stat/StatsPage.jsx'
import { MySearchBar } from './SearchPage/MySearchBar.jsx'
import LoginCard from './Login_Signup/LoginRegisterForm.jsx'
import SignUpCard from './Login_Signup/SignUpRegisterForm.jsx'
import tPage from './Tut/TutorialPage.jsx'
import Error from './Error/Error.jsx'
import ResetPassword from './ResetPassword/ResetPassword.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import ForgotPassword from './ForgotPassword/ForgotPassword.jsx'

export default function App () {
  const location = useLocation()
  const { hash, pathname, search } = location
  const [darkMode, setDarkMode] = React.useState(false)
  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  const [username, setUsername] = React.useState('')
  const [logInStatus, setLogInStatus] = React.useState(false)
  function onLogInChange (username) {
    setUsername(username)
    setLogInStatus(true)
  }

  const theme = (darkMode ? 'dark' : 'light')
  document.getElementById('html').setAttribute('data-bs-theme', darkMode ? 'dark' : 'light')
  //-------------------------------------------------------------
  const accessKey = search.substring(11, search.length)
  return (
    <React.Fragment>
      <div data-bs-theme={theme}>
        <MyNavBar
          loggedIn={logInStatus}
          mode={theme}
          data-bs-theme={theme}
          handleTheme={handleDarkMode}
          isDark={darkMode}
          setLogInStatus={setLogInStatus}
        />
        <div className="container-fluid" style={{ marginTop: '1rem' }} />
        <div className="mx-5">
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home theme={theme} name={username} status={logInStatus} />
            }
          />
          <Route
            path="/login"
            element={<LoginCard onLogIn={onLogInChange} />}
          />
          <Route path="/about" Component={IntroPage} />
          <Route
            path="/signup"
            element={<SignUpCard onSignUp={onLogInChange} />}
          />
          <Route
            path="/monkeyTech"
            element={<MonkeTech status={logInStatus} />}
          />
          <Route
            path="/setting"
            element={
              <SettingsPage
                name={username}
                setLogIn={setLogInStatus}
                setName={setUsername}
              ></SettingsPage>
            }
          />
          <Route path="/stats" Component={StatsPage} />
          <Route path="/search" Component={MySearchBar} />
          <Route path="/TutorialPage" Component={tPage} />
          <Route
            path="/resetPassword"
            element={
              <ResetPassword accessKey={accessKey} darkMode={darkMode} />
            }
          ></Route>

          <Route
            path="/forgotPassword"
            element={<ForgotPassword darkMode={darkMode} />}
          />

          <Route path="*" Component={Error} />
        </Routes>
        </div>
      </div>
    </React.Fragment>
  )
}
/*
Pathname: <b>{pathname}</b><br />
Search params: <b>{search}</b><br />
Hash: <b>{hash}</b>
*/
