import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Table } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DoneOrdersForUser = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  const GetDoneOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Accept-Orders-Users/${page}`,
        {
          withCredentials: true,
        }
      );

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setData(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalOrders(data.totalOrders || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setData(data);
        setTotalPages(1);
        setTotalOrders(data.length);
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
    GetDoneOrders(currentPage);
  }, [currentPage]);

  // Filter data based on search term
  const filteredData = data.filter((order) => {
    return searchTerm === "" || order.id.includes(searchTerm);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      <div className="container mt-5 text-center">
        <h3 className="font-bold text-[var(--secondColor--)] text-end text-2xl mt-5">
          الطلبات المنفذه
        </h3>

        {/* Orders count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي الطلبات المنفذة:{" "}
            <span className="font-bold text-blue-300">{totalOrders}</span>
          </p>
        </div>

        <div className="w-100 flex items-center justify-end">
          <div className="w-100 max-w-2xl p-4">
            <div className="flex items-center justify-between border border-blue-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="ابحث عن طلب (رقم الطلب)"
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

        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>رقم الطلب</th>
              <th>موقع الطلب</th>
              <th>نوع الطلب</th>
              <th>الحالة</th>
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
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد طلبات منفذة للعرض"}
                </td>
              </tr>
            ) : (
              filteredData.map((order) => (
                <tr key={order.id}>
                  <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
                    {order.id}
                  </td>
                  <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
                    {order.location}
                  </td>
                  <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
                    {order.typeOrder}
                  </td>
                  <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
                    {order.statuOrder}
                  </td>
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
    </motion.div>
  );
};

export default DoneOrdersForUser;
