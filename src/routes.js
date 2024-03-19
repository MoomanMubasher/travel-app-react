import React from "react";
import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Landmarks from "views/examples/Landmarks";
import Comments from "components/Cruds/Comments";
import Ratings from "components/Cruds/Ratings";
// import Icons from "views/examples/Icons.js";

var routes = [

  {
    path: "/landmarks",
    name: "Landmarks",
    icon: "ni ni-building text-yellow",
    component: <Landmarks />,
    layout: "/admin",
  },
 
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },

  {
    path: "/landmarks/:id/comments",
    name: "Comments",
    icon: "pi pi-comments text-yellow",
    component: <Comments />,
    layout: "/admin",
  },

  {
    path: "/landmarks/:id/ratings",
    name: "Ratings",
    icon: "pi pi-star-fill text-yellow",
    component: <Ratings />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
