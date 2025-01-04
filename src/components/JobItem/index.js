import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <li className="jobs-list-item">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="job-company-logo-and-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-company-logo"
          />
          <div className="job-title-and-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="job-rating">
              <BsFillStarFill className="job-rating-icon" />
              <p className="job-rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-location-employment-and-salary-container">
          <div className="job-location-and-employment-type-container">
            <div className="icon-and-text-container">
              <IoLocationSharp className="icon" />
              <p className="text">{location}</p>
            </div>
            <div className="icon-and-text-container">
              <MdWork className="icon" />
              <p className="text">{employmentType}</p>
            </div>
          </div>
          <p className="job-salary">{packagePerAnnum}</p>
        </div>
        <hr className="job-seperator" />
        <h1 className="job-description-title">Description</h1>
        <p className="job-description-text">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobItem
