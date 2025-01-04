import {BsFillStarFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    rating,
    location,
  } = jobDetails
  return (
    <li className="similar-jobs-list-item">
      <div>
        <div className="similar-jobs-item-company-logo-and-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-jobs-item-company-logo"
          />
          <div className="similar-jobs-item-title-and-rating-container">
            <h1 className="similar-jobs-item-title">{title}</h1>
            <div className="similar-jobs-item-rating">
              <BsFillStarFill className="similar-jobs-item-rating-icon" />
              <p className="similar-jobs-item-rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="similar-jobs-item-description">
          <h1 className="similar-jobs-item-description-title">Description</h1>
          <p className="similar-jobs-item-description-text">{jobDescription}</p>
        </div>
      </div>
      <div className="similar-jobs-item-location-and-employment-type-container">
        <div className="similar-jobs-item-icon-and-text-container">
          <IoLocationSharp className="similar-jobs-item-icon" />
          <p className="similar-jobs-item-icon-text">{location}</p>
        </div>
        <div className="similar-jobs-item-icon-and-text-container">
          <MdWork className="similar-jobs-item-icon" />
          <p className="similar-jobs-item-icon-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
