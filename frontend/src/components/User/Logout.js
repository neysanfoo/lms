function Logout() {
  localStorage.removeItem('studentLoginStatus')
  window.location.href='/student-login'
  return(
    <div>
    </div>
  )
}

export default Logout
