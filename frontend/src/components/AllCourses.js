import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
import CourseCard from "./CourseCard"
const baseURL="http://127.0.0.1:8000/api"

function AllCourses() {
  const [courseData, setCourseData] = useState([]);
  // Fetch courses when page load
  useEffect(()=>{
    try{
      axios.get(baseURL + '/course/').then(response=>{
        setCourseData(response.data)
      })
    }
    catch(error){
      console.log(error)
    }
  }, []);
  
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState('popular');

    function handleSort(event){
      setSort(event.target.value);
      // set color of selected sort option to red and unselected to black
      if (event.target.value === 'popular' && event.target.style.color === 'white'){
        document.getElementById('popular').style.backgroundColor = 'white';
        document.getElementById('popular').style.color = 'black';
      }
      else if (event.target.value === 'popular'){
        document.getElementById('popular').style.backgroundColor = '#B23850';
        document.getElementById('popular').style.color = 'white';
        document.getElementById('latest').style.backgroundColor = 'white';
        document.getElementById('latest').style.color = 'black';
      }
      if (event.target.value === 'latest' && event.target.style.color === 'white'){
        setSort("popular")
        document.getElementById('latest').style.backgroundColor = 'white';
        document.getElementById('latest').style.color = 'black';
      }
      else if (event.target.value === 'latest'){
        document.getElementById('latest').style.backgroundColor = '#B23850';
        document.getElementById('latest').style.color = 'white';
        document.getElementById('popular').style.backgroundColor = 'white';
        document.getElementById('popular').style.color = 'black';
      }
    }
    console.log(courseData)
    console.log(sort)

  return (
    <div className="container mt-4">
      <h3 className="banner">Course Library</h3>
      <div className='search--and--sort'>
        <input className='search--bar--filter' type="text" value={searchTerm} placeholder='Search' onChange={event => {setSearchTerm(event.target.value)}} />
        <span className='sort--filter'>
          <button id="popular" value="popular" onClick={handleSort}>Popular</button>
          <button id="latest" value="latest" onClick={handleSort}>Latest</button>
        </span>
      </div>
      
      <div className="row cards--container">
      {sort === "popular" ? courseData.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
          item.teacher.full_name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
          .sort((a, b) => b.course_views - a.course_views).map(item => {
          return (
            <CourseCard
              key={item.id}
              item={item}
            />
          )
        }) : courseData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        item.teacher.full_name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
        .sort((a, b) => b.id - a.id).map(item => {
          return (
            <CourseCard
              key={item.id}
              item={item}
            />
          )
        }
        )}
      </div>
      {/* Pagination */}
      <nav aria-label="Page navigation example mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default AllCourses
