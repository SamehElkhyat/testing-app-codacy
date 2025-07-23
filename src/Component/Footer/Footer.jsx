import React from "react";
import "./Footer.css";
import logo from "../logo.png";
const Footer = () => {
  return (
    <footer className="bg-[#002E5B] text-white py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 md:gap-20 relative">
        {/* القوائم */}
        <div className="flex flex-col sm:flex-row justify-center items-start gap-10">
          <ul className="space-y-2 text-right">
            <h5 className="text-[#1DA9E3] font-semibold">للمساعدة</h5>
            <li>تواصل معنا</li>
          </ul>

          <ul className="space-y-2 text-right">
            <h5 className="text-[#1DA9E3] font-semibold">تخليص تك</h5>
            <li>عن تخليص تك</li>
            <li>سياسة الخصوصية</li>
            <li>سياسة إخلاء المسؤولية</li>
          </ul>
        </div>

        {/* اللوجو */}
        <div className="w-40 sm:w-48 h-auto">
          <img
            className="w-full h-auto object-contain"
            src={logo}
            alt="Takhales Tech Logo"
          />
        </div>
      </div>

      {/* الحقوق */}
      <div className="text-center text-sm mt-8 border-t border-gray-600 pt-4">
        &copy; {new Date().getFullYear()} Takhales Tech. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
};

export default Footer;
