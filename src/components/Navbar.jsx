import React from 'react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-purple-600 p-4 text-white flex justify-between items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Navigate</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link to="/">Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/top-stories">Top Stories</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/about">About</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/maps">Maps</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/notes">Notes</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/Yuyz0112.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;