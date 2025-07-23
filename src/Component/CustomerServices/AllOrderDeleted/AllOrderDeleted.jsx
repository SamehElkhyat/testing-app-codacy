import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AllOrderDeleted() {
  const [DecodedTokken, setDecodedTokken] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };
  const navigationToLandingpage = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/Profile`, {
        withCredentials: true,
      });
      setDecodedTokken(data.data.role);
    } catch (error) {
      setLoading(false);
    }
  };

  const getAllDeletedOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Deleted-Orders/${page}`,
        {
          withCredentials: true,
        }
      );

      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setCustomers(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalOrders(data.totalOrders || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setCustomers(data);
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
  const sortedCustomers = [...customers].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  // Filter data based on search term
  const filteredData = sortedCustomers.filter((order) => {
    return searchTerm === "" || order.id.includes(searchTerm);
  });

  useEffect(() => {
    getAllDeletedOrders(currentPage);
    navigationToLandingpage();
  }, [currentPage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      <Box width="100%" textAlign="center" p={4}>
        <h1 className="font-bold  text-[var(--secondColor--)] text-end text-2xl mt-5 ">
          الطلبات المحذوفه
        </h1>

        {/* Orders count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي الطلبات المحذوفة:{" "}
            <span className="font-bold text-blue-300">{totalOrders}</span>
          </p>
        </div>

        <div className="w-100 flex items-center justify-end">
          <div className="w-100  max-w-2xl  p-4">
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

        <div className="table-responsive mt-3">
          <table className="table table-bordered text-center shadow-sm">
            <thead className="bg-white border">
              <tr>
                <th>رقم الطلب</th>
                <th>الموقع</th>
                <th>الملاحظات</th>
                {DecodedTokken ? (
                  <>
                    {DecodedTokken === "Admin" ? (
                      <>
                        <th>خدمه العملاء</th>
                        <th>بريد خدمه العملاء</th>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}

                <th>نوع الطلب</th>
                <th>التاريخ</th>
                <th>حاله الطلب</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={DecodedTokken === "Admin" ? 8 : 6} className="py-8">
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
                  <td colSpan={DecodedTokken === "Admin" ? 8 : 6} className="text-center">
                    {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد طلبات محذوفة للعرض"}
                  </td>
                </tr>
              ) : (
                filteredData.map((customer, index) => (
                  <tr key={index} className="bg-light">
                    <td>{customer.id}</td>
                    <td>{customer.location}</td>
                    <td>{customer.notes}</td>
                    {DecodedTokken ? (
                      <>
                        {DecodedTokken === "Admin" ? (
                          <>
                            <td>{customer.customerServiceEmail}</td>
                            <td>{customer.customerServiceName}</td>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    <td>{customer.typeOrder}</td>

                    <td>{customer.date}</td>
                    <td>
                      <Button className="bg-danger text-white p-2">
                        {customer.statuOrder}
                      </Button>
                    </td>
                  </tr>
                ))
              )}

              <Modal
                className="text-end"
                show={selectedOrder !== null}
                onHide={handleCloseDetails}
              >
                <Modal.Header closeButton>
                  <Modal.Title>تفاصيل الطلب</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedOrder && (
                    <>
                      <p>
                        {selectedOrder.email} <strong>:البريد الإكتروني</strong>
                      </p>
                      <p>
                        <strong>الاسم:</strong> {selectedOrder.fullName}
                      </p>
                      <p>
                        <strong>رقم الهويه:</strong> {selectedOrder.identity}
                      </p>
                      <p>
                        <strong>رقم الهاتف:</strong> {selectedOrder.phoneNumber}
                      </p>
                      <p>
                        <strong>رخصه المخلص:</strong> {selectedOrder.license}
                      </p>
                      <p>
                        <strong>الرقم الضريبي:</strong>{" "}
                        {selectedOrder.taxRecord}
                      </p>
                    </>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseDetails}>
                    إغلاق
                  </Button>
                </Modal.Footer>
              </Modal>
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
    </motion.div>
  );
}
