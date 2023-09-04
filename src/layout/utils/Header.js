import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMe, logout } from "../../api/serviceAuth";
import { useTranslation } from "react-i18next";
import { authSuccess, authLogout } from "../../redux/actions";
import { getIsLogged, getUserId, getEmail } from "../../redux/selectors";
import flagEn from "../../assets/img/flag_en.png";
import flagEs from "../../assets/img/flag_es.png";
import storage from "./storage";

function Header() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const email = useSelector(getEmail)

  //Effect to search de userId
  useEffect(() => {
    const fetchData =  () => {
        console.log(userId)
      if (!userId) {
        const accessToken = storage.get("auth");
        
        if (accessToken !== null) {
          console.log('accessToken', accessToken);

          const base64Url = accessToken.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            window
              .atob(base64)
              .split('')
              .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join('')
          );
          const jsonweb =  JSON.parse(jsonPayload);
          console.log(jsonweb)
          dispatch(authSuccess(jsonweb));

          //   try {
          //     const newUserId = await getMe(accessToken);
          //     console.log(newUserId);
          //     dispatch(authLoginSuccess(newUserId));
          //   } catch (error) {
          //     console.error("Error fetching user data:", error);
          //   }
        }
      }
    };

    fetchData();
  }, [userId, dispatch]);

  const handlerLogout = () => {
    dispatch(authLogout());
    logout();
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      id="mainNav"
    >
      <li className="nav-item dropdown language-selector">
        <button
          className="nav-link dropdown-toggle language-selector-button"
          id="languageDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={i18n.language === "en" ? flagEn : flagEs}
            alt={i18n.language.toUpperCase()}
            className="language-flag"
          />
        </button>
        <ul
          className="dropdown-menu language-menu"
          aria-labelledby="languageDropdown"
        >
          <li>
            <button
              onClick={() => changeLanguage("en")}
              className="dropdown-item language-option"
            >
              <img src={flagEn} alt="EN" className="language-flag" />
              <span className="language-text">EN</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => changeLanguage("es")}
              className="dropdown-item language-option"
            >
              <img src={flagEs} alt="ES" className="language-flag" />
              <span className="language-text">ES</span>
            </button>
          </li>
        </ul>
      </li>
      {isLogged ? <span class="greetings">{t("navbar.greetings")} {email}</span> : <span class="greetings">{t("navbar.greetings-nonuser")}</span>}
      {
        <div class="container px-4 px-lg-5 navbar-style">
          <NavLink to="/" className="navbar-brand nav-NavLink home-button">
            {t("navbar.home")}
          </NavLink>
          <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {t("navbar.menu_mobile")}
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <NavLink to="/travels" className="nav-NavLink">
                  {t("navbar.travels")}
                </NavLink>
              </li>
              {isLogged ? (
                <>
                  <li class="nav-item">
                    <NavLink to="/newtravel" className="nav-NavLink">
                      {t("navbar.create-travel")}
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink
                      to="/updateUser"
                      className="nav-NavLink"
                    >
                      Update User
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink
                      to="/deleteUser"
                      className="nav-NavLink"
                    >
                      Delete User
                    </NavLink>
                  </li>

                  <li class="nav-item">
                    <NavLink
                      onClick={handlerLogout}
                      className="nav-NavLink"
                    >
                      {' '}
                      Logout{' '}
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li class="nav-item">
                    <NavLink to="/signup" className="nav-NavLink">
                      {t("navbar.new-user")}
                    </NavLink>
                  </li>

                  <li class="nav-item">
                    <NavLink to="/login" className="nav-NavLink">
                      {t("navbar.login-user")}
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      }
    </nav>
  );
}

export default Header;
