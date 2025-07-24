import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./NavBar.css";
import Logo from "../NavBar/LOGO-H.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Divider, Drawer } from "@mui/material";
import { motion } from "framer-motion";
import { GetDataApi } from "../Redux/Features/Slice/GetDataApiReducer";
import { eventEmitter } from "../eventEmitter";
import UserSideBar from "./UserSideBar";
import AdminSideBar from "./AdminSideBar";
import Broker from "./Broker";
import Accountant from "./Accountant";
import Manger from "./Manger";
import CustomerServices from "./CustomerServices";
import NonUserSideBar from "./NonUserSideBar";

const NavBar = () => {
  const dispatch = useDispatch();
  const [userProfile, setuserProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const [userLink, setUserLink] = useState(null);

  const navigationToLandingpage = async () => {
    let { payload } = await dispatch(GetDataApi());
    setuserProfile(payload);
    let link;
    if (payload !== undefined) {
      switch (payload.role) {
        case "User":
          link = "/LandingPageForUsers";
          break;
        case "Admin":
          link = "/LandingPageAdmin";
          break;
        case "Company":
          link = "/LandingPageForUsers";
          break;
        case "Account":
          link = "/AccountantLandingPage";
          break;
        case "CustomerService":
          link = "/LandingPageCustomeService";
          break;
        case "Broker":
          link = "/BrookersLandingPage";
          break;
        case "Manager":
          link = "/LandingPageManger";
          break;
        default:
          link = null;
      }
      setUserLink(link);
    }
  };

  useEffect(() => {
    if (
      pathname == "/ActiveEmail" ||
      pathname == "/SignUp" ||
      pathname == "/SignUpForCompany" ||
      pathname == "/SignUpForMokhalseen" ||
      pathname == "/SignIn" ||
      pathname == "/IntorSignUp"
    ) {
      return;
    } else {
      navigationToLandingpage();
      // الاستماع للحدث
      eventEmitter.on("dataUpdated", navigationToLandingpage);
      // تنظيف الحدث عند إزالة الكومبوننت
      return () => {
        eventEmitter.off("dataUpdated", navigationToLandingpage);
      };
    }
  }, [pathname]);
  return (
    <>
      <Drawer
        className="position-absolute z-index-99999999999"
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right" // يحدد أن الـ Drawer يظهر من اليمين
      >
        <Box
          id="DrawerList"
          className="drawer-list"
          sx={{
            width: 300,
            backgroundColor: "#f8f9fa",
            height: "100%",
            "& .MuiListItemButton-root": {
              padding: "12px 24px",
              "&:hover": {
                backgroundColor: "#e9ecef",
                borderRadius: "8px",
                margin: "0 8px",
                transition: "all 0.2s ease-in-out",
              },
            },
            "& .MuiListItemText-primary": {
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#343a40",
            },
            "& .MuiDivider-root": {
              margin: "16px 0",
              backgroundColor: "#dee2e6",
            },
          }}
          role="presentation"
        >
          {userProfile !== null ? (
            <>
              {userProfile?.role === "Admin" ? (
                <>
                  <AdminSideBar />
                </>
              ) : userProfile?.role === "User" ? (
                <>
                  <UserSideBar />
                </>
              ) : userProfile?.role === "Broker" ? (
                <>
                  <Broker />
                </>
              ) : userProfile?.role === "Account" ? (
                <>
                  <Accountant />
                </>
              ) : userProfile?.role === "Manager" ? (
                <>
                  <Manger />
                </>
              ) : userProfile?.role === "CustomerService" ? (
                <>
                  <CustomerServices />
                </>
              ) : userProfile?.role === "Company" ? (
                <>
                  <UserSideBar />
                </>
              ) : (
                <>
                  <NonUserSideBar />
                </>
              )}
            </>
          ) : (
            <></>
          )}

          <Divider />
        </Box>
      </Drawer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-logo">
              <img src={Logo} alt="Company Logo" loading="lazy" />
            </div>
            {userProfile == null ? (
              <>
                <div className=" gap-6 h-10 lg2:flex flex-col justify-center items-center hidden w-full flex-wrap">
                  <ul>
                    <li
                      className={`text-xl text-[#002E5B] font-bold transition-all duration-200 cursor-pointer hover:text-[#1DA9E3]`}
                    >
                      الرئيسية
                    </li>
                  </ul>
                  <ul>
                    <li className="text-xl text-[#002E5B] font-bold transition-all duration-200 cursor-pointer hover:text-[#1DA9E3] hover:underline underline-offset-4">
                      من نحن
                    </li>
                  </ul>
                  <ul>
                    <li className="text-xl text-[#002E5B] font-bold transition-all duration-200 cursor-pointer hover:text-[#1DA9E3]">
                      خدماتنا
                    </li>
                  </ul>
                  <ul>
                    <li className="text-xl text-[#002E5B] font-bold transition-all duration-200 cursor-pointer hover:text-[#1DA9E3]">
                      تواصل معنا
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <></>
            )}

            {userProfile == null ? (
              <>
                <div className="w-100 flex flex-row justify-start lg2:block hidden">
                  <button
                    onClick={() => (navigate("/IntorSignUp"))}
                    className="lg2:text-[red] me-5 bg-[#1DA9E3] p-[10px] px-4 py-2 text-white rounded-[20px] shadow"
                  >
                    إنشاء الحساب
                  </button>

                  <button
                    onClick={() => (navigate("/SignIn"))}
                    className="me-5 text-[black] p-[10px] px-4 py-2  rounded-[20px] shadow"
                  >
                    تسجيل الدخول
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="Items-NavBar d-flex flex-row justify-end">
                  <i
                    onClick={toggleDrawer(true)}
                    id="icon"
                    className={`hover:scale-[1.4] cursor-pointer ease-in-out transition-all duration-300 me-4 text-xl ${
                      open
                        ? "fa-solid fa-chevron-right transition-all duration-300 ease-in-out"
                        : "fa-solid fa-chevron-down transition-all duration-300 ease-in-out"
                    }`}
                  ></i>

                  <li className="nav-item d-flex flex-row align-items-center justify-content-start">
                    <Link to={userLink} className="nav-link">
                      {userProfile.fullName}
                      <i className="m-2 fa-solid fa-toolbox"></i>
                    </Link>
                  </li>
                </div>
              </>
            )}
          </div>
          {userProfile == null ? (
            <>
              <div
                onClick={toggleDrawer(true)}
                className="lg2:hidden flex justify-start items-center w-100"
              >
                <svg
                  width="50px"
                  height="50px"
                  viewBox="0 0 24.00 24.00"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(0)matrix(1, 0, 0, -1, 0, 0)"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M19 10L5 10"
                      stroke="#22C55E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M19 14L5 14"
                      stroke="#22C55E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M19 6L5 6"
                      stroke="#22C55E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M19 18L5 18"
                      stroke="#22C55E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>
                  </g>
                </svg>
              </div>
            </>
          ) : (
            <></>
          )}
        </nav>
      </motion.div>
    </>
  );
};

export default NavBar;
