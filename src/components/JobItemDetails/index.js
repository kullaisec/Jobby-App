import {Component} from 'react'
import Cookies from 'js-cookie'

import {HiExternalLink} from 'react-icons/hi'
import {BsFillStarFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import FailureView from '../FailureView'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobsList: [],
    fetchStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({fetchStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const jobDetails = data.job_details
      const formattedJobDetails = {
        id: jobDetails.id,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        title: jobDetails.title,
        rating: jobDetails.rating,
        location: jobDetails.location,
        employmentType: jobDetails.employment_type,
        packagePerAnnum: jobDetails.package_per_annum,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
      }

      const similarJobsList = data.similar_jobs
      const formattedSimilarJobsList = similarJobsList.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
      }))

      this.setState({
        jobDetails: formattedJobDetails,
        similarJobsList: formattedSimilarJobsList,
        fetchStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        fetchStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl = '',
      title = '',
      rating = '',
      location = '',
      employmentType = '',
      packagePerAnnum = '',
      jobDescription = '',
      lifeAtCompany = {},
      skills = [],
      companyWebsiteUrl = '',
    } = jobDetails

    return (
      <div className="job-details-container">
        <div className="job-details-company-logo-and-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="job-details-company-logo"
          />
          <div className="job-details-title-and-rating-container">
            <h1 className="job-details-title">{title}</h1>
            <div className="job-details-rating">
              <BsFillStarFill className="job-rating-icon" />
              <p className="job-details-rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-location-employment-and-salary-container">
          <div className="job-details-location-and-employment-type-container">
            <div className="job-details-icon-and-text-container">
              <IoLocationSharp className="job-details-icon" />
              <p className="job-details-icon-text">{location}</p>
            </div>
            <div className="job-details-icon-and-text-container">
              <MdWork className="job-details-icon" />
              <p className="job-details-icon-text">{employmentType}</p>
            </div>
          </div>
          <p className="job-details-salary">{packagePerAnnum}</p>
        </div>
        <hr className="job-details-seperator" />
        <div className="job-details-description">
          <div className="job-details-description-title-and-website-link-container">
            <h1 className="job-details-description-title">Description</h1>
            <a
              className="job-details-icon-and-text-container website-link"
              href={companyWebsiteUrl}
            >
              <p className="job-details-icon-text website-link-text">Visit</p>
              <HiExternalLink className="job-details-icon website-link-icon" />
            </a>
          </div>
          <p className="job-details-description-text">{jobDescription}</p>
        </div>
        <div className="job-details-skills">
          <h1 className="job-details-skills-title">Skills</h1>
          <ul className="job-details-skills-list-container">
            {skills.map(eachItem => (
              <li className="skills-list-item" key={eachItem.name}>
                <img
                  className="skills-list-item-img"
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                />
                <p className="skills-list-item-name">{eachItem.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="job-details-life-at-company">
          <h1 className="job-details-life-at-company-title">Life at Company</h1>
          <div className="job-details-life-at-company-img-and-text-container">
            <p className="job-details-life-at-company-text">
              {lifeAtCompany.description}
            </p>
            <img
              className="job-details-life-at-company-img"
              src={lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
      </div>
    )
  }

  renderSuccessView = () => {
    const {similarJobsList} = this.state
    return (
      <div className="job-details-and-similar-jobs-container">
        {this.renderJobDetails()}
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list-container">
            {similarJobsList.map(eachItem => (
              <SimilarJobItem jobDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => <FailureView onClickRetry={this.getJobDetails} />

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
    return (
      <>
        <Header />
        <div className="job-details-page-container">{this.renderView()}</div>
      </>
    )
  }
}

export default JobItemDetails
