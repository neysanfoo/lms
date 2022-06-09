import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
const baseURL="http://127.0.0.1:8000/api"

function TeacherDetail(){
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const {teacher_id}=useParams()
  useEffect(()=>{
    try{
      axios.get(baseURL + '/teacher/' + teacher_id + '/').then(response=>{
        setTeacherData(response.data)
        setCourseData(response.data.teacher_courses)
      })
    }
    catch(error){
      console.log(error)
    }
  }, []);
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/Passport_photo.jpg" className="img-thumbnail" alt="Course image" />
        </div>
        <div className="col-8">
          <h3>{teacherData.full_name}</h3>
          <p>{teacherData.bio}</p>
          <p><b>Rating: </b> 4.5/5</p>
        </div>
      </div>
      {/* Course Videos */}
      <div className="card mt-4">
        <div className="card-header">
          <h5>Course List</h5>
        </div>
        <div className="list-group list-group-flush">
          {courseData.map((course,index)=>
            <Link to={`/detail/${course.id}`} class='list-group-item list-group-item-action'>{course.title}</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherDetail;
