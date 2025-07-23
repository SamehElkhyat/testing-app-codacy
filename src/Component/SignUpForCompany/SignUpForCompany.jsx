import "./SignUpForCompany.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

const SignUpForCompany = () => {
  const [Isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    Email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    Password: Yup.string()
      .required("تأكيد كلمة المرور مطلوب")
      .min(8, "و تحتوي علي حروف و ارقام و حروف كبيره و صغيره")
      .oneOf([Yup.ref("Confirm")], "كلمات المرور غير متطابقة"),
    fullName: Yup.string().required(" الاسم الكامل مطلوب"),
    Confirm: Yup.string()
      .required("تأكيد كلمة المرور مطلوب")
      .oneOf([Yup.ref("Password")], "كلمات المرور غير متطابقة"),
    Identity: Yup.string().required("رقم الهويه مطلوب"),
    phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
    taxRecord: Yup.string().required("السجل التجاري مطلوب"),
    InsuranceNumber: Yup.string().required("رقم الضريبي مطلوب"),
  });
  const handelSignUpForCompany = async (values) => {
    setIsloading(true);
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/Register-company`,
        values,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("typeOfGenerate", data.data.data);

      navigate("/ActiveEmail");
    
    } catch (error) {
      setIsloading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
      fullName: "",
      Confirm: "",
      Identity: "",
      phoneNumber: "",
      InsuranceNumber: "",
      taxRecord: "",
    },
    validationSchema,
    onSubmit: handelSignUpForCompany,
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <div className="signup-background-img-frame"></div>
        <div className="dad-signup-Frame w-100 h-100">
        </div>
        <div className="sign-Up-container lg:mt-[100px]">
          <form
            
            className="form-container-signUp w-[133px] sm:w-[100px] md:w-[200px] lg:w-[30px]"
            onSubmit={formik.handleSubmit}
            noValidate
          >

            <h2>انشاء حساب للأعمال</h2>

            <div dir="rtl" className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="mr-3">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">متطلبات التسجيل:</h3>
                  <p className="text-xs text-blue-700 mb-2">يجب أن يكون الاسم الكامل هو نفسه في السجل التجاري</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      الاسم الكامل: مطلوب
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      البريد الإلكتروني: مطلوب وصحيح
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      رقم الهاتف: مطلوب
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      السجل التجاري: مطلوب
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      كلمة المرور: 8 أحرف على الأقل مع أحرف كبيرة وصغيرة وأرقام
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      تأكيد كلمة المرور: يجب أن تتطابق
                    </li>

                    <li className="flex items-center">
                      <span className="text-red-500 ml-1">*</span>
                      رقم الهوية: مطلوب (10 أرقام على الأقل)
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            <div className="Big-Form-SignUp">

              
             

              <div className="SignUp-form-group col-md-6">
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  السجل التجاري{" "}
                </label>{" "}
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    value={formik.values.taxRecord}
                    onChange={formik.handleChange}
                    placeholder="السجل التجاري"
                    type="text"
                    id="taxRecord"
                    name="taxRecord"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                  {formik.touched.taxRecord && formik.errors.taxRecord && (
                    <div className="error-message flex flex-row justify-end">
                      {formik.errors.taxRecord}
                    </div>
                  )}
                </div>
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  رقم الضريبي
                </label>{" "}
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    onChange={formik.handleChange}
                    value={formik.values.InsuranceNumber}
                    placeholder="رقم الضريبي"
                    type="text"
                    id="InsuranceNumber"
                    name="InsuranceNumber"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                </div>
                {formik.touched.InsuranceNumber &&
                  formik.errors.InsuranceNumber && (
                    <div className="error-message flex flex-row justify-end">
                      {formik.errors.InsuranceNumber}
                    </div>
                  )}
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  كلمه المرور{" "}
                </label>{" "}
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    value={formik.values.Password}
                    onChange={formik.handleChange}
                    placeholder=" كلمه المرور"
                    type="password"
                    id="Password"
                    name="Password"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none p-1">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                </div>
                {formik.touched.Password && formik.errors.Password && (
                  <div className="error-message flex flex-row justify-end">
                    {formik.errors.Password}
                  </div>
                )}
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  تأكيد كلمه المرور{" "}
                </label>{" "}
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    value={formik.values.Confirm}
                    onChange={formik.handleChange}
                    placeholder="تاكيد كلمه المرور:"
                    type="password"
                    id="Confirm"
                    name="Confirm"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none p-1">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                </div>
                {formik.touched.Confirm && formik.errors.Confirm && (
                  <div className="error-message flex flex-row justify-end">
                    {formik.errors.Confirm}
                  </div>
                )}
              </div>
              <div  className="SignUp-form-group col-md-6">
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  الاسم بالكامل{" "}
                </label>{" "}
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    placeholder="اسم الشركه"
                    type="name"
                    id="fullName"
                    name="fullName"
                    required
                  />

                  {/* اللوجو أو الأيقونة */}
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none"></div>
                </div>
                {formik.touched.fullName && formik.errors.fullName && (
                  <div className="error-message flex flex-row justify-end">
                    {formik.errors.fullName}
                  </div>
                )}
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  البريد الإلكتروني{" "}
                </label>{" "}
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    value={formik.values.Email}
                    onChange={formik.handleChange}
                    placeholder="البريد الالكتروني"
                    type="text"
                    id="Email"
                    name="Email"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none p-1">
                    <i className="fa-solid fa-envelope"></i>{" "}
                  </div>
                </div>
                {formik.touched.Email && formik.errors.Email && (
                  <div className="error-message flex flex-row justify-end">
                    {formik.errors.Email}
                  </div>
                )}
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  رقم الهاتف{" "}
                </label>
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    placeholder="رقم الهاتف"
                    type="phone"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none"></div>
                </div>
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <div className="error-message flex flex-row justify-end">
                    {formik.errors.phoneNumber}
                  </div>
                )}
                <label
                  style={{ color: "#002E5B" }}
                  className="text-[#002E5B] font-bold flex flex-row justify-end"
                  htmlFor="Email"
                >
                  رقم الهويه{" "}
                </label>{" "}
                <div className="relative w-[133px] sm:w-[200px] md:w-[250px] lg:w-[300px] p-2">
                  <input
                    className="border rounded w-full p-2 pr-10"
                    value={formik.values.Identity}
                    onChange={formik.handleChange}
                    placeholder="رقم الهويه"
                    type="text"
                    id="Identity"
                    name="Identity"
                    required
                  />
                  {/* اللوجو أو الأيقونة */}
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none"></div>
                </div>
                {formik.touched.Identity && formik.errors.Identity && (
                  <div className="error-message flex flex-row justify-end">
                    {formik.errors.Identity}
                  </div>
                )}
              </div>
            </div>

            <div className="signup-button-group">
              {Isloading == true ? (
                <>
                  <Button className="bg-black d-flex text-white justify-content-end">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2 text-danger d-flex justify-content-end mt-1"
                    />
                    جارٍ تنفيذ الطلب...
                  </Button>
                </>
              ) : (
                <>
                  <button className="register-button-SignUp" type="submit">
                    انشاء حساب
                  </button>
                </>
              )}

              <p>
                <Link className="to-SignUp" to="/SignIn">
                  هل لديك حساب بالفعل
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>

      <Toaster />
    </>
  );
};

export default SignUpForCompany;
