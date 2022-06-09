import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Sidebar from "./Sidebar"
import RatingSystem from './RatingSystem'
const baseURL="http://127.0.0.1:8000/api"

function CourseDetail(){
  const [chapterData, setChapterData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const {course_id}=useParams()
  const [enrollStatus, setEnrollStatus]=useState();
  const studentId=localStorage.getItem('studentId')
  useEffect(()=>{
    // Fetch course details
    try{
      axios.get(baseURL + '/course/' + course_id).then(response=>{
        setCourseData(response.data)
        setTeacherData(response.data.teacher)
        setChapterData(response.data.course_chapters)
      })
    }
    catch(error){
      console.log(error)
    }
    //Fetch enroll status
    try{
      axios.get(baseURL + '/student-enroll-status/' + studentId + '/' + course_id).then(response=>{
        if (response.data.bool)
          setEnrollStatus("true")
      })
    }
    catch(error){
      console.log(error)
    }

  }, []);
  // console.log(courseData)
  // console.log(teacherData)
  // console.log(chapterData)

  const studentLoginStatus=localStorage.getItem("studentLoginStatus")

  function EnrollStudent(){

    const EnrollFormData = new FormData();
    EnrollFormData.append('course', course_id);
    EnrollFormData.append('student', studentId);
    try {
      axios.post(baseURL+'/student-enroll-course', EnrollFormData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((response)=>{
        setEnrollStatus("true")
      });
    }
    catch(error){
      console.log(error)
    }
  }

  const [rating, setRating] = useState(0);
  

    const [reviewData, setReviewData]=useState({
      'rating':'',
      'review': '',
    })
  
    function handleChange(event){
      setReviewData({
        ...reviewData,
        [event.target.name]: event.target.value
      })
    }

    function handleSubmit(){
      const RatingformData = new FormData();
      RatingformData.append('rating', reviewData.rating);
      RatingformData.append('review', reviewData.review);
      RatingformData.append('course', course_id);
      RatingformData.append('student', studentId);
      
      try {
        axios.post(baseURL + '/course-rating/', RatingformData,)
        .then((response)=>{
          window.location.href='/detail/'+course_id
        });
        }
      catch(error){
        console.log(error)
      }
    }


  return(
    <>
    {studentLoginStatus && enrollStatus=="true" &&
    <Sidebar />
    }
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src={courseData.featured_img} className="img-thumbnail" alt={courseData.title} />
        </div>
        <div className="col-8">
          <h3>{courseData.title}</h3>
          <p>{courseData.description}</p>
          <p><b>Course By: </b> <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
          <p><b>Duration: </b> 3 Hours 30 Mins</p>
          <p><b>Total Enrolled: </b> {courseData.total_enrolled_students}</p>
          <p>
          <b>Rating: </b>4/5
          {
            studentLoginStatus && enrollStatus=="true" &&
            <>
              <button type="button" className="btn-sm btn-success  ms-4" data-bs-toggle="modal" data-bs-target="#reviewModal">Give a review</button>
              <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="reviewModalLabel">Review for {courseData.title}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Rating</label>
                        <RatingSystem handleChange={handleChange} />
                        <label  for="InputReview" class="form-label">Review</label>
                        <textarea onChange={handleChange} name="review" value={reviewData.review} type="text" class="form-control" id="InputReview" rows="5"></textarea>
                      </div>
                    </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button onClick={handleSubmit} type="button" class="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
            
            
          }
          </p>
          {
            studentLoginStatus && enrollStatus!="true" &&
            <p><button type="button" onClick={EnrollStudent} className="btn btn-success">Enroll</button></p>
          }
          {
            studentLoginStatus && enrollStatus=="true" &&
            <p><button type="button" onClick={EnrollStudent} className="btn btn-success disabled">Enrolled</button></p>
          }
          {
            !studentLoginStatus &&
            <p><Link to='/student-login' className="btn btn-success">Please login to enroll</Link></p>
          }

        </div>
      </div>
      {studentLoginStatus && enrollStatus=="true" &&

      <div className="card mt-4">
        <div className="card-header">
          <h5>Course Overview</h5>
        </div>
        <ul className="list-group list-group-flush">
        {chapterData.map((chapter,index)=>
          <li className="list-group-item">{chapter.title}
            <span className="float-end">
              <span className="me-3">5 Min 30 Sec</span>
              <button className="btn btn-sm" data-bs-toggle="modal" data-bs-target="#videoModal1"><i className="bi bi-play-btn"></i></button>
            </span>
            {/* Video Modal Start */}
            <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="videoModalLabel">Video 1</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="ratio ratio-16x9">
                      <video width="320" height="240" controls>
                        <source src={chapter.video} type="video/mp4" />
                        <source src={chapter.video} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Video Modal End */}
          </li>
        )}
        </ul>
      </div>
    }
    </div>
    </>
  )
}

export default CourseDetail
