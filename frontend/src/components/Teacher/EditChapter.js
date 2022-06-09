import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const baseURL="http://127.0.0.1:8000/api"

function EditChapter() {
  const {chapter_id}=useParams()
  const [chapterData, setChapterData]=useState({
    'course': '',
    'title':'',
    'description': '',
    'video': '',
    'remarks': ''
  })
  // Fetch chapter info on page load
  useEffect(()=>{
    try{
      axios.get(baseURL + '/chapter/' + chapter_id).then(response=>{
        setChapterData(response.data)
      })
    }
    catch(error){
      console.log(error)
    }
  }, []);

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



  function handleSubmit(){
    const ChapterFormData = new FormData();
    ChapterFormData.append('course', chapterData.course);
    ChapterFormData.append('title', chapterData.title);
    ChapterFormData.append('description', chapterData.description);
    if ( typeof chapterData.video != 'string')
      ChapterFormData.append('video', chapterData.video, chapterData.video.name);
    ChapterFormData.append('remarks', chapterData.keywords);
    try {
      axios.put(baseURL + '/chapter/' + chapter_id, ChapterFormData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((response)=>{
        if (response.status == 200)
        {
          window.location.href='/course-chapters/' + chapterData.course
          alert("Data has been updated")
        }

        });
    }
    catch(error){
      console.log(error)
    }
  }

  console.log(chapterData)

  return (
      <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
              <Sidebar />
            </aside>
            <section className="col-md-9">
              <div className="card">
                <h5 className="card-header">Edit Chapter</h5>
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
                    <label for="formFile" className="form-label">Video</label>
                    <input onChange={handleFileChange} name="video"  className="form-control" type="file" id="formFile" />
                    {chapterData.video &&
                      <video controls width="100%" className="mt-2">
                          <source src={chapterData.video} type="video/webm" />
                          <source src={chapterData.video} type="video/mp4" />
                          Sorry, your browser doesn't support embedded videos.
                      </video>
                    }

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

export default EditChapter;
