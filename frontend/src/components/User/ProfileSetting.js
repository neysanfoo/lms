import {Link} from 'react-router-dom'
import Sidebar from "./Sidebar"
function ProfileSetting() {
  return (
    <div className="container mt-4">
      <div className="row">
          <aside className="col-md-3">
            <Sidebar />
          </aside>
          <section className="col-md-9">
            <div className="card">
              <h5 className="card-header">Profile Setting</h5>
                <div className="card-body">
                <div class="mb-3 row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com" />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Profile Image</label>
                  <div class="col-sm-10">
                    <input type="file" class="form-control" />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                  <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword" />
                  </div>
                </div>
                <hr />
                <button className="btn btn-primary">Update</button>
              </div>
            </div>
          </section>
      </div>
    </div>


    )
}

export default ProfileSetting;
