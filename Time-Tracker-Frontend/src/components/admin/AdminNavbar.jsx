import React from "react";
import { useNavigate } from "react-router-dom";
import hamburgermenu from "../../assets/hamburgermenu.png";

export const AdminNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.clear();

   
    navigate("/landingpage");

    
    window.location.reload();
  };

  return (
    <>
    <style>{`
    .app-header navbar{
       background-color: #4B5C4A !important;
    }
    `}</style>
    
    <nav className="app-header navbar navbar-expand bg-body"  >
      {/*begin::Container*/}
      <div className="container-fluid d-flex justify-content-between">
        {/*begin::Start Navbar Links*/}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link btn btn-light"
              href="#"
              role="button"
              style={{ color: "white" }}
              onClick={toggleSidebar}
            >
              <img src={hamburgermenu} style={{ height: "20px", width: "20px" }} alt="Menu" />
            </a>
          </li>
        </ul>

        {/*begin::Logout Button*/}
        <button
          className="btn"
          style={{
            backgroundColor: "#A6C1A2",
            
            color: "white",
            padding: "11px 22px",
            borderRadius: "0.75rem",
            fontWeight: "bold",
            border: "none",
            transition: "background-color 0.3s, color 0.3s",
          }}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "white";
            e.target.style.color = "#A6C1A2";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#A6C1A2";
            e.target.style.color = "white";
          }}
        >
          Logout
        </button>
      </div>
      {/*end::Container*/}
    </nav>
    </>
  );
};
