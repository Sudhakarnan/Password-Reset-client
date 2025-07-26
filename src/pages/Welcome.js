import React from 'react';

export default function Welcome({ setLoggedIn }) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card p-5 text-center">
            <h2 className="mb-4">🎉 Welcome!</h2>
            <p className="lead mb-4">
              You have successfully logged in.<br />
              This is your protected dashboard.
            </p>
            <button className="btn btn-outline-danger w-50"
                    onClick={() => {
                      localStorage.removeItem('loggedIn');
                      setLoggedIn(false);
                      window.location = '/login';
                    }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
