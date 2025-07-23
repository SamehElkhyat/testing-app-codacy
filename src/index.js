import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import { store } from "./Component/Redux/Store/Store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Component/Layout/Layout.jsx";
import LandingPage from "./Component/LandingPage/LandingPage.jsx";
import SignIn from "./Component/SignIn/SignIn.jsx";
import SignUpForCompany from "./Component/SignUpForCompany/SignUpForCompany.jsx";
import IntorSignUp from "./Component/IntorSignUp/IntorSignUp.jsx";
import IntorSignIn from "./Component/IntorSignIn/IntorSignIn.jsx";
import SignUp from "./Component/SignUp/SignUp.jsx";
import ResetPassword from "./Component/ResetPassword/ResetPassword.jsx";
import ConfirmPassword from "./Component/ResetPassword/ConfirmPassowrd/ConfirmPassword.jsx";
import Clients from "./Component/AdminComponent/Clients/Clients.jsx";
import Blacklist from "./Component/AdminComponent/blacklist/blacklist.jsx";
import Brookers from "./Component/AdminComponent/Brookers/Brookers.jsx";
import Permissions from "./Component/AdminComponent/Permissions/Permissions.jsx";
import HistoryDoneOrder from "./Component/AccountantComponennt/HistoryOfDoneOrdersAccountant/HistoryDoneOrder.jsx";
import Statistics from "./Component/AdminComponent/statistics/statistics.jsx";
import Cart from "./Component/ClientsComponent/Cart/Cart.jsx";
import Mokhalseen from "./Component/Mokhalseen/Mokhalseen.jsx";
import SignUpForMokhalseen from "./Component/SignUpForMokhalseen/SignUpForMokhalseen.jsx";
import BrookersLandingPage from "./Component/BrookersComponent/BrookersLandingPage/BrookersLandingPage.jsx";
import AvailableOrders from "./Component/BrookersComponent/AvailableOrders/AvailableOrders.jsx";
import OrderDetails from "./Component/BrookersComponent/OrderDetails/OrderDetails.jsx";
import CurrentOffers from "./Component/BrookersComponent/CurrentOffers/CurrentOffers.jsx";
import HistoryOfOrders from "./Component/BrookersComponent/HistoryOfOrders/HistoryOfOrders.jsx";
import BrookersCart from "./Component/BrookersComponent/BrookersCart/BrookersCart.jsx";
import LandingPageForUsers from "./Component/LandingPageForUsers/LandingPageForUsers.jsx";
import NewOrderForm from "./Component/ClientsComponent/NewOrder/NewOrder.jsx";
import PendingOrders from "./Component/ClientsComponent/Orders/Orders.jsx";
import OrderDetailsForUser from "./Component/ClientsComponent/OrderDetailsForUser/OrderDetailsForUser.jsx";
import CurrentOrdersForUsers from "./Component/ClientsComponent/CurrentOrdersForUsers/CurrentOrdersForUsers.jsx";
import LandingPageCustomeService from "./Component/CustomerServices/LandingPageCustomeService/LandingPageCustomeService.jsx";
import CanceledOrders from "./Component/CustomerServices/CanceledOrders/CanceledOrders.jsx";
import DoneOrders from "./Component/CustomerServices/DoneOrders/DoneOrders.jsx";
import AccountantLandingPage from "./Component/AccountantComponennt/AccountantLandingPage/AccountantLandingPage.jsx";
import AcceptedOrderAccountant from "./Component/AccountantComponennt/AcceptedOrderAccountant/AcceptedOrderAccountant.jsx";
import DoneOrdersForUser from "./Component/ClientsComponent/DoneOrdersforUSer/DoneOrdersForUser.jsx";
import AllOrderTransfers from "./Component/CustomerServices/AllOrderTransfers/AllOrderTransfers.jsx";
import LandingPageAdmin from "./Component/LandingPageAdmin/LandingPageAdmin.jsx";
import AllOrderDeleted from "./Component/CustomerServices/AllOrderDeleted/AllOrderDeleted.jsx";
import HistoryOfOrdersUsers from "./Component/ClientsComponent/HistoryOfOrdersUsers/HistoryOfOrdersUsers.jsx";
import CPanelCustomerService from "./Component/AdminComponent/CPanelCustomeService/CPanelCustomerService.jsx";
import CpanelAccountant from "./Component/AdminComponent/CpanelAccountant/CpanelAccountant.jsx";
import AllClients from "./Component/AdminComponent/AllClients/AllClients.jsx";
import AllClientsManger from "./Component/MangerComponennt/AllClientsManger/AllClientsManger.jsx";
import BrookersManger from "./Component/MangerComponennt/BrookersManger/BrookersManger.jsx";
import ClientsManger from "./Component/MangerComponennt/ClientsManger/ClientsManger.jsx";
import CpanelAccountantManger from "./Component/MangerComponennt/CpanelAccountantManger/CpanelAccountantManger.jsx";
import CPanelCustomerServiceManger from "./Component/MangerComponennt/CPanelCustomeServiceManger/CPanelCustomerServiceManger.jsx";
import LandingPageManger from "./Component/MangerComponennt/LandingPageManger/LandingPageManger.jsx";
import BlacklistManger from "./Component/MangerComponennt/blacklistManger/blacklistManger.jsx";
import StatisticsManger from "./Component/MangerComponennt/statisticsManger/statisticsManger.jsx";
import DetailsForAdmin from "./Component/MangerComponennt/DetailsForAdmin/DetailsForAdmin.jsx";
import CustomTable from "./Component/Table/Tables.jsx";
import LogsOrders from "./Component/MangerComponennt/LogsOrders/LogsOrders.jsx";
import Tracking from "./Component/ClientsComponent/Tracking/Tracking.jsx";
import UserPayment from "./Component/ClientsComponent/UserPayment/UserPayment.jsx";
import Settings from "./Component/ControlPanel/Settings.jsx";
import ActiveEmail from "./Component/ResetPassword/ActiveEmail/ActiveEmail.jsx";
import ProfileUsers from "./Component/AdminComponent/ProfileUsers/ProfileUsers.jsx";
import Mangers from "./Component/AdminComponent/Manegers/Mangers.jsx";
import FormResopnse from "./Component/AdminComponent/FormResponse/FormResponse.jsx";
import ExpiredOrders from "./Component/AdminComponent/ExpiredOrders/ExpiredOrders.jsx";
import ContactForm from "./Component/Form/Form.jsx";
import ActiveAccount from "./Component/AdminComponent/ActiveAccount/ActiveAccount.jsx";
import Testing from "./Component/Testing/Testing.jsx";
import TransferOrders from "./Component/BrookersComponent/TransferOrders/TransferOrders.jsx";
import SendOrders from "./Component/BrookersComponent/SendOrders/SendOrders.jsx";
import "./index.css";
import NotFound from "./Component/NotFound.jsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      // main //
      { path: "", element: <LandingPage /> },
      // Manger//
      { path: "blacklistManger", element: <BlacklistManger /> },
      { path: "AllClientsManger", element: <AllClientsManger /> },
      { path: "BrookersManger", element: <BrookersManger /> },
      { path: "ClientsManger", element: <ClientsManger /> },
      { path: "CpanelAccountantManger", element: <CpanelAccountantManger /> },
      {
        path: "CPanelCustomeServiceManger",
        element: <CPanelCustomerServiceManger />,
      },
      { path: "LandingPageManger", element: <LandingPageManger /> },
      { path: "Testing", element: <Testing /> },
      { path: "StatisticsManger", element: <StatisticsManger /> },
      { path: "Tables", element: <CustomTable /> },
      { path: "LogsOrders", element: <LogsOrders /> },
      // make Account//
      { path: "SignIn", element: <SignIn /> },
      { path: "SignUp", element: <SignUp /> },
      { path: "SignUpForCompany", element: <SignUpForCompany /> },
      { path: "SignUpForMokhalseen", element: <SignUpForMokhalseen /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      { path: "ConfirmPassword", element: <ConfirmPassword /> },
      { path: "mokhalseen", element: <Mokhalseen /> },
      { path: "IntorSignUp", element: <IntorSignUp /> },
      { path: "IntorSignIn", element: <IntorSignIn /> },
      //Accountant//
      { path: "AccountantLandingPage", element: <AccountantLandingPage /> },
      { path: "AcceptedOrderAccountant", element: <AcceptedOrderAccountant /> },
      { path: "HistoryDoneOrder", element: <HistoryDoneOrder /> },
      // CustomeServices//
      { path: "DoneOrders", element: <DoneOrders /> },
      { path: "canceledOrders", element: <CanceledOrders /> },
      { path: "AllOrderTransfers", element: <AllOrderTransfers /> },
      { path: "AllOrderDeleted", element: <AllOrderDeleted /> },
      {
        path: "LandingPageCustomeService",
        element: <LandingPageCustomeService />,
      },
      //Brooker //
      { path: "historyOfOrders", element: <HistoryOfOrders /> },
      { path: "orderDetails/:id", element: <OrderDetails /> },
      { path: "brookersLandingPage", element: <BrookersLandingPage /> },
      { path: "availableOrders", element: <AvailableOrders /> },
      { path: "brookersCart", element: <BrookersCart /> },
      { path: "currentOffers", element: <CurrentOffers /> },
      { path: "TransferOrders", element: <TransferOrders /> },
      { path: "SendOrders", element: <SendOrders /> },
      //*USER//
      { path: "ContactForm", element: <ContactForm /> },
      { path: "Tracking/:id", element: <Tracking /> },
      { path: "ActiveEmail", element: <ActiveEmail /> },
      { path: "UserPayment", element: <UserPayment /> },
      { path: "Cart", element: <Cart /> },
      { path: "NewOrder", element: <NewOrderForm /> },
      { path: "LandingPageForUsers", element: <LandingPageForUsers /> },
      { path: "Orders", element: <PendingOrders /> },
      { path: "OrderDetailsForUser/:id", element: <OrderDetailsForUser /> },
      { path: "CurrentOrdersForUsers", element: <CurrentOrdersForUsers /> },
      { path: "DoneOrdersForUser", element: <DoneOrdersForUser /> },
      { path: "HistoryOfOrdersUsers", element: <HistoryOfOrdersUsers /> },
      //* Admin//
      { path: "ActiveAccount", element: <ActiveAccount /> },
      { path: "DetailsForAdmin/:id", element: <DetailsForAdmin /> },
      { path: "CPanelCustomerService", element: <CPanelCustomerService /> },
      { path: "CpanelAccountant", element: <CpanelAccountant /> },
      { path: "permissions/:id", element: <Permissions /> },
      { path: "permissions", element: <Permissions /> },
      { path: "Mangers", element: <Mangers /> },
      { path: "FormResponse", element: <FormResopnse /> },
      { path: "ExpiredOrders", element: <ExpiredOrders /> },
      { path: "statistics", element: <Statistics /> },
      { path: "Clients", element: <Clients /> },
      { path: "blackList", element: <Blacklist /> },
      { path: "brookers", element: <Brookers /> },
      { path: "AllClients", element: <AllClients /> },
      { path: "LandingPageAdmin", element: <LandingPageAdmin /> },
      { path: "ProfileUsers/:id", element: <ProfileUsers /> },
      //* cpanel//
      { path: "Settings", element: <Settings /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
