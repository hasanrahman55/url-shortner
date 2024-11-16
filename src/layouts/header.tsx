import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkIcon, LogOut } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const user = true;
  return (
    <nav className="px-16 py-4 flex flex-row justify-between items-center">
      <Link to="/">
        <img src="/logo.jpg" alt="trim logo" className="w-10 h-10" />
      </Link>
      <div>
        {!user ? (
          <Button variant="outline" onClick={() => navigate("/auth")}>
            Button
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LinkIcon />
                My Links
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400">
                <LogOut /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}

export default Header;
