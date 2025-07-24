import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ClientsManger() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [Ishovered1, setIshovered1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalClients, setTotalClients] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const styles = {
    cards1: {
      color: "black",
      backgroundColor: "#B3D4FF",
      transform: Ishovered1 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered1 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },

    icons: {
      fontSize: "50px",
      padding: "20px",
    },
  };

  const Block = async (email) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/Blocked`,
        {
          Email: email,
        },
        {
          withCredentials: true,
        }
      );
      CustomerService();
    } catch (error) {}
  };

  const UnBlock = async (email) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/Unblocked`,
        {
          Email: email,
        },
        {
          withCredentials: true,
        }
      );
      CustomerService();
    } catch (error) {}
  };

  const CustomerService = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/Get-User/${page}`,
        {
          withCredentials: true,
        }
      );

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setSelectedOrder(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalClients(data.totalClients || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setSelectedOrder(data);
        setTotalPages(1);
        setTotalClients(data.length);
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

  // Filter data based on search term
  const filteredData = selectedOrder.filter((customer) => {
    return (
      searchTerm === "" ||
      customer.fullName?.includes(searchTerm) ||
      customer.email?.includes(searchTerm) ||
      customer.identity?.includes(searchTerm) ||
      customer.phoneNumber?.includes(searchTerm)
    );
  });

  useEffect(() => {
    CustomerService(currentPage);
  }, [currentPage]);

  return (
    <>
      <Box
        className="justify-content-center"
        width="100%"
        textAlign="center"
        p={4}
      >
        <Row className="justify-content-center">
          <Col md={3} sm={6} xs={12} className="Col1 mb-3 ">
            <Link
              className="text-white text-decoration-none"
              to="/AllClientsManger"
            >
              <Card
                style={styles.cards1}
                onMouseLeave={() => setIshovered1(false)}
                onMouseEnter={() => setIshovered1(true)}
                className="shadow-lg"
              >
                <Card.Body>
                  <i
                    className=" fa-solid fa-tty text-black"
                    style={styles.icons}
                  ></i>

                  <div className="content">
                    <p>قم باداره العملاء</p>
                  </div>

                  <Card.Title>تفاصيل العملاء</Card.Title>
                  <Card.Text>الذهاب الي العملاء.</Card.Text>
                  <div className="info d-flex justify-content-end">
                    <Button className="bg-black text-white border-none ">
                      <ArrowRightAltIcon />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>

        <h1
          className="text-xl font-bold mb-4"
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
          العملاء
        </h1>

        {/* Clients count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي العملاء:{" "}
            <span className="font-bold text-blue-300">{totalClients}</span>
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-100 flex items-center justify-end mb-4">
          <div className="w-100 max-w-2xl p-4">
            <div className="flex items-center justify-between border border-blue-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="ابحث عن عميل (الاسم، البريد، الهوية، الهاتف)"
                className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400"
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

        <div className="table-responsive mt-3">
          <table className="table table-bordered text-center shadow-sm">
            <thead className="bg-white border">
              <tr>
                <th align="center">الاسم</th>
                <th align="center">البريد الالكتروني</th>
                <th align="center">رقم الهويه</th>
                <th align="center">الهاتف</th>
                <th align="center">حظر</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-8">
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
                  <td colSpan="5" className="text-center">
                    {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد عملاء للعرض"}
                  </td>
                </tr>
              ) : (
                filteredData.map((customer, index) => (
                  <tr
                    onClick={() => navigate(`/ProfileUsers/${customer.id}`)}
                    key={index}
                    className="bg-light cursor-pointer hover:bg-gray-50"
                  >
                    <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.fullName}
                    </td>
                    <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.email}
                    </td>
                    <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.identity}
                    </td>
                    <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.phoneNumber}
                    </td>
                    <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.isBlocked ? (
                        <>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              UnBlock(customer.email);
                            }}
                            className="bg-success text-black"
                          >
                            فك الحظر
                          </Button>
                        </>
                      ) : (
                        <>
                          {" "}
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              Block(customer.email);
                            }}
                            className="bg-danger text-black"
                          >
                            حظر
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
      </Box>
    </>
  );
}
