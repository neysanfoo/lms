import {Link} from 'react-router-dom'

function Sidebar(){
  return(
    <div className="card">
      <div className="list-group list-group-flush">
        <Link to="/student-dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
        <Link to="/my-courses" className="list-group-item list-group-item-action">My Courses</Link>
        <Link to="/profile-setting" className="list-group-item list-group-item-action">Profile Settings</Link>
        <Link to="/change-password" className="list-group-item list-group-item-action">Change Password</Link>
        <Link to="/student-logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
      </div>
    </div>
  );
}


export default Sidebar;
