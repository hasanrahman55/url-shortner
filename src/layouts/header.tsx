import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Header() {
  const navigate = useNavigate();
  return (
    <nav className="p-4 flex flex-row justify-between items-center">
      <Link to="/">
        <img src="/logo.jpg" alt="trim logo" className="w-10 h-10" />
      </Link>
      <div>
        <Button variant="outline" onClick={() => navigate("/auth")}>
          Button
        </Button>
      </div>
    </nav>
  );
}

export default Header;
