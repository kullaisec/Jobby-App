import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import FiltersGroup from '../FiltersGroup'
import FailureView from '../FailureView'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    employmentTypeSelectedList: [],
    minimumPackage: '',
    searchInput: '',
    fetchStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  addEmploymentType = id => {
    const {employmentTypeSelectedList} = this.state
    this.setState(
      {
        employmentTypeSelectedList: [...employmentTypeSelectedList, id],
      },
      this.getJobsList,
    )
  }

  removeEmploymentType = id => {
    const {employmentTypeSelectedList} = this.state
    const filteredList = employmentTypeSelectedList.filter(
      eachItem => eachItem !== id,
    )
    this.setState(
      {
        employmentTypeSelectedList: filteredList,
      },
      this.getJobsList,
    )
  }

  changeMinimumPackage = id => {
    this.setState(
      {
        minimumPackage: id,
      },
      this.getJobsList,
    )
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickSearch = () => {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({
      fetchStatus: apiStatusConstants.inProgress,
    })
    const {employmentTypeSelectedList, minimumPackage, searchInput} = this.state
    const employmentType = employmentTypeSelectedList.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobsList = data.jobs
      const formattedJobsList = jobsList.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        title: eachItem.title,
        rating: eachItem.rating,
        location: eachItem.location,
        employmentType: eachItem.employment_type,
        packagePerAnnum: eachItem.package_per_annum,
        jobDescription: eachItem.job_description,
      }))

      this.setState({
        jobsList: formattedJobsList,
        fetchStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        fetchStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-text">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachItem => (
          <JobItem jobDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => <FailureView onClickRetry={this.getJobsList} />

  renderInProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderView = () => {
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

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="jobs-container">
            <div className="profile-and-filters-group-container">
              <div className="jobs-mobile-search-container">
                <input
                  className="search-input"
                  type="search"
                  onChange={this.onChangeSearchInput}
                  placeholder="Search"
                />
                <button
                  className="search-btn"
                  type="button"
                  onClick={this.onClickSearch}
                  data-testid="searchButton"
                >
                  <BsSearch className="search-btn-icon" />
                </button>
              </div>
              <Profile />
              <FiltersGroup
                addEmploymentType={this.addEmploymentType}
                removeEmploymentType={this.removeEmploymentType}
                changeMinimumPackage={this.changeMinimumPackage}
              />
            </div>
            <div className="jobs-search-and-list-container">
              <div className="jobs-laptop-search-container">
                <input
                  className="search-input"
                  type="search"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                  placeholder="Search"
                />
                <button
                  className="search-btn"
                  type="button"
                  onClick={this.onClickSearch}
                  data-testid="searchButton"
                >
                  <BsSearch className="search-btn-icon" />
                </button>
              </div>
              {this.renderView()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
