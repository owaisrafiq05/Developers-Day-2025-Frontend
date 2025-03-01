import React from "react";

const Header = () => {
  return (
    <header className="text-center py-16 bg-gradient-to-r from-red-600 to-black">
      <h1 className="text-5xl font-bold">
        Final Year <span className="text-red-400">Xtreme</span>
      </h1>
      <p className="mt-4">
        Showcase your innovation, compete with the best, and push the boundaries of technology
      </p>
      <button className="mt-6 px-6 py-2 bg-red-500 text-white rounded">Register Now</button>
    </header>
  );
};

export default Header;
