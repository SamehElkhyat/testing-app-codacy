import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPageUsers.css";
import { useDispatch } from "react-redux";
import { GetDataApi } from "../Redux/Features/Slice/GetDataApiReducer";
import gsap from "gsap";

const LandingPageForUsers = () => {

  const [State, setState] = useState({});
  const [userProfile, setuserProfile] = useState(null);
  const [userLink, setUserLink] = useState(null);

  const dispatch = useDispatch();

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

  const GetState = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Number-Of-Operations-User`,
        {
          withCredentials: true,
        }
      );
      setState(data);
    } catch (error) {}
  };

  useEffect(() => {
    document.querySelectorAll(".box").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.04,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.4,
          ease: "power2.inOut",
        });
      });
    });

    gsap.from(".box", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2, // تأخير بسيط بين كل كرت وكرت
      ease: "power3.out", // منحنى حركة سلس
    });

    GetState();
    navigationToLandingpage();
  }, []);

  return (
    <Container className="text-center mt-3 sm:mt-4 md:mt-5 p-3 sm:p-4 md:p-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        {userProfile == null && userProfile == undefined ? (
          <>
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
              <div className="w-full max-w-lg text-center">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-red-800">
                        تنبيه الوصول المقيد
                      </h3>
                      <p className="mt-1 text-sm text-red-700">
                        عذراً، يجب تسجيل الدخول للوصول إلى هذه الصفحة
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  يرجى تسجيل الدخول أو إنشاء حساب جديد للمتابعة
                </p>
                <div className="flex justify-center gap-4">
                  <Link 
                    to="/signin"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    to="/signup" 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    إنشاء حساب
                  </Link>
                </div>
              </div>
            </div>
               
          </>
        ) : (
          <>
            {userProfile.role == "User" ||
            userProfile.role == "Company" ||
            userProfile.role == "Admin" ? (
              <>
                <h1
                  className="mb-3 sm:mb-4"
                  style={{
                    fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
                    fontWeight: "700",
                    color: "var(--secondColor--)",
                    backgroundClip: "text",
                    borderBottom: "3px solid transparent",
                    paddingBottom: "12px",
                    width: "fit-content",
                    margin: "0 auto 1rem auto",
                    borderRadius: "12px",
                    padding: "clamp(15px, 3vw, 22px) clamp(15px, 3vw, 25px)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  مرحبا بك في لوحه التحكم{" "}
                </h1>
                <Row className="flex flex-col lg:flex-row justify-center w-full gap-4">
                  <div className="first-col-use flex flex-col justify-start w-full lg:w-1/4">
                    <div className="box">
                      <Col className="mb-3">
                        <Link
                          className="text-white text-decoration-none"
                          to="/newOrder"
                        >
                          <Card
                  
                            className="p-3"
                          >
                            <Card.Body>
                              <div className="">
                                <i className="p-2 text-end w-full fa-solid fa-arrow-up text-[var(--maincolor--)] text-[clamp(24px, 5vw, 30px)]"></i>
                                <p className="p-2 text-right font-bold text-base sm:text-lg md:text-xl">
                                  إنشاء طلب جديد
                                </p>
                                <Card.Text className="text-right p-2 text-sm sm:text-base">
                                  ابدأ طلب تخليص جمركي بسهولة.
                                </Card.Text>
                                <button className="me-5 text-[black] bg-[var(--maincolor--)] p-[10px] px-4 py-2 rounded-[20px] text-sm sm:text-base">
                                  إنشاء طلب جديد
                                </button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    </div>

                    <div className="box">
                      <Col className="mb-3">
                        <Link
                          className="text-white text-decoration-none"
                          to="/Orders"
                        >
                          <Card
                       
                            className="p-3"
                          >
                            <Card.Body>
                              <div>
                                <p
                                  style={{
                                    fontSize: "clamp(18px, 4vw, 24px)", // حجم الخط كبير وواضح
                                    fontWeight: "900", // خط قوي جدًا
                                    color: "#000", // اللون الأسود
                                    textAlign: "center", // محاذاة في المنتصف (اختياري)
                                    letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                                  }}
                                  className="text-start"
                                >
                                  طلب
                                  {State.numberOfCurrentOffers}
                                </p>
                              </div>
                              <i className="p-2 text-end w-full fa-solid fa-arrows-spin text-[#9333EA] text-[clamp(24px, 5vw, 30px)]"></i>
                              <p className="p-2 text-right font-bold text-base sm:text-lg md:text-xl">
                                الطلبات القائمه
                              </p>

                              <Card.Text className="text-right p-2 text-sm sm:text-base">
                                عرض وإدارة الطلبات القائمه.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    </div>

                    <div className="box">
                      <Col className="mb-3">
                        <Link
                          className="text-white text-decoration-none"
                          to="/CurrentOrdersForUsers"
                        >
                          <Card
                          
                            className="p-3"
                          >
                            <Card.Body>
                              <div className="">
                                <p
                                  style={{
                                    fontSize: "clamp(18px, 4vw, 24px)", // حجم الخط كبير وواضح
                                    fontWeight: "900", // خط قوي جدًا
                                    color: "#000", // اللون الأسود
                                    textAlign: "center", // محاذاة في المنتصف (اختياري)
                                    letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                                  }}
                                  className="text-start"
                                >
                                  طلب {State.numberOfRequestOrders}
                                </p>

                                <i className="p-2 text-end w-full fa-solid fa-cart-shopping text-[var(--maincolor--)] text-[clamp(24px, 5vw, 30px)]"></i>
                                <p className="p-2 text-right font-bold text-base sm:text-lg md:text-xl">
                                  الطلبات الجاريه
                                </p>
                                <Card.Text className="text-right p-2 text-sm sm:text-base">
                                  إدارة الطلبات الجاريه.
                                </Card.Text>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    </div>
                  </div>
                  <div className="second-col-usr flex flex-col justify-end w-full lg:w-1/4">
                    <div className="box">
                      <Col className="mb-3">
                        <Link
                          className="text-white text-decoration-none"
                          to="/DoneOrdersForUser"
                        >
                          <Card className="p-3">
                            <Card.Body>
                              <div className="">
                                <p
                                  style={{
                                    fontSize: "clamp(18px, 4vw, 24px)", // حجم الخط كبير وواضح
                                    fontWeight: "900", // خط قوي جدًا
                                    color: "#000", // اللون الأسود
                                    textAlign: "center", // محاذاة في المنتصف (اختياري)
                                    letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                                  }}
                                  className="text-start"
                                >
                                  طلب {State.numberOfSuccessfulOrders}
                                </p>

                                <i className="p-2 text-end w-full fa-regular fa-circle-check text-[#76C248] text-[clamp(24px, 5vw, 30px)]"></i>
                                <p className="p-2 text-right font-bold text-base sm:text-lg md:text-xl">
                                  الطلبات المنفذه
                                </p>
                                <Card.Text className="text-right p-2 text-sm sm:text-base">
                                  عرض الطلبات المنفذه الخاص بك.
                                </Card.Text>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    </div>
                    <div className="box">
                      <Col className="mb-3">
                        <Link
                          className="text-white text-decoration-none"
                          to="/Cart"
                        >
                          <Card
                           
                            className="p-3"
                          >
                            <Card.Body>
                              <div className="">
                                <p
                                  style={{
                                    fontSize: "clamp(18px, 4vw, 24px)", // حجم الخط كبير وواضح
                                    fontWeight: "900", // خط قوي جدًا
                                    color: "#000", // اللون الأسود
                                    textAlign: "center", // محاذاة في المنتصف (اختياري)
                                    letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                                  }}
                                  className="text-start"
                                >
                                  طلب {State.numberOfRequestOrders}
                                </p>

                                <i className="p-2 text-end w-full fa-solid fa-cart-shopping text-[#E31D1D] text-[clamp(24px, 5vw, 30px)]"></i>
                                <p className="p-2 text-right font-bold text-base sm:text-lg md:text-xl">
                                  المحفظة
                                </p>
                                <Card.Text className="text-right p-2 text-sm sm:text-base">
                                  إدارة الأموال والرصيد الخاص بك.
                                </Card.Text>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    </div>
                    <div className="box">
                      <Col className="mb-3">
                        <Link
                          className="text-white text-decoration-none"
                          to="/HistoryOfOrdersUsers"
                        >
                          <Card
                           
                            className="p-3"
                          >
                            <Card.Body>
                              <div className="">
                                <p
                                  style={{
                                    fontSize: "clamp(18px, 4vw, 24px)", // حجم الخط كبير وواضح
                                    fontWeight: "900", // خط قوي جدًا
                                    color: "#000", // اللون الأسود
                                    textAlign: "center", // محاذاة في المنتصف (اختياري)
                                    letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                                  }}
                                  className="text-start"
                                >
                                  طلب
                                </p>
                                <i className="p-2 text-end w-full fa-solid fa-clock-rotate-left text-[var(--maincolor--)] text-[clamp(24px, 5vw, 30px)]"></i>
                                <p className="p-2 text-right font-bold text-base sm:text-lg md:text-xl">
                                  سجل الطلبات
                                </p>
                                <Card.Text className="text-right p-2 text-sm sm:text-base">
                                  إدارة السجل وجميع الطلبات الخاص بك.
                                </Card.Text>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    </div>
                  </div>
                </Row>
              </>
            ) : (
              <>
                <h1 className="text-lg sm:text-xl md:text-2xl">غير مسموح لك بالدخول</h1>
              </>
            )}
          </>
        )}
      </motion.div>
    </Container>
  );
};

export default LandingPageForUsers;
