import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Form, Button, Modal, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min";
import { toast } from "react-toastify";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BrookersCart = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  function WalletInfo() {
    const [InfoOrders, setInfoOrders] = useState({});
    const InformationAboutOrder = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Count-Accept-Failed-Wait-Orders-Broker`,
          {
            withCredentials: true,
          }
        );
        setInfoOrders(data);
      } catch (error) {
        
      }
    };

    useEffect(() => {
      InformationAboutOrder();
    }, []);
    const data = [
      { value: 8 },
      { value: 4 },
      { value: 5 },
      { value: 10 },
      { value: 6 },
      { value: 8 },
      { value: 8 },
      { value: 20 },
      { value: 8 },
      { value: 8 },
      { value: 34 },
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <Row className="flex flex-col w-full m-2 sm:m-4 gap-4">
          <p className="text-end text-[var(--secondColor--)] font-bold text-lg sm:text-xl p-2">حاله الطلبات</p>
          <div className="first-col-use flex flex-col md:flex-row gap-3 w-full">
            <div className="box p-2 w-full md:w-1/3">
              <Col className="mb-3">
                <Link
                  className="text-white text-decoration-none"
                >
                  <Card className="p-3">
                    <Card.Body>
                      <div className="position-absolute">
                        <i className="text-[#E31D1D] fa-3x mb-2 fas fa-times-circle text-[clamp(24px, 5vw, 30px)]"></i>
                      </div>
                      <p
                        style={{
                          fontSize: "clamp(1rem, 3vw, 1.2rem)",
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                        className="text-end"
                      >
                        عدد الطلبات الملغاه
                      </p>
                      <div className="card-body text-end">
                        <p className="display-6 sm:display-5 fw-bold">
                          {InfoOrders.failedOrder}
                        </p>
                      </div>

                      <div className="h-10 mt-2 mb-0">
                        <ResponsiveContainer width="100%" height="110%">
                          <AreaChart data={data}>
                            <defs>
                              <linearGradient
                                id="colorUv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#8884d8"
                                  stopOpacity={0.4}
                                />
                                <stop
                                  height="150%"
                                  offset="100%"
                                  stopColor="#FF797B"
                                  stopOpacity={1.2}
                                />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#8884d8"
                              fill="url(#colorUv)"
                              strokeWidth={2}
                              dot={false}
                            />
                            <Tooltip content={null} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </div>
            <div className="box p-2 w-full md:w-1/3">
              <Col className="mb-3">
                <Link
                  className="text-white text-decoration-none"
                >
                  <Card className="p-3">
                    <Card.Body>
                      <div className="position-absolute">
                        <i className="text-[orange] p-2 text-end w-full fa-3x mb-2 fas fa-clock text-[var(--secondColor--)] text-[clamp(24px, 5vw, 30px)]"></i>
                      </div>
                      <p
                        style={{
                          fontSize: "clamp(1rem, 3vw, 1.5rem)", // حجم الخط كبير وواضح
                          fontWeight: "900", // خط قوي جدًا
                          color: "#000", // اللون الأسود
                          textAlign: "center", // محاذاة في المنتصف (اختياري)
                          letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                        }}
                        className="text-end"
                      >
                        عدد الطلبات المنتظره
                      </p>
                      <div className="card-body text-end">
                        <p className="display-6 sm:display-5 fw-bold">
                          {InfoOrders.waitOrder}
                        </p>
                      </div>
                      <div className="h-10 mt-2 mb-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data}>
                            <defs>
                              <linearGradient
                                id="colorUv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#8884d8"
                                  stopOpacity={0.4}
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#FF797B"
                                  stopOpacity={1.2}
                                />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#8884d8"
                              fill="url(#colorUv)"
                              strokeWidth={2}
                              dot={false}
                            />
                            <Tooltip content={null} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </div>
            <div className="box p-2 w-full md:w-1/3">
              <Col className="mb-3">
                <Link
                  className="text-white text-decoration-none"
                >
                  <Card className="p-3">
                    <Card.Body>
                      <div className="position-absolute">
                        <i className="fa-3x mb-2 p-2 text-end w-full fas fa-check-circle text-[#76C248] text-[clamp(24px, 5vw, 30px)]"></i>
                      </div>
                      <p
                        style={{
                          fontSize: "clamp(1rem, 3vw, 1.5rem)", // حجم الخط كبير وواضح
                          fontWeight: "900", // خط قوي جدًا
                          color: "#000", // اللون الأسود
                          textAlign: "center", // محاذاة في المنتصف (اختياري)
                          letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                        }}
                        className="text-end"
                      >
                        عدد الطلبات الناجحه
                      </p>
                      <div className="card-body text-center">
                        <p className="display-6 sm:display-5 fw-bold">
                          {InfoOrders.acceptOrder}
                        </p>
                      </div>

                      <div className="h-10 mt-2 mb-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data}>
                            <defs>
                              <linearGradient
                                id="colorUv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#8884d8"
                                  stopOpacity={0.4}
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#FF797B"
                                  stopOpacity={1.2}
                                />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#8884d8"
                              fill="url(#colorUv)"
                              strokeWidth={2}
                              dot={false}
                            />
                            <Tooltip content={null} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </div>
          </div>
          <p className="text-end text-[var(--secondColor--)] font-bold text-lg sm:text-xl p-2">حاله المدفوعات </p>
          <div className="second-col-usr flex flex-col md:flex-row gap-3 w-full">
            <div className="box p-2 w-full md:w-1/3">
              <Col className="mb-3">
                <Link
                  className="text-white text-decoration-none"
                >
                  <Card className="p-3">
                    <Card.Body>
                      <div className="position-absolute">
                        <i className="text-[#E31D1D] fa-3x fa-solid mb-2 fa-sack-dollar text-[clamp(24px, 5vw, 30px)]"></i>
                      </div>
                      <p
                        style={{
                          fontSize: "clamp(1rem, 3vw, 1.2rem)",
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                        className="text-end"
                      >
                        المبالغ التي لم يتم تحويلها
                      </p>
                      <div className="card-body text-center">
                        <p className="display-6 sm:display-5 fw-bold">
                          {InfoOrders.totalFailedRequests}
                        </p>
                      </div>
                      <div className="h-10 mt-2 mb-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data}>
                            <defs>
                              <linearGradient
                                id="colorUv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#8884d8"
                                  stopOpacity={0.4}
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#FF797B"
                                  stopOpacity={1.2}
                                />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#8884d8"
                              fill="url(#colorUv)"
                              strokeWidth={2}
                              dot={false}
                            />
                            <Tooltip content={null} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </div>
            <div className="box p-2 w-full md:w-1/3">
              <Col className="mb-3">
                <Link
                  className="text-white text-decoration-none"
                >
                  <Card className="p-3">
                    <Card.Body>
                      <div className="position-absolute">
                        <i className="text-[orange] fa-3x fa-solid mb-2 fa-sack-dollar text-[clamp(24px, 5vw, 30px)]"></i>
                      </div>

                      <p
                        style={{
                          fontSize: "clamp(1rem, 3vw, 1.2rem)",
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                        className="text-end"
                      >
                        المبالغ المنتظره{" "}
                      </p>

                      <div className="card-body text-center">
                        <p className="display-6 sm:display-5 fw-bold">
                          {InfoOrders.totalWaitRequests}
                        </p>
                      </div>

                      <div className="h-10 mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data}>
                            <defs>
                              <linearGradient
                                id="colorUv"
                                x1="1"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#8884d8"
                                  stopOpacity={0.4}
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#FF797B"
                                  stopOpacity={1.2}
                                />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#8884d8"
                              fill="url(#colorUv)"
                              strokeWidth={2}
                              dot={false}
                            />
                            <Tooltip content={null} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </div>
            <div className="box p-2 w-full md:w-1/3">
              <Col className="mb-3">
                <Link
                  className="text-white text-decoration-none"
                >
                  <Card className="p-3">
                    <Card.Body>
                      <div className="position-absolute">
                        <i className="text-[var(--succsses--)] fa-3x fa-solid mb-2 fa-sack-dollar text-[clamp(24px, 5vw, 30px)]"></i>
                      </div>

                      <p
                        style={{
                          fontSize: "clamp(1rem, 3vw, 1.2rem)",
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                        className="text-end"
                      >
                        المبالغ التي تم تحويلها{" "}
                      </p>

                      <div className="card-body text-center">
                        <p className="display-6 sm:display-5 fw-bold">
                          {InfoOrders.totalSuccessfulRequests}
                        </p>
                      </div>

                      <div className="h-10 mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data}>
                            <defs>
                              <linearGradient
                                id="colorUv"
                                x1="1"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#8884d8"
                                  stopOpacity={0.4}
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#FF797B"
                                  stopOpacity={1.2}
                                />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#8884d8"
                              fill="url(#colorUv)"
                              strokeWidth={2}
                              dot={false}
                            />
                            <Tooltip content={null} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </div>
          </div>
        </Row>
      </motion.div>
    );
  }

  const allOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://user.runasp.net/api/Wallet/${page}`, {
        withCredentials: true,
      });

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setOrders(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalOrders(data.totalOrders || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setOrders(data);
        setTotalPages(1);
        setTotalOrders(data.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
  };

  // إغلاق نافذة التفاصيل
  const handleCloseDetails = () => {
    setSelectedOrder(null);
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
    allOrders(currentPage);
  }, [currentPage]);

  // Filter data based on search term
  const filteredData = orders.filter((order) => {
    return searchTerm === "" || order.id.includes(searchTerm);
  });

  return (
    <div className="container mt-3 sm:mt-4 md:mt-5 p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <WalletInfo />
        
        {/* Orders count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي الطلبات:{" "}
            <span className="font-bold text-blue-300">{totalOrders}</span>
          </p>
        </div>

         <div className="w-full flex items-center justify-end">
            <div className="w-full max-w-2xl p-2 sm:p-4">
              <div className="flex items-center justify-between border border-blue-300 rounded-lg px-3 sm:px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="ابحث عن طلب (رقم الطلب)"
                  className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400 text-sm sm:text-base"
                />
                <div className="flex items-center gap-2 text-black">
                  <span className="text-base sm:text-lg font-medium">بحث</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
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

        <div className="overflow-x-auto">
          <Table striped bordered hover className="text-sm sm:text-base">
            <thead>
              <tr>
                <th className="text-xs sm:text-sm md:text-base">رقم الطلب</th>
                <th className="text-xs sm:text-sm md:text-base">موقع الطلب</th>
                <th className="text-xs sm:text-sm md:text-base">نوع الطلب</th>
                <th className="text-xs sm:text-sm md:text-base">الحالة</th>
                <th className="text-xs sm:text-sm md:text-base">المبلغ</th>
                <th className="text-xs sm:text-sm md:text-base">التفاصيل</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      <span className="mr-2 text-gray-600">
                        جاري التحميل...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد طلبات للعرض"}
                  </td>
                </tr>
              ) : (
                filteredData.map((order) => (
                  <tr key={order.id}>
                    <td className="text-xs sm:text-sm md:text-base">{order.id}</td>
                    <td className="text-xs sm:text-sm md:text-base">{order.location}</td>
                    <td className="text-xs sm:text-sm md:text-base">{order.typeOrder}</td>
                    <td className="text-xs sm:text-sm md:text-base">{order.statuOrder}</td>
                    <td className="text-xs sm:text-sm md:text-base">{order.value} ريال</td>
                    <td className="text-xs sm:text-sm md:text-base">
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleShowDetails(order)}
                        className="text-xs sm:text-sm"
                      >
                        عرض التفاصيل
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

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

        {/* نافذة تفاصيل الطلب */}
        <Modal show={selectedOrder !== null} onHide={handleCloseDetails} size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="text-sm sm:text-base md:text-lg">تفاصيل الطلب</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-sm sm:text-base">
            {selectedOrder && (
              <>
                <p>
                  <strong>رقم الطلب:</strong> {selectedOrder.iDstring}
                </p>
                <p>
                  <strong>موقع الطلب:</strong> {selectedOrder.location}
                </p>
                <p>
                  <strong>نوع الطلب:</strong> {selectedOrder.typeOrder}
                </p>
                <p>
                  <strong>الحالة:</strong> {selectedOrder.statuOrder}
                </p>
                <p>
                  <strong>المبلغ:</strong> {selectedOrder.value} ريال
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails} className="text-sm sm:text-base">
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
      </motion.div>
    </div>
  );
};

export default BrookersCart;
