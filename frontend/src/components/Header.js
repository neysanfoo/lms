import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
const baseURL="http://127.0.0.1:8000/api"

function Header() {
  const [searchData, setSearchData] = useState({
    'search': '',
  });

  function handleChange(event){
    setSearchData({
      ...searchData,
      [event.target.name]: event.target.value
    })
  }
  
  function handleSearch(){
    const param = searchData.search.trim()
    if (param.length > 0)
    {
      window.location.href='/search/' + param
    }
      
  }
  const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus=localStorage.getItem('studentLoginStatus')
  let teacherDropdownOptions
  let studentDropdownOptions
  if (teacherLoginStatus) {
    teacherDropdownOptions = (
    <>
      <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
      <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li>
    </>
    )
  }
  else {
    teacherDropdownOptions = (
    <>
      <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
      <li><Link className="dropdown-item" to="/teacher-register">Register</Link></li>
    </>
    )
  }

  if (studentLoginStatus) {
    studentDropdownOptions = (
    <>
      <li><Link className="dropdown-item" to="/student-dashboard">Dashboard</Link></li>
      <li><Link className="dropdown-item" to="/student-logout">Logout</Link></li>
    </>
    )
  }
  else {
    studentDropdownOptions = (
    <>
      <li><Link className="dropdown-item" to="/student-login">Login</Link></li>
      <li><Link className="dropdown-item" to="/student-register">Register</Link></li>
    </>
    )
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">LMS</Link>
        <div className="search">
            <input onChange={handleChange} value={searchData.search} type="text" className="search-input" placeholder="Search" name="search" />
            <div onClick={handleSearch} className="search-icon">
              <i class="bi bi-search"></i>
            </div>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">Home</Link>
            <a className="nav-link" href="#">Courses</a>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Teacher
              </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {teacherDropdownOptions}
              </ul>

            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Student
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {studentDropdownOptions}
              </ul>

            </li>


          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
