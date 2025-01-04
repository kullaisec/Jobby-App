import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const renderEmploymentTypeCheckboxes = (
  addEmploymentType,
  removeEmploymentType,
) => {
  const onChangeEmploymentType = event => {
    if (event.target.checked === true) {
      addEmploymentType(event.target.value)
    } else {
      removeEmploymentType(event.target.value)
    }
  }
  return (
    <ul className="employment-types-list-container">
      {employmentTypesList.map(eachItem => (
        <li
          className="employment-types-list-item"
          key={eachItem.employmentTypeId}
        >
          <input
            type="checkbox"
            className="list-item-checkbox"
            id={eachItem.employmentTypeId}
            value={eachItem.employmentTypeId}
            onChange={onChangeEmploymentType}
          />
          <label
            htmlFor={eachItem.employmentTypeId}
            className="list-item-label"
          >
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )
}

const renderSalaryRangeRadios = changeMinimumPackage => {
  const onChangeSalaryRange = event => {
    changeMinimumPackage(event.target.value)
  }

  return (
    <ul className="salary-ranges-list-container">
      {salaryRangesList.map(eachItem => (
        <li className="salary-ranges-list-item" key={eachItem.salaryRangeId}>
          <input
            type="radio"
            className="list-item-radio"
            id={eachItem.salaryRangeId}
            value={eachItem.salaryRangeId}
            name="salary-range"
            onChange={onChangeSalaryRange}
          />
          <label htmlFor={eachItem.salaryRangeId} className="list-item-label">
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )
}

const FiltersGroup = props => {
  const {addEmploymentType, removeEmploymentType, changeMinimumPackage} = props
  return (
    <div className="filters-group-container">
      <h1 className="filters-group-heading">Type of Employment</h1>
      {renderEmploymentTypeCheckboxes(addEmploymentType, removeEmploymentType)}
      <hr className="filters-group-seperator" />
      <h1 className="filters-group-heading">Salary Range</h1>
      {renderSalaryRangeRadios(changeMinimumPackage)}
    </div>
  )
}

export default FiltersGroup
