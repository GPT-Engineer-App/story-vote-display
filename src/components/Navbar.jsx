import React from 'react';
import { Link } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";

const Navbar = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/top-stories" className="hover:underline">Top Stories</Link>
        <Link to="/about" className="hover:underline">About</Link>
      </div>
      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
    </nav>
  );
};

export default Navbar;