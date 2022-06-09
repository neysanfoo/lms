import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

const baseURL='http://127.0.0.1:8000/api/student/';

function Register() {
  useEffect(() => {
    document.title='Student Register'
  })

  const [studentData, setStudentData] = useState({
    'full_name': '',
    'email': '',
    'username': '',
    'password': '',
    'interests': '',
    'status': ''
  });


  function handleChange(event){
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event){
    const studentFormData = new FormData();
    studentFormData.append("full_name", studentData.full_name)
    studentFormData.append("email", studentData.email)
    studentFormData.append("username", studentData.username)
    studentFormData.append("password", studentData.password)
    studentFormData.append("interests", studentData.interests)
    try {
      axios.post(baseURL, studentFormData).then((response)=>{
        window.location.href='/student-login'
        setStudentData({
          'full_name': '',
          'email': '',
          'username': '',
          'password': '',
          'interests': '',
          'status': 'success'
        });
      });
    }
    catch(error){
      console.log(error)
      setStudentData({'status': 'error'})
    }}

  const studentLoginStatus=localStorage.getItem('studentLoginStatus')
  if (studentLoginStatus == "true"){
    window.location.href='/student-dashboard'
  }
  
  return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 offset-3">
          {studentData.status == "success" && <p className='text-success'>Successfully Registered</p>}
          {!studentData.status == "error" && <p className='text-danger'>Account did not register please try again.</p>}
            <div className="card">
              <h5 className="card-header">User Register</h5>
              <div className="card-body">
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Full Name</label>
                    <input onChange={handleChange} value={studentData.full_name} name="full_name" type="text" className="form-control" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input onChange={handleChange} value={studentData.email} name="email" type="email" className="form-control" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Username</label>
                    <input onChange={handleChange} value={studentData.username} name="username" type="text" className="form-control" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={handleChange} value={studentData.password} name="password" type="password" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Interests</label>
                    <textarea onChange={handleChange} value={studentData.interests} name="interests" className="form-control"></textarea>
                    <div id="emailHelp" class="form-text">Math, economics, chemistry, etc.</div>
                  </div>
                  <button onClick={handleSubmit} type="button" className="btn btn-primary">Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Register;
