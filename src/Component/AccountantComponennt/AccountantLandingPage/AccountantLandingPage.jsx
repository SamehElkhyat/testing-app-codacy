import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { GetDataApi } from "../../Redux/Features/Slice/GetDataApiReducer";

const AccountantLandingPage = () => {
  const [userProfile, setuserProfile] = useState(null);
  const [State, setState] = useState({});

  const dispatch = useDispatch();

  const navigationToLandingpage = async () => {
    let { payload } = await dispatch(GetDataApi());

    setuserProfile(payload);
  };

  const GetState = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Number-Of-Operations-Account`,
        {
          withCredentials: true,
        }
      );
      setState(data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    GetState();
    navigationToLandingpage();
  }, []);

  return (
    <Container className="text-center mt-3 sm:mt-5 px-3 sm:px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        {userProfile !== null && userProfile !== undefined ? (
          <>
            {userProfile.role === "Account" ||
              userProfile.role === "Admin" ||
              userProfile.role === "Manager"}

            <h1 className="font-bold text-[var(--secondColor--)] text-end text-lg sm:text-xl md:text-2xl mt-3 sm:mt-5 px-2">
              مرحبا بك في لوحه التحكم{" "}
            </h1>
            <Row className="flex flex-col md:flex-row justify-center w-full p-2 sm:p-3 md:p-5 gap-4 lg:flex flex-row">
              <div className="first-col-use flex flex-col justify-start w-full md:w-1/2">
                <div className="box">
                  <Col className="mb-3">
                    <Link
                      className="text-white text-decoration-none"
                      to="/AcceptedOrderAccountant"
                    >
                      <Card className="h-full">
                        <Card.Body className="p-3 sm:p-4">
                          <div>
                            <p
                              style={{
                                fontSize: "clamp(18px, 4vw, 24px)", // Responsive font size
                                fontWeight: "900", // خط قوي جدًا
                                color: "#000", // اللون الأسود
                                textAlign: "center", // محاذاة في المنتصف (اختياري)
                                letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                              }}
                              className="text-start"
                            >
                              طلب {State.listForBroker}
                            </p>
                          </div>
                          <i className="p-2 text-end w-full text-[#9333EA] text-[clamp(24px, 5vw, 30px)] fa-solid fa-code-pull-request"></i>
                          <p className="p-2 text-right font-bold text-base sm:text-lg md:text-xl">
                            قائمه الحوالات للمخلصين
                          </p>

                          <Card.Text className="text-right p-2 text-sm sm:text-base">
                            استعرض الحوالات وقم باداره الحوالات للعملاء بكل
                            سهولة
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                </div>
              </div>
              <div className="second-col-use flex flex-col justify-end w-full md:w-1/2">
                <div className="box">
                  <Col className="mb-3">
                    <Link
                      className="text-white text-decoration-none"
                      to="/HistoryDoneOrder"
                    >
                      <Card className="shadow-lg h-full">
                        <Card.Body className="p-3 sm:p-4">
                          <div>
                            <p
                              style={{
                                fontSize: "clamp(18px, 4vw, 24px)", // Responsive font size
                                fontWeight: "900", // خط قوي جدًا
                                color: "#000", // اللون الأسود
                                textAlign: "center", // محاذاة في المنتصف (اختياري)
                                letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                              }}
                              className="text-start"
                            >
                              طلب {State.listOfDone}
                            </p>
                          </div>
                          <i className="fa-solid fa-arrows-spin p-2 text-end w-full text-[#9333EA] text-[clamp(24px, 5vw, 30px)]"></i>
                          <p className="p-2 text-right font-bold text-base sm:text-lg md:text-xl">
                            سجل الحوالات المنفذه{" "}
                          </p>
                          <Card.Text className="text-right p-2 text-sm sm:text-base">
                            استعرض سجل الحوالات المنفذه وقم باداره بكل سهولة
                          </Card.Text>
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
            <h1 className="text-lg sm:text-xl md:text-2xl">غير مسموح بك بالدخول</h1>
          </>
        )}
      </motion.div>
    </Container>
  );
};

export default AccountantLandingPage;
