import { useEffect, useState } from "react";
import { Button, TableCell, Box, TextField } from "@mui/material";
import axios from "axios";
import { Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DoneOrders() {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [showNoteField, setShowNoteField] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [notes, setNotes] = useState({}); // حالة لتخزين الملاحظات لكل طلب
  const [Bar, setBar] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setorder] = useState({});
  const [ImageName, setImageName] = useState({});
  const [IsLoading, setIsLoading] = useState(false);
  const [OrderId, setOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

      setIsLoading(false);
      setImageName(data);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const DownloadFilesApi = async (fileUrl) => {
    window.open(fileUrl, "_blank");
  };
  ////////////////////////files //////////////////////
  const handleShowDetails = (order, BrokerId) => {
    setSelectedOrder(order);
    getAllInformationBroker(BrokerId);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };
  const DeleteNotes = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Delete-Notes-For-Admin`,
        {
          ID: OrderId,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {}
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
    } catch (error) {}
  };
  ///////////////////////notes //////////////////////
  const handleNoteChange = (id, value) => {
    setNotes((prevNotes) => ({ ...prevNotes, [id]: value }));
  };
  const toggleNoteField = (id) => {
    setShowNoteField((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const ChangeStateNotDone = async (id) => {
    try {
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-CustomerService`,
        {
          statuOrder: "false",
          ID: id,
          Notes: notes[id] || "", // إرسال الملاحظات إن وجدت
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getAllAcceptedOrders();
    } catch (error) {}
  };
  const ChangeStateDone = async (values) => {
    try {
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-CustomerService`,
        {
          statuOrder: "true",
          ID: values,
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getAllAcceptedOrders();
    } catch (error) {}
  };

  const getAllAcceptedOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Accept-Orders/${page}`,
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
    GetFileName();
    getAllAcceptedOrders(currentPage);
  }, [OrderId, currentPage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 2, transition: { duration: 1.7 } }}
      exit={{ opacity: 0 }}
    >
      <Box width="100%" textAlign="center" p={4}>
        <h1 className="font-bold  text-[var(--secondColor--)] text-end text-2xl mt-5 ">
          الطلبات المنفذه
        </h1>

        {/* Orders count info */}
        <div className="mb-4 text-center">
          <p className="text-white text-sm sm:text-base">
            إجمالي الطلبات المنفذة:{" "}
            <span className="font-bold text-blue-300">{totalOrders}</span>
          </p>
        </div>

        <div className=" w-100 flex items-center justify-end">
          <div className=" w-100  max-w-2xl  p-4">
            <div className="border border-2 border-blue flex items-center justify-between rounded-2xl px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
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

        <div className="table-responsive mt-3">
          <table className="table table-bordered text-center shadow-sm">
            <thead className="bg-white border">
              <tr>
                <th align="center">رقم الطلب</th>
                <th align="center">موقع الطلب</th>
                <th align="center">الاسم</th>
                <th align="center">الملاحظات</th>
                <th align="center">نوع الطلب</th>
                <th align="center">بريد الاكتروني</th>
                <th align="center">التاريخ</th>
                <th align="center">تفاصيل المخلص</th>
                <th align="center">تفاصيل الملاحظات</th>
                <th align="center">الحاله</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="py-8">
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
                  <td colSpan="10" className="text-center">
                    {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد طلبات منفذة للعرض"}
                  </td>
                </tr>
              ) : (
                filteredData.map((customer, index) => (
                  <tr sx={{ backgroundColor: "#f0f0f0" }} key={customer.id}>
                    <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.id}
                    </td>
                    <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.location}
                    </td>
                    <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.fullName}
                    </td>
                    <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.notes === "" ? (
                        <>لا يوجد ملاحظات</>
                      ) : (
                        <>{customer.notes}</>
                      )}
                    </td>
                    <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.typeOrder}
                    </td>
                    <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.email}
                    </td>
                    <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                      {customer.date}
                    </td>
                    <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                      <Button
                        className="bg-primary text-white p-2"
                        onClick={() => handleShowDetails(order, customer.brokerID)}
                      >
                        عرض التفاصيل
                      </Button>
                    </td>
                    <td align="center">
                      <Button
                        className="bg-primary text-white p-2"
                        onClick={() => handleShowBar(index, customer.id)}
                      >
                        عرض تفاصيل الملاحظات
                      </Button>
                    </td>

                    {showNoteField[customer.id] && (
                      <Box mt={1}>
                        <TextField
                          label="اكتب ملاحظة"
                          variant="outlined"
                          fullWidth
                          value={notes[customer.id] || ""}
                          onChange={(e) =>
                            handleNoteChange(customer.id, e.target.value)
                          }
                          sx={{ marginBottom: "10px" }}
                        />
                        <Button
                          onClick={() => ChangeStateNotDone(customer.id)}
                          className="bg-danger text-white"
                        >
                          إرسال الملاحظة
                        </Button>
                      </Box>
                    )}

                    <TableCell
                      sx={{ backgroundColor: "#f0f0f0" }}
                      className="p-3"
                      align="center"
                    >
                      <Button
                        onClick={() => toggleNoteField(customer.id)}
                        className="m-1 bg-danger text-white"
                      >
                        لم يتم التنفيذ
                      </Button>
                      <Button
                        onClick={() => ChangeStateDone(customer.id)}
                        className="m-1 bg-success text-white"
                      >
                        تم التنفيذ
                      </Button>
                    </TableCell>
                  </tr>
                ))
              )}

              <Modal
                className="text-end"
                show={selectedOrder !== null}
                onHide={handleCloseDetails}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="text-center w-100">
                    تفاصيل المخلص
                  </Modal.Title>
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

              <Modal
                className="text-center"
                show={Bar !== null}
                onHide={handleCloseBar}
              >
                {/* رأس المودال مع تصميم مميز */}
                <Modal.Header
                  closeButton
                  className="bg-light rounded-top shadow-sm text-center"
                >
                  <Modal.Title className="fs-3 fw-bold text-primary d-block w-100">
                    تفاصيل ملاحظات
                    <small className="d-block text-muted fs-6">
                      إدارة الملاحظات والملفات
                    </small>
                  </Modal.Title>
                </Modal.Header>

                {/* جسم المودال مع تنسيق أفضل */}
                <Modal.Body className="p-4 bg-light rounded-bottom text-center">
                  {/* عرض تفاصيل الملاحظات */}
                  <div className="mb-4">
                    <h5 className="text-success fw-bold">الملاحظات</h5>

                    {ImageName.fileName == null ? (
                      <>
                        {" "}
                        <p className="text-muted fs-6">لا توجد ملاحظات</p>
                      </>
                    ) : (
                      <>
                        <p className="text-muted fs-6">{ImageName.notes}</p>

                        <Button
                          onClick={() => DeleteNotes()}
                          className="btn bg-danger text-white"
                        >
                          حذف الملاحظات
                        </Button>
                      </>
                    )}
                  </div>

                  {/* قسم التحميل مع زر مميز */}
                  <div className="d-inline-block">
                    <h5 className="text-success mb-3">
                      <span style={{ color: "red", margin: "10px" }}>
                        {ImageName.fileName == null ? (
                          <>لا يوجد ملف </>
                        ) : (
                          <>{ImageName.fileName}</>
                        )}
                      </span>
                    </h5>
                    {ImageName.fileName == null ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        انتظر قليلا لعرض الملف
                      </>
                    ) : (
                      <>
                        <Button
                          variant="success"
                          onClick={() => DownloadFilesApi(ImageName.fileUrl)}
                          disabled={IsLoading}
                          className="px-4 py-2 rounded-pill shadow"
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
                      </>
                    )}
                  </div>
                </Modal.Body>

                {/* قدم المودال مع زر إغلاق مميز */}
                <Modal.Footer className="bg-light border-0 text-center">
                  <Button
                    variant="danger"
                    onClick={handleCloseBar}
                    className="px-4 py-2 rounded-pill shadow"
                  >

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
