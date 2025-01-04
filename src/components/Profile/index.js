import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profileDetails: {},
    fetchStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  onClickRetry = () => {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({fetchStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const formattedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: formattedProfileDetails,
        fetchStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        fetchStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {name = '', profileImageUrl = '', shortBio = ''} = profileDetails
    return (
      <>
        <div className="profile-container">
          <img className="profile-img" src={profileImageUrl} alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-short-bio">{shortBio}</p>
        </div>
        <hr className="profile-seperator" />
      </>
    )
  }

  renderFailureView = () => (
    <div className="profile-failure-view-container">
      <button
        type="button"
        className="profile-failure-view-btn"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderInProgressView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }
}

export default Profile
