import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Import, Share2 } from "lucide-react"; // أيقونة مشاركة

export default function FormResopnse() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  const CustomerService = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE4}/Get-Form?page=${page}&search=${search}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);

      setSelectedOrder(data.data || data);
      setTotalPages(data.totalPages || 1);
      setTotalUsers(data.totalUser || data.length);
      setCurrentPage(page);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    CustomerService();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    CustomerService(page, searchTerm);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    CustomerService(1, value);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
        >
          السابق
        </button>
      );
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-3 py-2 mx-1 text-sm font-medium text-gray-500">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 text-sm font-medium rounded-lg ${
            i === currentPage
              ? "text-white bg-blue-600 border border-blue-600"
              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-3 py-2 mx-1 text-sm font-medium text-gray-500">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
        >
          التالي
        </button>
      );
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
          {" "}
          <h1
            className="text-xl font-bold mb-4"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
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
            الشكاوي والاقتراحات
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
                    onChange={handleSearch}
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
          
          {/* Responsive table container */}
          <div className="table-responsive mt-3 overflow-x-auto">
            <div className="min-w-full">
              <table className="table table-bordered text-center shadow-sm w-full">
                <thead className="bg-white border">
                  <tr>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">الاسم</th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">البريد الالكتروني</th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">الهاتف</th>
                    <th className="px-2 py-3 text-xs sm:text-sm md:text-base">الرساله</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="mr-2">جاري التحميل...</span>
                        </div>
                      </td>
                    </tr>
                  ) : selectedOrder.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">
                        لا توجد بيانات للعرض
                      </td>
                    </tr>
                  ) : (
                    selectedOrder.map((customer, index) => (
                      <tr key={index} className="bg-light">
                        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">{customer.fullName}</td>
                        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">{customer.email}</td>
                        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">{customer.phoneNumber}</td>
                        <td className="px-2 py-3 text-xs sm:text-sm md:text-base">{customer.message}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 mb-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {renderPagination()}
              </div>
            </div>
          )}

          {/* Page Info */}
          {totalUsers > 0 && (
            <div className="text-center text-sm text-gray-600 mb-4">
              عرض {((currentPage - 1) * 12) + 1} إلى {Math.min(currentPage * 12, totalUsers)} من {totalUsers} نتيجة
            </div>
          )}
        </motion.div>

        <Toaster />
      </Box>
    </>
  );
}
