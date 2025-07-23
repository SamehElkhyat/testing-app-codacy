import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Table,
} from "react-bootstrap";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TransferOrders() {
  const [CustomersOrders, setCustomersOrders] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [Bar, setBar] = useState(null);
  const [OrderId, setOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm3, setSearchTerm3] = useState("");
  const [DecodedTokken, setDecodedTokken] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);

  const SendIdSuccses = async (ID) => {
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-Broker`,
        {
          ID: ID,
          statuOrder: "true",
        },
        {
          withCredentials: true,
        }
      );

      toast("تم التنفيذ");
      getCustomersOrders(currentPage);
    } catch (error) {
      
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      formik.setFieldValue("formFile", e.target.files[0]); // تعيين الملف مباشرة
    }
  };

  // sadsssssssssssssssssssssssssss//
  const SendIdCancel = async (ID) => {
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-Broker`,
        {
          ID: ID,
          statuOrder: "false",
        },
        {
          withCredentials: true,
        }
      );
      toast("تم الالغاء");
      getCustomersOrders(currentPage);
    } catch (error) {
      
    }
  };

  const handleShowBar = (items, orderdid) => {
    setOrderId(orderdid);
    setBar(items);
  };
  const handleCloseBar = () => {
    setBar(null);
  };

  const getCustomersOrders = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Order-Transfer-From-CustomerService/${page}`,
        {
          withCredentials: true,
        }
      );
      
      // Handle both paginated and non-paginated responses
      if (data.data && data.totalPages !== undefined) {
        // Paginated response
        setCustomersOrders(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalOrders(data.totalOrders || data.data.length);
      } else {
        // Non-paginated response (fallback)
        setCustomersOrders(data);
        setTotalPages(1);
        setTotalOrders(data.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const SendFile = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("formFile", values.formFile); // تعيين الملف الصحيح
    formData.append("Notes", values.Notes);
    formData.append("newOrderId", OrderId);
    // التأكد من إرسال OrderId الصحيح

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Notes-From-CustomerService`,
        formData,
        {
          withCredentials: true,
        }
      );
      setIsLoading(false);
      toast.success("تم تقديم الملاحظات بنجاح");
      setBar(null);
    } catch (error) {
      
      setIsLoading(false);
    }
  };

  let formik = useFormik({
    initialValues: {
      Notes: "",
      formFile: "",
    },
    onSubmit: SendFile,
  });

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
    getCustomersOrders(currentPage);
  }, [currentPage]);

  // Filter data based on search term
  const filteredData = CustomersOrders.filter((order) => {
    return searchTerm3 === "" || order.id.includes(searchTerm3);
  });

  return (
    <>
      <h3 className="font-bold  text-[var(--secondColor--)] text-end text-2xl mt-5 p-3 ">
        عروض تم تحويلها من خدمه العملاء{" "}
      </h3>

      {/* Orders count info */}
      <div className="mb-4 text-center">
        <p className="text-white text-sm sm:text-base">
          إجمالي الطلبات:{" "}
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

      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>التاريخ</th>
            <th>الملاحظات</th>
            <th>اسم (الميناء/المطار)</th>
            <th>رقم الطلب</th>
            {DecodedTokken ? (
              <>
                {DecodedTokken.Role === "Admin" ? (
                  <>
                    <th>بريد المخلص</th>
                    <th>اسم المخلص</th>
                    <th>بريد خدمه العملاء</th>
                    <th>خدمه العملاء</th>
                  </>
                ) : (
                  <>
                    <th>الحالة</th>
                  </>
                )}
              </>
            ) : (
              <>
                <th>الحالة</th>
              </>
            )}
            <th>إضافه ملاحظات</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9" className="py-8">
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
              <td colSpan="9" className="text-center">
                {searchTerm3 ? "لا توجد نتائج للبحث" : "لا توجد عروض تم تحويلها من خدمه العملاء"}
              </td>
            </tr>
          ) : (
            filteredData.map((order) => (
              <tr key={order.id}>
                <td>{order.date}</td>
                <td>
                  {order.notes == null ? (
                    <>لا توجد ملاحظات</>
                  ) : (
                    <>{order.notes}</>
                  )}
                </td>
                <td>{order.location}</td>
                <td>{order.id}</td>
                {DecodedTokken ? (
                  <>
                    {DecodedTokken.Role === "Admin" ? (
                      <>
                        <td>{order.brokerEmail}</td>
                        <td>{order.brokerName}</td>
                        <td>{order.customerServiceEmail}</td>
                        <td>{order.customerServiceName}</td>
                      </>
                    ) : (
                      <>
                        <td>
                          {" "}
                          <button
                            onClick={() => SendIdSuccses(order.id)}
                            className="btn bg-success w-50"
                          >
                            تنفيذ
                          </button>
                          <button
                            onClick={() => SendIdCancel(order.id)}
                            className="btn bg-danger w-50"
                          >
                            ألغاء
                          </button>
                        </td>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <td>
                      <button
                        onClick={() => SendIdSuccses(order.id)}
                        className="btn bg-success w-50"
                      >
                        تنفيذ
                      </button>
                      <button
                        onClick={() => SendIdCancel(order.id)}
                        className="btn bg-danger w-50"
                      >
                        ألغاء
                      </button>
                    </td>
                  </>
                )}

                <td>
                  <button
                    onClick={() => handleShowBar(order.notes, order.id)}
                    className="btn bg-primary w-100"
                  >
                    إضافه ملاحظات
                  </button>
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

      <Modal className="text-end" show={Bar !== null} onHide={handleCloseBar}>
        <Modal.Header
          closeButton
          className="bg-primary text-white text-center"
          style={{ borderRadius: "8px 8px 0 0", padding: "15px" }}
        >
          <Modal.Title className="w-100 fs-5">تقديم الملاحظات</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="p-4 bg-light"
          style={{ borderRadius: "0 0 8px 8px" }}
        >
          <Box
            sx={{
              maxWidth: 400,
              mx: "auto",
              p: 3,
              boxShadow: 4,
              borderRadius: 3,
              backgroundColor: "white",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              className="text-primary fw-bold text-center"
            >
              إضافة ملاحظات وملف
            </Typography>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mt-4 text-center" controlId="Notes">
                <Form.Label className="fw-bold text-secondary">
                  ملاحظات الطلب
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="أدخل ملاحظاتك هنا..."
                  name="Notes"
                  value={formik.values.Notes}
                  onChange={formik.handleChange}
                  className="shadow-sm border-primary"
                />
              </Form.Group>
              <Form.Group controlId="formData" className="mt-4 text-center">
                <Form.Label className="fw-bold text-secondary">
                  الإبانه
                </Form.Label>
                <InputGroup className="shadow-sm border-primary">
                  <FormControl
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="p-2"
                  />
                </InputGroup>
              </Form.Group>
              {IsLoading ? (
                <Button
                  className="w-100 mt-4 d-flex justify-content-center align-items-center  text-black border-0 shadow-sm"
                  disabled
                >
                  <i
                    className="fa-solid fa-gear fa-spin"
                    style={{ fontSize: "30px" }}
                  ></i>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-4 d-flex justify-content-center align-items-center fw-bold shadow-sm"
                >
                  إرسال الملاحظات
                </Button>
              )}
            </Form>
          </Box>
        </Modal.Body>
        <Modal.Footer className="bg-light d-flex justify-content-center">
          <Button
            variant="secondary"
            onClick={handleCloseBar}
            className="fw-bold shadow-sm px-4"
          >
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
