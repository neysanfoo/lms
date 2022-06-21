import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import CourseCard from "./CourseCard"
const baseURL="http://127.0.0.1:8000/api"

function Search() {
  const [courseData, setCourseData] = useState([]);
  const { search_data } = useParams();
  // Fetch courses when page load
  useEffect(()=>{
    try{
        axios.get(baseURL + '/search-courses/' + search_data).then(response=>{
        setCourseData(response.data)
      })
    }
    catch(error){
      console.log(error)
    }
  }, []);

  const cards = courseData.map(item => {
    return (
        <CourseCard
            key={item.id}
            item={item}
        />
    )
})

  console.log(courseData)
  return (
    <div className="container mt-4">
      <h3 className="pb-1 mb-4">Results for <span className='text-primary'>{search_data}</span></h3>
        <div className="row">
            {cards}
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

export default Search
