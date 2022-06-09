import {Link} from 'react-router-dom'

function Sidebar(){
  return(
    <div className="card">
      <div className="list-group list-group-flush">
        <Link to="/teacher-dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
        <Link to="/teacher-my-courses" className="list-group-item list-group-item-action">My Courses</Link>
        <Link to="/teacher-add-course" className="list-group-item list-group-item-action">Add Course</Link>
        <Link to="/teacher-my-users" className="list-group-item list-group-item-action">My Users</Link>
        <Link to="/teacher-profile-setting" className="list-group-item list-group-item-action">Profile Settings</Link>
        <Link to="/teacher-change-password" className="list-group-item list-group-item-action">Change Password</Link>
        <Link to="/teacher-logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
      </div>
    </div>
  );
}


export default Sidebar;
