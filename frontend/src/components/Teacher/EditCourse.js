import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const baseURL="http://127.0.0.1:8000/api"

function EditCourse() {
  const [fileUploaded, setFileUploaded]=useState(false)
  const [courseData, setCourseData]=useState({
    'title':'',
    'description': '',
    'f_img': '',
    'keywords': ''
  })
  // Fetch current course data
  const {course_id} = useParams();
  useEffect(() => {
    try{
      axios.get(baseURL + '/teacher-course-detail/' + course_id).then((response)=>
      {
        setCourseData({
          'title': response.data.title,
          'description': response.data.description,
          'f_img': response.data.featured_img,
          'keywords': response.data.keywords
        })
      })
    } catch(error) {
      console.log(error);
    }
  }, []);


  function handleChange(event){
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.value
    })
  }

  function handleFileChange(event){
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.files[0]

    })
    setFileUploaded(true)
  }
  function handleSubmit(){
    const CourseFormData = new FormData();
    CourseFormData.append('teacher', 1);
    CourseFormData.append('title', courseData.title);
    CourseFormData.append('description', courseData.description);
    if (fileUploaded)
      CourseFormData.append('featured_img', courseData.f_img, courseData.f_img.name);
    CourseFormData.append('keywords', courseData.keywords);
    try {
      axios.put(baseURL+'/teacher-course-detail/' + course_id, CourseFormData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((response)=>{
        alert("Data has been updated")
        window.location.href='/teacher-my-courses'
      });
    }
    catch(error){
      console.log(error)
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
                <h5 className="card-header">Edit Course</h5>
                  <div className="card-body">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Title</label>
                    <input type="text" name="title" value={courseData.title} onChange={handleChange} class="form-control" id="exampleFormControlInput1" />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                    <textarea name="description" value={courseData.description} onChange={handleChange} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="formFile" class="form-label">Featured Image</label>
                    <input name="f_img" onChange={handleFileChange} class="form-control" type="file" id="formFile" />
                    {courseData.f_img &&
                      <img src={courseData.f_img} width="300" />
                    }
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Keywords</label>
                    <textarea name="keywords" value={courseData.keywords} onChange={handleChange} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                  <hr />
                  <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </div>
              </div>
            </section>
        </div>
      </div>
    )
}

export default EditCourse;
