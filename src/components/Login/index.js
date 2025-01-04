import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  onLogin = event => {
    event.preventDefault()
    this.submitLoginDetails()
  }

  submitLoginDetails = async () => {
    const {history} = this.props
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({errorMsg, showErrorMsg: true})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-card">
          <div className="card-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="card-logo"
            />
          </div>
          <form onSubmit={this.onLogin}>
            <label className="card-input-label" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              className="card-input-field"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label className="card-input-label" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              className="card-input-field"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button type="submit" className="card-login-btn">
              Login
            </button>
            {showErrorMsg && (
              <p className="card-login-error-msg">*{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
