import {Link,useParams} from 'react-router-dom'
import Sidebar from "./Sidebar"
import {useState, useEffect} from 'react'
import axios from 'axios'
const baseURL="http://127.0.0.1:8000/api"

function EnrolledStudents() {
  const [studentData, setStudentData] = useState([]);

  const {course_id} = useParams();

  // Fetch student on page load
  useEffect(()=>{
    try{
      axios.get(baseURL + '/fetch-enrolled-students/' + course_id).then(response=>{
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
              <h5 className="card-header">My Students</h5>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.map((row,index)=>
                      <tr>
                        <td><Link to={"/view-student/" + row.student.id}>{row.student.username}</Link></td>
                        <td>{row.student.email}</td>
                        <td>
                          <Link className='btn btn-info btn-sm me-2' to={ "/"}>View</Link>
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

export default EnrolledStudents;
