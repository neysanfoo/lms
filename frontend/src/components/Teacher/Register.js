import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

const baseURL='http://127.0.0.1:8000/api/teacher/';

function Register() {

  useEffect(() => {
    document.title='Teacher Register'
  })

  const [teacherData, setTeacherData] = useState({
    'full_name': '',
    'email': '',
    'password': '',
    'qualification': '',
    'mobile_no': '',
    'bio': '',
    'status': ''
  })

  function handleChange(event){
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event){
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name)
    teacherFormData.append("email", teacherData.email)
    teacherFormData.append("password", teacherData.password)
    teacherFormData.append("qualification", teacherData.qualification)
    teacherFormData.append("mobile_no", teacherData.mobile_no)
    teacherFormData.append("bio", teacherData.bio)
    try {
      axios.post(baseURL, teacherFormData).then((response)=>{
        window.location.href='/teacher-login'
        setTeacherData({
          'full_name': '',
          'email': '',
          'password': '',
          'qualification': '',
          'mobile_no': '',
          'bio': '',
          'status': 'success'
        });
      });
    }
    catch(error){
      console.log(error)
      setTeacherData({'status': 'error'})
    }
    }

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if (teacherLoginStatus == "true"){
      window.location.href='/teacher-dashboard'
    }
  return (
      <div className="form--container mt-4">
      <div className="title">Teacher Registration</div>
      {teacherData.status == "success" && <p className='text-success'>Successfully Registered</p>}
      {!teacherData.status == "error" && <p className='text-danger'>Account did not register please try again.</p>}
      <div className="register--content">
        <form>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Full Name</span>
              <input onChange={handleChange} value={teacherData.full_name} name="full_name" type="text" placeholder="Enter your name" required />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input onChange={handleChange} value={teacherData.email} name="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input onChange={handleChange} value={teacherData.password} name="password" type="password" placeholder="Enter your password" required />
            </div>
            <div className="input-box">
              <span className="details">Qualification</span>
              <input onChange={handleChange} value={teacherData.qualification} name="qualification" type="text" placeholder="Enter your qualifications" required />
            </div>
            <div className="input-box">
              <span className="details">Mobile Number</span>
              <input onChange={handleChange} value={teacherData.mobile_no} name="mobile_no" type="text" placeholder="Enter your number" required />
            </div>
            <div className="input-box">
              <span className="details">Biography</span>
              <textarea onChange={handleChange} value={teacherData.bio} name="bio" placeholder="Write a short biography (~ 100 words) about yourself." required></textarea>
            </div>
          </div>
          <button onClick={handleSubmit} type="button" className="register--button">Register</button>
        </form>
      </div>
    </div>
    )
}

export default Register;
