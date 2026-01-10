/* ---------- Reusable Components ---------- */

import { Link } from "react-router-dom";

export const NavItem = ({ to, label }) => (
  <li className="hover:text-yellow-300 transition">
    <Link to={to}>{label}</Link>
  </li>
);
