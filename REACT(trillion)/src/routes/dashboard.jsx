import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import modify_product from "views/modify_product/modify_product.jsx";
import month from "views/month/month.jsx";
import material from "views/material/material.jsx";
import ERP from "views/ERP/ERP.jsx";

import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  LocationOn,
  Notifications,
  InsertChart,
  AllInclusive
} from "@material-ui/icons";

const dashboardRoutes = [
  // {
  //   path: "/modify_product",
  //   sidebarName: "修改商品",
  //   navbarName: "modify_product",
  //   icon: Dashboard,
  //   component: modify_product
  // },
  {
    path: "/ERP",
    sidebarName: "總銷貨",
    navbarName: "ERP",
    icon: BubbleChart,
    component: ERP
  },
  {
    path: "/month",
    sidebarName: "銷貨細節",
    navbarName: "month",
    icon: InsertChart,
    component: month
  },
  {
    path: "/material",
    sidebarName: "進貨",
    navbarName: "material",
    icon: AllInclusive,
    component: material
  },
  // {
  //   path: "/dashboard",
  //   sidebarName: "Dashboard",
  //   navbarName: "Material Dashboard",
  //   icon: Dashboard,
  //   component: DashboardPage
  // },
  // {
  //   path: "/user",
  //   sidebarName: "User Profile",
  //   navbarName: "Profile",
  //   icon: Person,
  //   component: UserProfile
  // },
  // {
  //   path: "/table",
  //   sidebarName: "Table List",
  //   navbarName: "Table List",
  //   icon: ContentPaste,
  //   component: TableList
  // },
  // {
  //   path: "/typography",
  //   sidebarName: "Typography",
  //   navbarName: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography
  // },
  // {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  { redirect: true, path: "/", to: "/ERP", navbarName: "Redirect" }
];

export default dashboardRoutes;
