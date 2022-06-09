import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const baseURL="http://127.0.0.1:8000/api"

function AddChapter() {

  const [chapterData, setChapterData]=useState({
    'title':'',
    'description': '',
    'video': '',
    'remarks': ''
  })

  function handleChange(event){
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.value
    })
  }

  function handleFileChange(event){
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.files[0]
    })
  }

  const {course_id}=useParams()

  function handleSubmit(){
    const ChapterFormData = new FormData();
    ChapterFormData.append('course', course_id);
    ChapterFormData.append('title', chapterData.title);
    ChapterFormData.append('description', chapterData.description);
    ChapterFormData.append('video', chapterData.video, chapterData.video.name);
    ChapterFormData.append('remarks', chapterData.keywords);
    try {
      axios.post(baseURL + '/course-chapters/' + course_id, ChapterFormData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((response)=>{
        window.location.href='/teacher-add-chapter/1'
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
                <h5 className="card-header">Add Chapter</h5>
                  <div className="card-body">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Title</label>
                    <input onChange={handleChange} name="title" value={chapterData.title} type="text" class="form-control" id="exampleFormControlInput1" />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                    <textarea onChange={handleChange} name="description" value={chapterData.description}  class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="formFile" class="form-label">Video</label>
                    <input onChange={handleFileChange} name="video"  class="form-control" type="file" id="formFile" />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Remarks</label>
                    <textarea onChange={handleChange} name="remarks" value={chapterData.remarks} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                  <hr />
                  <button onClick={handleSubmit} type="button" className="btn btn-primary">Submit</button>
                </div>
              </div>
            </section>
        </div>
      </div>
    )
}

export default AddChapter;
