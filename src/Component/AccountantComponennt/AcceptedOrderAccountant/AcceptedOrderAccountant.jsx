import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { Modal, Spinner, Button, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AcceptedOrderAccountant() {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [notes, setNotes] = useState(new Map());
  const [showNoteField, setShowNoteField] = useState(new Map());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setorder] = useState({});
  const [Bar, setBar] = useState(null);
  const [OrderId, setOrderId] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [ImageName, setImageName] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [DecodedTokken, setDecodedTokken] = useState();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleShowBar = (items, orderId) => {
    setOrderId(orderId);
    setBar(items);
  };
  const handleCloseBar = () => {
    setBar(null);
  };

  const handleShowDetails = (order, BrokerId) => {
    setSelectedOrder(order);
    getAllInformationBroker(BrokerId);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const navigationToLandingpage = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/Profile`, {
        withCredentials: true,
      });
      setDecodedTokken(data.data.role);
      setorder(data.data.id);
    } catch (error) {}
  };

  const GetFileName = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Name-File-From-CustomerService`,
        {
          newOrderId: OrderId,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);

      setIsLoading(false);
      setImageName(data);
    } catch (error) {
      
      setIsLoading(false);
    }
  };

  const DownloadFilesApi = async (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const getAllInformationBroker = async (BrokerId) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Informatiom-From-Broker`,
        {
          BrokerID: BrokerId,
        },
        {
          withCredentials: true,
        }
      );

      setSelectedOrder(data);
    } catch (error) {
      
    }
  };

  // تحديث حالة الملاحظات عند إدخالها
  const handleNoteChange = (id, value) => {
    setNotes((prevNotes) => {
      const newNotes = new Map(prevNotes);
      newNotes.set(id, value);
      return newNotes;
    });
  };

  // تحديث حالة الإظهار عند الضغط على الزر
  const toggleNoteField = (id) => {
    setShowNoteField((prev) => {
      const newShowNoteField = new Map(prev);
      newShowNoteField.set(id, !newShowNoteField.get(id));
      return newShowNoteField;
    });
  };

  // دالة تغيير الحالة وإرسال الملاحظات
  const ChangeStateNot = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-Account`,
        {
          statuOrder: "false",
          ID: id,
          Notes: notes.get(id) || "", // إرسال الملاحظات إن وجدت
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getAllAcceptedOrders(currentPage); // تحديث القائمة بعد الإرسال
    } catch (error) {
      
    }
  };

  // دالة تغيير الحالة إلى "تم التحويل"
  const ChangeStatedone = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-Account`,
        {
          statuOrder: "true",
          ID: id,
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحويل الطلب بنجاح");
      getAllAcceptedOrders(currentPage); // تحديث القائمة بعد الإرسال
    } catch (error) {
      
    }
  };

  // جلب جميع الطلبات المقبولة مع pagination
  const getAllAcceptedOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Done-Accept-Orders/${page}`,
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

  useEffect(() => {
    if (OrderId == null) {
    } else {
      GetFileName();
    }
  }, [OrderId]);

  useEffect(() => {
    getAllAcceptedOrders(currentPage);
    navigationToLandingpage();
  }, [currentPage]);

  const sortedCustomers = [...customers].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  // Filter data based on search term
  const filteredCustomers = sortedCustomers.filter((order) => {
    return searchTerm === "" || order.id.includes(searchTerm);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-[var(--secondColor--)] text-end text-lg sm:text-xl lg:text-2xl mt-3 sm:mt-4 lg:mt-5 mb-4 sm:mb-6">
          قائمه الحوالات للمخلصين
        </h1>

        {/* Orders count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي الطلبات:{" "}
            <span className="font-bold text-blue-300">{totalOrders}</span>
          </p>
        </div>
        
        {/* Responsive Search Bar */}
        <div className="w-full flex items-center justify-end mb-4 sm:mb-6">
          <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl p-2 sm:p-4">
            <div className="flex items-center justify-between border border-blue-300 rounded-lg px-3 sm:px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="ابحث عن طلب (رقم الطلب)"
                className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400 text-sm sm:text-base"
              />
              <div className="flex items-center gap-1 sm:gap-2 text-black">
                <span className="text-sm sm:text-lg font-medium hidden sm:block">بحث</span>
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

        {/* Responsive Table Container */}
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <Table
            className="table text-sm sm:text-base"
            striped
            bordered
            hover
            style={{ marginTop: "10px", width: "100%", minWidth: "800px" }}
          >
            <thead>
              <tr>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">رقم الطلب</th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">موقع الطلب</th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">الاسم</th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">نوع الطلب</th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">البريد الالكتروني</th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">المبلغ</th>
                {DecodedTokken && DecodedTokken === "Admin" && (
                  <>
                    <th className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">خدمه العملاء</th>
                    <th className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">بريد خدمه العملاء</th>
                  </>
                )}
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">التاريخ</th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">تفاصيل المخلص</th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">الحالة</th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">الملفات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={DecodedTokken && DecodedTokken === "Admin" ? 11 : 9} className="py-8">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      <span className="mr-2 text-gray-600">
                        جاري التحميل...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={DecodedTokken && DecodedTokken === "Admin" ? 11 : 9} className="text-center">
                    {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد طلبات مقبولة"}
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer, index) => (
                  <tr key={customer.id}>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">{customer.id}</td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">{customer.location}</td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">{customer.fullName}</td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">{customer.typeOrder}</td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">{customer.email}</td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">{customer.value}</td>
                    {DecodedTokken && DecodedTokken === "Admin" && (
                      <>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">{customer.customerServiceName}</td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">{customer.customerServiceEmail}</td>
                      </>
                    )}
                    <td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base">{customer.date}</td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3">
                      <Button
                        className="bg-primary text-white p-1 sm:p-2 text-xs sm:text-sm w-full sm:w-auto"
                        onClick={() =>
                          handleShowDetails(order, customer.brokerID)
                        }
                      >
                        عرض التفاصيل
                      </Button>
                    </td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          onClick={() => toggleNoteField(customer.id)}
                          className="bg-danger text-white text-xs sm:text-sm w-full sm:w-auto"
                        >
                          لم يتم التحويل
                        </Button>

                        {showNoteField[customer.id] && (
                          <Box mt={1} className="w-full">
                            <TextField
                              label="اكتب ملاحظة"
                              variant="outlined"
                              fullWidth
                              size="small"
                              value={notes.get(customer.id) || ""}
                              onChange={(e) =>
                                handleNoteChange(customer.id, e.target.value)
                              }
                              sx={{ marginBottom: "10px" }}
                            />
                            <Button
                              onClick={() => ChangeStateNot(customer.id)}
                              className="bg-danger text-white text-xs sm:text-sm w-full"
                            >
                              إرسال الملاحظة
                            </Button>
                          </Box>
                        )}

                        <Button
                          onClick={() => ChangeStatedone(customer.id)}
                          className="bg-success text-white text-xs sm:text-sm w-full sm:w-auto"
                        >
                          تم التحويل
                        </Button>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3 py-2 sm:py-3">
                      <Button
                        className="bg-primary text-white p-1 sm:p-2 text-xs sm:text-sm w-full sm:w-auto"
                        onClick={() => handleShowBar(index, customer.id)}
                      >
                        عرض تفاصيل الملاحظات
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

        {/* Responsive Modal for order details */}
        <Modal
          className="text-end"
          show={selectedOrder !== null}
          onHide={handleCloseDetails}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-base sm:text-lg lg:text-xl">تفاصيل الطلب</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-3 sm:p-4">
            {selectedOrder && (
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
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
                  <strong>الرقم الضريبي:</strong> {selectedOrder.taxRecord}
                </p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails} className="text-sm sm:text-base">
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Responsive Modal for file details */}
        <Modal
          className="text-center"
          show={Bar !== null}
          onHide={handleCloseBar}
          size="lg"
          centered
        >
          <Modal.Header
            closeButton
            className="bg-light rounded-top shadow-sm text-center"
          >
            <Modal.Title className="fs-4 sm:fs-3 fw-bold text-primary d-block">
              تفاصيل الطلب
              <small className="d-block text-muted fs-6 sm:fs-6">إدارة الطلبات</small>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="p-3 sm:p-4 bg-light rounded-bottom text-center">
            <div className="mb-3 sm:mb-4">
              <h5 className="text-success fw-bold text-base sm:text-lg">الملاحظات</h5>
              <p className="text-muted fs-6 sm:fs-6">{ImageName.notes}</p>
            </div>

            <div className="d-inline-block">
              <h5 className="text-success mb-2 sm:mb-3 text-base sm:text-lg">
                تحميل الملف
                <span style={{ color: "red", margin: "5px", fontSize: "clamp(0.75rem, 2vw, 1rem)" }}>
                  {ImageName.fileName}
                </span>
              </h5>
              <Button
                variant="success"
                onClick={() => DownloadFilesApi(ImageName.fileUrl)}
                disabled={IsLoading}
                className="px-3 sm:px-4 py-2 rounded-pill shadow text-sm sm:text-base"
              >
                {IsLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    جارٍ التحميل...
                  </>
                ) : (
                  "عرض الملف"
                )}
              </Button>
            </div>
          </Modal.Body>

          <Modal.Footer className="bg-light border-0 text-center">
            <Button
              variant="danger"
              onClick={handleCloseBar}
              className="px-3 sm:px-4 py-2 rounded-pill shadow text-sm sm:text-base"
            >
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </motion.div>
  );
}
