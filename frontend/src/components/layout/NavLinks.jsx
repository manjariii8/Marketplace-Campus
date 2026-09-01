import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "Categories",
    path: "/categories",
  },
];

const NavLinks = () => {
  return (
    <nav className="flex items-center gap-8">

      {links.map((link) => (

        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `text-sm font-semibold transition ${
              isActive
                ? "text-blue-600"
                : "text-slate-600 hover:text-blue-600"
            }`
          }
        >
          {link.name}
        </NavLink>

      ))}

    </nav>
  );
};

export default NavLinks;