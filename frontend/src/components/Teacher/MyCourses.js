import {Link} from 'react-router-dom'
import Sidebar from "./Sidebar"
import {useState, useEffect} from 'react'
import axios from 'axios'
const baseURL="http://127.0.0.1:8000/api"

function MyCourses() {
  const [courseData, setCourseData] = useState([]);

  const teacherId=localStorage.getItem('teacherId')
  console.log(teacherId)
  // Fetch courses on page load
  useEffect(()=>{
    try{
      axios.get(baseURL + '/teacher-courses/' + teacherId).then(response=>{
        setCourseData(response.data)
      })
    }
    catch(error){
      console.log(error)
    }
  }, []);


  return (
    <div className="container mt-4">
      <div className="row">
          <aside className="col-md-3">
            <Sidebar />
          </aside>
          <section className="col-md-9">
            <div className="card">
              <h5 className="card-header">My Courses</h5>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Enrolled</th>
                        <th>Rating</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courseData.map((course,index)=>
                      <tr>
                        <td><Link to={"/course-chapters/" + course.id}>{course.title}</Link></td>
                        <td><img src={course.featured_img} width='80' className="rounded" alt={course.title} /></td>
                        <td><Link to={"/teacher-enrolled-students/" + course.id}>{course.total_enrolled_students}</Link></td>
                        <td>{course.course_rating ? `${course.course_rating}/5` : "No ratings yet"}</td>
                        <td>
                          <Link className='btn btn-info btn-sm me-2' to={ "/teacher-edit-course/" + course.id }>Edit</Link>
                          <Link className='btn btn-success btn-sm me-2' to={ "/teacher-add-chapter/" + course.id }>Add Chapter</Link>
                          <button className="btn btn-danger btn-sm">Delete</button>
                        </td>
                      </tr>
                      )}
                    </tbody>
                  </table>
                </div>
            </div>
          </section>
      </div>
    </div>


    )
}

export default MyCourses;
