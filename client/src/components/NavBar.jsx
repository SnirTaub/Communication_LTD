import NavbarItem from "./NavbarItem";
import { FaAngellist } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";

import Logo from "./Logo";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

const NavBar = () => {

  const userContextData = useContext(UserContext);

  return (
    <div className="navbar nav nav-tabs">
      <Logo />
      <NavbarItem label="Home" url="/" icon={<AiFillHome />} />

    {!userContextData.isLoggedIn ? (
        <>
            <NavbarItem label="Login" url="/login" icon={<IoMdLogIn />} />
            <NavbarItem
                label="Register"
                url="/register"
                icon={<MdAccountCircle />}
            />
            <NavbarItem
                label="Forgot Password"
                url="/forgot_password"
                icon={<BsFillShieldLockFill />}
            />
        </>
    ) : (
        <>
            <NavbarItem
                label="Change Password"
                url="/change_password"
                icon={<BsFillShieldLockFill />}
            />
            <h1 className="user">Welcome {userContextData.email}!</h1>
            <div
                className="logout"
                onClick={() => {
                    userContextData.setLoggedInStatus(false);
                }}
            >
                Log out
            </div>
        </>
    )}
    </div>
  );
};

export default NavBar;
