import {Link,useParams} from 'react-router-dom'
import Sidebar from "./Sidebar"
import {useState, useEffect} from 'react'
import axios from 'axios'
const baseURL="http://127.0.0.1:8000/api"

function MyUsers() {
  const [studentData, setStudentData] = useState([]);
  const teacherId = localStorage.getItem('teacherId')
  // Fetch student on page load
  useEffect(()=>{
    try{
      axios.get(baseURL + '/fetch-all-enrolled-students/' + teacherId).then(response=>{
        setStudentData(response.data)
      })
    }
    catch(error){
      console.log(error)
    }
  }, []);
  console.log(studentData)


  return (
    <div className="container mt-4">
      <div className="row">
          <aside className="col-md-3">
            <Sidebar />
          </aside>
          <section className="col-md-9">
            <div className="card">
              <h5 className="card-header">Full Student List</h5>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Interests</th>
                        <th>Course Enrolled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.map((row,index)=>
                      <tr>
                        <td>{row.student.username}</td>
                        <td>{row.student.email}</td>
                        <td>{row.student.interests}</td>
                        <td>{row.course.title}</td>
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

export default MyUsers;
