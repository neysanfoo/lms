import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
const baseURL='http://127.0.0.1:8000/api';


function ProfileSetting() {
  const [fileUploaded, setFileUploaded]=useState(false)
  const [teacherData, setTeacherData] = useState({
    'full_name': '',
    'email': '',
    'qualification': '',
    'mobile_no': '',
    'bio': '',
    'status': ''
  })
  const teacherId = localStorage.getItem('teacherId')

  useEffect(() => {
    // Fetch Current Teacher Data
    try{
      axios.get(baseURL + '/teacher/' + teacherId + '/').then((response)=>
      {
        setTeacherData({
          'full_name': response.data.full_name,
          'email': response.data.email,
          'qualification': response.data.qualification,
          'mobile_no': response.data.mobile_no,
          'bio': response.data.bio,
          'profile_pic': response.data.profile_pic,
        })
      })
    } catch(error) {
      console.log(error);
    }
  }, []);

  function handleChange(event){
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value
    })
  }

  function handleFileChange(event){
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.files[0]

    })
    setFileUploaded(true)
  }

  function handleSubmit(event){
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name)
    teacherFormData.append("email", teacherData.email)
    teacherFormData.append("qualification", teacherData.qualification)
    teacherFormData.append("mobile_no", teacherData.mobile_no)
    teacherFormData.append("bio", teacherData.bio)
    if (fileUploaded)
      teacherFormData.append('profile_pic', teacherData.profile_pic, teacherData.profile_pic.name);
    try {
      axios.put(baseURL + '/teacher/' + teacherId + '/', teacherFormData).then((response)=>{
        alert("Profile has been updated")
      });
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
          <div className="form--container">
            <div className="title">Update Profile</div>
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
                  <div class="mb-3">
                    <label for="formFile" class="form-label">Featured Image</label>
                    <input name="profile_pic" onChange={handleFileChange} class="form-control" type="file" id="formFile" />
                    {teacherData.profile_pic &&
                      <img src={teacherData.profile_pic} width="300" />
                    }
                  </div>
                </div>
                <button onClick={handleSubmit} type="button" className="register--button">Update</button>
              </form>
            </div>
          </div>
          </section>
      </div>
    </div>


    )
}

export default ProfileSetting;
