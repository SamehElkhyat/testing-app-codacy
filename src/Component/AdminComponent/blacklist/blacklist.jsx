import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Import, Share2, ChevronLeft, ChevronRight } from "lucide-react"; // أيقونة مشاركة


export default function Blacklist() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);


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
      GetBlackList();
    } catch (error) {
      
    }
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
      GetBlackList();
    } catch (error) {
      
    }
  };

  const GetBlackList = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Black-List/${page}`,
        {
          withCredentials: true,
        }
      );

      setSelectedOrder(response.data.data);
      setTotalPages(response.data.totalPages || 1);
      setTotalUsers(response.data.totalUser || 0);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetBlackList(currentPage);
  }, [currentPage]);

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
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <>
      <Box width="100%" textAlign="center" p={{ xs: 2, sm: 3, md: 4 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 2, transition: { duration: 1.7 } }}
          exit={{ opacity: 0 }}
        >
          <h1
            className="text-xl font-bold mb-4"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: "700",
              color: "#2c3e50",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              borderBottom: "3px solid #3498db",
              paddingBottom: "10px",
              width: "fit-content",
              margin: "0 auto 2rem auto",
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
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
            المحظورين
          </h1>
          
          {/* Responsive container for buttons and search */}
          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 mb-6">
            {/* Buttons container */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center gap-2">
              <button className="flex items-center justify-center gap-2 bg-[#00AEEF] text-white text-base sm:text-lg font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-[15px] w-full sm:w-[141px] h-[45px] sm:h-[55px]">
                <Share2 size={20} className="transform scale-x-[-1] sm:w-6 sm:h-6" />
                <span className="hidden sm:inline">مشاركة</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-[transparent] text-black border border-[var(--maincolor--)] text-base sm:text-lg font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-[15px] w-full sm:w-[141px] h-[45px] sm:h-[55px]">
                <Import size={20} className="sm:w-6 sm:h-6" />
                <span className="hidden sm:inline">تصدير</span>
              </button>
            </div>

            {/* Search container */}
            <div className="w-full lg:w-auto flex items-center justify-center" dir="rtl">
              <div className="w-full max-w-2xl p-2 sm:p-4">
                <div className="border border-2 border-blue flex items-center justify-between rounded-2xl px-3 sm:px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
                    className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400 text-sm sm:text-base"
                  />
                  <div className="flex items-center gap-1 sm:gap-2 text-black">
                    <span className="text-sm sm:text-lg font-medium hidden sm:inline">بحث</span>
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
          </div>

          {/* Users count info */}
          <div className="mb-4 text-center">
            <p className="text-white text-sm sm:text-base">
              إجمالي المحظورين: <span className="font-bold text-blue-300">{totalUsers}</span>
            </p>
          </div>

          {/* Responsive table container */}
          <div className="table-responsive mt-3 overflow-x-auto">
            <div className="min-w-full">
              <table className="table table-bordered text-center shadow-sm w-full">
                <thead className="bg-white border">
                  <tr>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">الاسم</th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">البريد الالكتروني</th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">رقم الهوية</th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">الهاتف</th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">الملف الشخصي</th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">حظر</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="mr-2">جاري التحميل...</span>
                        </div>
                      </td>
                    </tr>
                  ) : selectedOrder.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-500">
                        لا توجد بيانات للعرض
                      </td>
                    </tr>
                  ) : (
                    selectedOrder.map((customer, index) => (
                      <tr key={index} className="bg-light">
                        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">{customer.fullName}</td>
                        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">{customer.email}</td>
                        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">{customer.identity}</td>
                        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">{customer.phoneNumber}</td>
                        <td className="px-2 py-3">
                          <Button
                            onClick={() => navigate(`/ProfileUsers/${customer.id}`)}
                            className="btn btn-primary text-white text-xs sm:text-sm md:text-base"
                          >
                            عرض الملف الشخصي
                          </Button>
                        </td>
                        <td className="px-2 py-3">
                          {customer.isBlocked ? (
                            <button
                              onClick={() => UnBlock(customer.email)}
                              className="btn btn-success text-black text-xs sm:text-sm md:text-base"
                            >
                              فك الحظر
                            </button>
                          ) : (
                            <button
                              onClick={() => Block(customer.email)}
                              className="btn btn-danger text-black text-xs sm:text-sm md:text-base"
                            >
                              حظر
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
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
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && handlePageChange(page)}
                      disabled={page === '...'}
                      className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 text-sm font-medium ${
                        page === '...'
                          ? 'text-gray-400 cursor-default'
                          : page === currentPage
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
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
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
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
        </motion.div>

        <Toaster />
      </Box>
    </>
  );
}
