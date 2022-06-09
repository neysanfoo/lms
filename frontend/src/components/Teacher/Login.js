import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
const baseURL='http://127.0.0.1:8000/api'

function Login() {
  useEffect(()=>{
    document.title="Teacher Login"
  })

  const [teacherLoginData, setTeacherLoginData]=useState ({
    'email': '',
    'password': ''
  })

  const [errorMsg,setErrorMsg]=useState('');

  function handleChange(event){
    setTeacherLoginData({
      ...teacherLoginData,
      [event.target.name] : event.target.value
    })
  }

  function handleSubmit(event){
    const teacherFormData = new FormData();
    teacherFormData.append('email', teacherLoginData.email)
    teacherFormData.append('password', teacherLoginData.password)
    try {
      axios.post(baseURL + '/teacher-login/', teacherFormData).then((response)=>
      {console.log(response.data)
        if(response.data.bool == true){
        localStorage.setItem("teacherLoginStatus", true)
        localStorage.setItem("teacherId", response.data.teacherId)
        window.location.href='/teacher-dashboard'
      }
      else {
        setErrorMsg("Invalid Email or Password")
      }
    }
    )
    }
    catch(error){
      console.log(error)
    }
  }

  const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
  if (teacherLoginStatus == "true"){
    window.location.href='/teacher-dashboard'
  }

  return (

      <div className="form--container--login mt-4">
      <div className="title">Teacher Login</div>
      {errorMsg && <p className="text-danger">{errorMsg}</p>}
      <div className="content">
        <form>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Email</span>
              <input onChange={handleChange} value={teacherLoginData.email} name="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input onChange={handleChange} value={teacherLoginData.password} name="password" type="password" placeholder="Enter your password" required />
            </div>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Remember Me</label>
          </div>
          <button onClick={handleSubmit} type="button" className="register--button">Login</button>
        </form>
      </div>
    </div>
    )
}

export default Login;
