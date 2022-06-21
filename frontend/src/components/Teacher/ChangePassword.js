import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
const baseURL='http://127.0.0.1:8000/api';

function ChangePassword() {
  const [teacherData, setTeacherData] = useState({
    'password': ''
  })

  const teacherId = localStorage.getItem('teacherId')

  function handleChange(event){
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event){
    const teacherFormData = new FormData();
    teacherFormData.append("password", teacherData.password)
    try {
      axios.post(baseURL + '/teacher/change-password/' + teacherId + '/', teacherFormData).then((response)=>{
        if (response.status === 200) {
        alert("Profile has been updated")
        window.location.href='/teacher-logout'
      }});
    }
    catch(error){
      console.log(error)
      setTeacherData({'status': 'error'})
    }
    }

  
  return (
    <div className="container mt-4">
      <div className="row">
          <aside className="col-md-3">
            <Sidebar />
          </aside>
          <section className="col-md-9">
            <div className="card">
              <h5 className="card-header">Change Password</h5>
                <div className="card-body">
                <div class="mb-3 row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">New Password</label>
                  <div class="col-sm-10">
                    <input onChange={handleChange} type="password" value={teacherData.password} name="password" class="form-control" id="inputPassword" />
                  </div>
                </div>
                <hr />
                <button onClick={handleSubmit} className="btn btn-primary">Update</button>
              </div>
            </div>
          </section>
      </div>
    </div>


    )
}

export default ChangePassword;
