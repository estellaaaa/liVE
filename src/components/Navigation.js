import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ user, modules }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user && <li><Link to="/profile">Profile</Link></li>}
        <li><Link to="/module-market">Module Market</Link></li>
        {modules.map(module => (
          <li key={module.id}><Link to={`/${module.id}`}>{module.name}</Link></li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;