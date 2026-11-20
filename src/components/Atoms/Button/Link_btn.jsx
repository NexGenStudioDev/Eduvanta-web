import React from 'react';
import { Link } from 'react-router-dom';

const Link_btn = ({ to, link, buttonText, className }) => {
  // Prefer the `to` prop (React Router v6 convention), fall back to `link` for backward compatibility
  const href = to ?? link;

  return (
    <Link to={href}>
      <button className={className}>{buttonText}</button>
    </Link>
  );
};

export default Link_btn;