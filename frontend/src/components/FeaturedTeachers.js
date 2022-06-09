import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

const baseURL='http://127.0.0.1:8000/api';
function FeaturedTeachers() {
  const [teacher, setTeacher] = useState(null);
  useEffect(()=> {
    axios.get(baseURL + '/teacher/').then((response) => {
      setTeacher(response.data)
    })
  }, [])
  console.log(teacher);
  return (
    <div className="container mt-4">
      <h3 className="pb-1 mb-4">Featured Teachers</h3>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <Link to="/teacher-detail/1"> <img src="Passport_photo.jpg" className="card-img-top" alt="Teacher image" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <a href="#"> <img src="Passport_photo.jpg" className="card-img-top" alt="Course image" /></a>
            <div className="card-body">
              <h5 className="card-title"><a href="#">Course title</a></h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <a href="#"> <img src="Passport_photo.jpg" className="card-img-top" alt="Course image" /></a>
            <div className="card-body">
              <h5 className="card-title"><a href="#">Course title</a></h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <a href="#"> <img src="Passport_photo.jpg" className="card-img-top" alt="Course image" /></a>
            <div className="card-body">
              <h5 className="card-title"><a href="#">Course title</a></h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1"> <img src="Passport_photo.jpg" className="card-img-top" alt="Course image" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <a href="#"> <img src="Passport_photo.jpg" className="card-img-top" alt="Course image" /></a>
            <div className="card-body">
              <h5 className="card-title"><a href="#">Course title</a></h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <a href="#"> <img src="Passport_photo.jpg" className="card-img-top" alt="Course image" /></a>
            <div className="card-body">
              <h5 className="card-title"><a href="#">Course title</a></h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <a href="#"> <img src="Passport_photo.jpg" className="card-img-top" alt="Course image" /></a>
            <div className="card-body">
              <h5 className="card-title"><a href="#">Course title</a></h5>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <nav aria-label="Page navigation example mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default FeaturedTeachers
