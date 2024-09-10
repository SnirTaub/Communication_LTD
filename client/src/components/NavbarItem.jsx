import { useNavigate } from "react-router-dom";

const NavbarItem = ({ url, label, icon = null }) => {
  const navigate = useNavigate();

  return (
    <div
      className="navbar-item nav-item"
      onClick={() => {
        navigate(url);
      }}
    >
      <div className="nav-link">
        {icon}
        {label}
      </div>
    </div>
  );
};

export default NavbarItem;
