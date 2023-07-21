import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      id="mainNav"
    >
      {
        <div class="container px-4 px-lg-5">
          <a
            class="navbar-brand"
            href="#page-top"
          >
            Nombre de nuestro equipo
          </a>
          <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i class="fas fa-bars"></i>
          </button>
          <div
            class="collapse navbar-collapse"
            id="navbarResponsive"
          >
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#about"
                >
                  Vive la experiencia
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#projects"
                >
                  Distintas ideas del proyecto
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#signup"
                >
                  Contacto o algo similar
                </a>
              </li>

              <li class="nav-item">
                <NavLink
                  to="/signup"
                  className="nav-link"
                >
                  New Space User
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      }
    </nav>
  );
}

export default Header;
