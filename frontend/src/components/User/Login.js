import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
const baseURL='http://127.0.0.1:8000/api'


function Login() {
  useEffect(()=>{
    document.title="Student Login"
  })

  const [studentLoginData, setStudentLoginData]=useState ({
    'email': '',
    'password': ''
  })

  const [errorMsg,setErrorMsg]=useState('');

  function handleChange(event){
    setStudentLoginData({
      ...studentLoginData,
      [event.target.name] : event.target.value
    })
  }

  function handleSubmit(event){
    const studentFormData = new FormData();
    studentFormData.append('email', studentLoginData.email)
    studentFormData.append('password', studentLoginData.password)
    try {
      axios.post(baseURL + '/student-login/', studentFormData).then((response)=>
      {console.log(response.data)
        if(response.data.bool == true){
          localStorage.setItem("studentLoginStatus", true)
          localStorage.setItem("studentId", response.data.studentId)
          window.location.href='/student-dashboard'
      }
      else {
        setErrorMsg("Invalid Email or Password")
      }
    })}
    catch(error){
      console.log(error)
    }
  }

  const studentLoginStatus=localStorage.getItem('studentLoginStatus')
  if (studentLoginStatus == "true"){
    window.location.href='/student-dashboard'
  }

  return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="card">
              <h5 className="card-header">Student Login</h5>
              <div className="card-body">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
                <form>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={handleChange} value={studentLoginData.email} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={handleChange} value={studentLoginData.password} name="password" type="password" className="form-control" id="exampleInputPassword1" />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                  </div>
                  <button onClick={handleSubmit} type="button" className="btn btn-primary">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Login;
