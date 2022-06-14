import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
const baseURL='http://127.0.0.1:8000/api';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState([])
  const teacherId = localStorage.getItem('teacherId')

  useEffect(()=>{
    try{
      axios.get(baseURL + '/teacher/dashboard/' + teacherId).then(response=>{
        setDashboardData(response.data)
      })
    }catch(error){
      console.log(error)
    }}, [])
  return (
      <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
              <Sidebar />
            </aside>
            <section className="col-md-9">
              <div className='row'>
                <div className='col-md-4'>
                  <div class="card border-primary" >
                    <h5 className="card-header bg-primary text-white">Total Courses</h5>
                    <div className="card-body">
                      <h5 className="card-title"><Link to='/teacher-my-courses'>{dashboardData.total_teacher_courses}</Link></h5>
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div class="card border-primary" >
                    <h5 className="card-header bg-primary text-white">Total Students</h5>
                    <div className="card-body">
                      <h5 className="card-title"><Link to='/teacher-my-users'>{dashboardData.total_teacher_students}</Link></h5>
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div class="card border-primary" >
                    <h5 className="card-header bg-primary text-white">Total Chapters</h5>
                    <div className="card-body">
                      <h5 className="card-title">{dashboardData.total_teacher_chapters}</h5>
                    </div>
                  </div>
                </div>
              </div>
           
              

            </section>
        </div>
      </div>
    )
}

export default Dashboard;
