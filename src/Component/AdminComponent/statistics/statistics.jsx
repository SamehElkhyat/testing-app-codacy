import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Import, Share2, ChevronLeft, ChevronRight } from "lucide-react"; // أيقونة مشاركة
import toast from "react-hot-toast";

export default function statistics() {
  const [searchTerm, setSearchTerm] = useState("");
  const [Statics, setStatics] = useState({});
  const [Brookers, setBrookers] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBrokers, setTotalBrokers] = useState(0);
  const [loading, setLoading] = useState(false);

  const GetStatics = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Statistics`,
        {
          withCredentials: true,
        }
      );
      setStatics(data);
    } catch (error) {
      
    }
  };
  
  const GetBrookers = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Evaluation-Broker/${page}`,
        {
          withCredentials: true,
        }
      );

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setBrookers(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalBrokers(data.totalBrokers || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setBrookers(data);
        setTotalPages(1);
        setTotalBrokers(data.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  useEffect(() => {
    GetStatics();
    GetBrookers(currentPage);
  }, [currentPage]);

  // Filter data based on search term
  const filteredBrokers = Brookers.filter((item) => {
    return searchTerm === "" || 
           item.fullName?.includes(searchTerm) || 
           item.email?.includes(searchTerm) ||
           item.count?.toString().includes(searchTerm);
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <div className="container py-5">
          <h2
            className="text-center mb-4"
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              borderBottom: "3px solid #3498db",
              paddingBottom: "10px",
              width: "fit-content",
              margin: "0 auto 2rem auto",
              borderRadius: "10px",
              backgroundColor: "#4A6785",
              padding: "10px",
              border: "1px solid #3498db",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 0 20px rgba(0,0,0,0.2)",
              },
              "&:active": {
                transform: "scale(0.95)",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              },
            }}
          >
            إحصائيات النظام
          </h2>

          {/* Brokers count info */}
          <div className="mb-4 text-center">
            <p className="text-white text-sm sm:text-base">
              إجمالي الوسطاء:{" "}
              <span className="font-bold text-blue-300">{totalBrokers}</span>
            </p>
          </div>

          <div className="w-100 flex justify-center  ">
            <div className="w-100  flex items-center justify-start">
              <button className="flex items-center justify-center m-1 gap-2 bg-[#00AEEF] text-white text-lg font-medium px-6 py-3 rounded-[15px] w-[141px] h-[55px]">
                <Share2 size={24} className="transform scale-x-[-1]" />
                مشاركة
              </button>{" "}
              <button className="flex items-center justify-center m-1 gap-2 bg-[transparent] text-black border border-[var(--maincolor--)] text-lg font-medium px-6 py-3 rounded-[15px] w-[141px] h-[55px]">
                <Import />
                تصدير
              </button>
            </div>

            <div className="w-100 flex items-center justify-right" dir="rtl">
              <div className=" w-100  max-w-2xl  p-4">
                <div className="border border-2 border-blue flex items-center justify-between rounded-2xl px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="ابحث عن وسيط (الاسم، البريد، الطلبات)"
                    className=" flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400 "
                  />
                  <div className="flex items-center gap-2 text-black">
                    <span className="text-lg font-medium">بحث</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Container className="text-center mt-5">
            <Row className="justify-content-center">
              <Col md={3} sm={6} xs={12} className="mb-3">
                <Link className="text-white text-decoration-none">
                  <Card
                    className="shadow-lg"
                  >
                    <Card.Body>
                      <i  className="fas fa-users"></i>
                      <Card.Title>إجمالي العملاء</Card.Title>
                      <p
                        style={{
                          fontSize: "24px", // حجم الخط كبير وواضح
                          fontWeight: "900", // خط قوي جدًا
                          color: "red", // اللون الأسود
                          textAlign: "center", // محاذاة في المنتصف (اختياري)
                          letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                        }}
                      >
                        عميل {Statics.countAllUsers}
                      </p>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col md={3} sm={6} xs={12} className="mb-3 ">
                <Link className="text-white text-decoration-none">
                  <Card
                    className="shadow-lg"
                  >
                    <Card.Body>
                      <i
                        className="fas fa-clipboard-list"
                      ></i>
                      <Card.Title>الطلبات النشطه</Card.Title>
                      <p
                        style={{
                          fontSize: "24px", // حجم الخط كبير وواضح
                          fontWeight: "900", // خط قوي جدًا
                          color: "red", // اللون الأسود
                          textAlign: "center", // محاذاة في المنتصف (اختياري)
                          letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                        }}
                      >
                        عميل {Statics.countActiveOrders}
                      </p>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col md={3} sm={6} xs={12} className="mb-3 ">
                <Link className="text-white text-decoration-none">
                  <Card
                    className="shadow-lg"
                  >
                 
                    <Card.Body>
                      <i
                        className="fas fa-check-circle"
                      ></i>
                      <Card.Title>الطلبات المكتمله</Card.Title>
                      <p
                        style={{
                          fontSize: "24px", // حجم الخط كبير وواضح
                          fontWeight: "900", // خط قوي جدًا
                          color: "red", // اللون الأسود
                          textAlign: "center", // محاذاة في المنتصف (اختياري)
                          letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                        }}
                      >
                        طلب
                        {Statics.countDoneOrders}
                      </p>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col md={3} sm={6} xs={12} className="mb-3">
                <Link className="text-white text-decoration-none">
                  <Card
                    className="shadow-lg"
                  >
               
                    <Card.Body>
                      <i
                        className="fas fa-dollar-sign"
                      ></i>
                      <Card.Title>الايرادات</Card.Title>
                      <p
                        style={{
                          fontSize: "24px", // حجم الخط كبير وواضح
                          fontWeight: "900", // خط قوي جدًا
                          color: "red", // اللون الأسود
                          textAlign: "center", // محاذاة في المنتصف (اختياري)
                          letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                        }}
                      >
                        {Statics.exports}
                        <Card.Text>ريال سعودي</Card.Text>
                      </p>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </Row>
          </Container>
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "white",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                      borderBottom: "3px solid #3498db",
                      paddingBottom: "10px",
                      width: "fit-content",
                      margin: "0 auto 2rem auto",
                      borderRadius: "10px",
                      backgroundColor: "#4A6785",
                      padding: "10px",
                      border: "1px solid #3498db",
                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                      },
                      "&:active": {
                        transform: "scale(0.95)",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                      },
                    }}
                    className="card-title mb-4"
                  >
                    أداء الوسطاء
                  </h5>
                  <Table striped bordered hover>
                    <thead>
                      <tr className="text-center">
                        <th>الوسيط</th>
                        <th>البريد الالكتروني</th>
                        <th>التقييم</th>
                        <th>الطلبات المنجزة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="py-8">
                            <div className="flex justify-center items-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                              <span className="mr-2 text-gray-600">
                                جاري التحميل...
                              </span>
                            </div>
                          </td>
                        </tr>
                      ) : filteredBrokers.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد وسطاء متاحين"}
                          </td>
                        </tr>
                      ) : (
                        filteredBrokers.map((item, index) => (
                          <tr className="w-100 text-center" key={index}>
                            <td>{item.fullName}</td>
                            <td>{item.email}</td>
                            <td>
                              {
                                <td>
                                  <span className="text-warning">
                                    {item.count === 0 && (
                                      <>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                      </>
                                    )}

                                    {item.count > 0 && item.count <= 5 && (
                                      <>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                      </>
                                    )}

                                    {item.count > 5 && item.count <= 25 && (
                                      <>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                      </>
                                    )}

                                    {item.count > 25 && item.count <= 50 && (
                                      <>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                      </>
                                    )}

                                    {item.count > 50 && item.count <= 100 && (
                                      <>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                      </>
                                    )}

                                    {item.count > 100 && (
                                      <>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                      </>
                                    )}
                                  </span>
                                </td>
                              }
                            </td>
                            <td>{item.count}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>

                  {/* Pagination Component */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-6 mb-4">
                      <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
                        {/* Previous Button */}
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                            currentPage === 1
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105"
                          }`}
                        >
                          <ChevronRight size={20} />
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                          {getPageNumbers().map((page, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                typeof page === "number" && handlePageChange(page)
                              }
                              disabled={page === "..."}
                              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 text-sm font-medium ${
                                page === "..."
                                  ? "text-gray-400 cursor-default"
                                  : page === currentPage
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>

                        {/* Next Button */}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                            currentPage === totalPages
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105"
                          }`}
                        >
                          <ChevronLeft size={20} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Page Info */}
                  {totalPages > 1 && (
                    <div className="text-center text-white text-sm mb-4">
                      <span>
                        الصفحة {currentPage} من {totalPages}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
