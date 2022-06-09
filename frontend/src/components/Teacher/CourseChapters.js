import {Link} from 'react-router-dom'
import Sidebar from "./Sidebar"
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const baseURL="http://127.0.0.1:8000/api"

function CourseChapters(){
  const [chapterData, setChapterData] = useState([]);
  const [chapterCount, setChapterCount] = useState(0);
  const {course_id}=useParams()
  // Fetch courses on page load
  useEffect(()=>{
    try{
      axios.get(baseURL + '/course-chapters/' + course_id).then(response=>{
        setChapterCount(response.data.length)
        setChapterData(response.data)
      })
    }
    catch(error){
      console.log(error)
    }
  }, []);

  function handleDeleteClick(chapter_id){
    let text = "Are you sure you want to delete " + chapterData[0].title + "?"
    if (window.confirm(text) == true){
      try{
        axios.delete(baseURL + '/chapter/' + chapter_id).then((response)=>{
            try{
              axios.get(baseURL + '/course-chapters/' + course_id).then(response=>{
                setChapterCount(response.data.length)
                setChapterData(response.data)
              })
            }
            catch(error){
              console.log(error)
            }
        })
      } catch {
        alert("Something went wrong, data not deleted.")
      }
    }
  }

  return(
        <div className="container mt-4">
          <div className="row">
              <aside className="col-md-3">
                <Sidebar />
              </aside>
              <section className="col-md-9">
                <div className="card">
                  <h5 className="card-header">All Chapters ({chapterCount}) <Link className='btn btn-success float-end btn-sm me-2' to={ "/teacher-add-chapter/" + course_id }>Add Chapter</Link></h5>
                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Video</th>
                          <th>Remarks</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chapterData.map((chapter,index)=>
                        <tr>
                          <td><Link to={'/edit-chapter/' + chapter.id} >{chapter.title}</Link></td>
                          <td>
                            <video controls width="250">

                                <source src={chapter.video}
                                        type="video/webm" />

                                <source src={chapter.video}
                                        type="video/mp4" />
                                Sorry, your browser doesn't support embedded videos.
                            </video>

                          </td>
                          <td>{chapter.remarks}</td>
                          <td>
                            <Link to={'/edit-chapter/' + chapter.id} className="btn btn-info btn-sm text-white me-2"><i class="bi bi-pencil-square"></i></Link>
                            <button type="button" onClick={() => handleDeleteClick (chapter.id)} className="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button>
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

export default CourseChapters;
