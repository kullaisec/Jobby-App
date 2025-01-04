import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-page-container">
      <div className="home-container">
        <h1 className="home-page-heading">Find The Job That Fits Your Life</h1>
        <p className="home-page-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="home-page-find-jobs-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
