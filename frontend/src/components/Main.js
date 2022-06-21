import Home from './Home'
import Header from './Header'
import Footer from './Footer'

// Users
import Login from './User/Login'
import Logout from './User/Logout'
import Register from './User/Register'
import CourseDetail from "./CourseDetail"
import Dashboard from './User/Dashboard'
import MyCourses from "./User/MyCourses"
import ProfileSetting from "./User/ProfileSetting"
import ChangePassword from "./User/ChangePassword"

// Teachers
import TeacherLogin from './Teacher/Login'
import TeacherLogout from './Teacher/Logout'
import TeacherRegister from './Teacher/Register'
import TeacherDetail from './TeacherDetail'
import TeacherDashboard from './Teacher/Dashboard'
import TeacherMyCourses from "./Teacher/MyCourses"
import TeacherAddChapter from "./Teacher/AddChapter"
import TeacherAddCourse from "./Teacher/AddCourse"
import TeacherEditCourse from "./Teacher/EditCourse"
import TeacherMyUsers from "./Teacher/MyUsers"
import TeacherProfileSetting from './Teacher/ProfileSetting'
import TeacherChangePassword from './Teacher/ChangePassword'
import TeacherEnrolledStudents from './Teacher/EnrolledStudents'
import TeacherCreateCourse from './Teacher/CreateCourse'

import AllCourses from "./AllCourses"
import PopularCourses from "./PopularCourses"
import FeaturedTeachers from "./FeaturedTeachers"
import SearchCourses from './Search'

import CourseChapters from "./Teacher/CourseChapters"
import EditChapter from "./Teacher/EditChapter"

import '../style.css'
import {Routes, Route} from 'react-router-dom'

function Main() {
  return (
    <div>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<AllCourses />} />
        <Route path="/course-chapters/:course_id" element={<CourseChapters />} />
        <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />
        <Route path="/popular-courses" element={<PopularCourses />} />
        <Route path="/featured-teachers" element={<FeaturedTeachers />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/search/:search_data" element={<SearchCourses />} />

        <Route path="/student-login" element={<Login />} />
        <Route path="/student-logout" element={<Logout />} />
        <Route path="/student-register" element={<Register />} />
        <Route path="/student-dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-logout" element={<TeacherLogout />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-my-courses" element={<TeacherMyCourses />} />
        <Route path="/teacher-add-course" element={<TeacherAddCourse />} />
        <Route path="/teacher-create-course/:course_id" element={<TeacherCreateCourse />} />
        <Route path="/teacher-edit-course/:course_id" element={<TeacherEditCourse />} />
        <Route path="/teacher-add-chapter/:course_id" element={<TeacherAddChapter />} />
        <Route path="/teacher-my-users" element={<TeacherMyUsers />} />
        <Route path="/teacher-profile-setting" element={<TeacherProfileSetting />} />
        <Route path="/teacher-change-password" element={<TeacherChangePassword />} />
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
        <Route path='/teacher-enrolled-students/:course_id' element={<TeacherEnrolledStudents />} />

      </Routes>
      {/* <Footer /> */}
    </div>

  );
}

export default Main;
