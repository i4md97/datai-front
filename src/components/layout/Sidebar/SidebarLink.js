import React from 'react';

import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// import { Badge } from 'reactstrap';

const SidebarLink = ({
  title,
  route,
  onClick,
  optionSelect,
  option,
  // newLink,
  // setOptionSelect,
}) => {

  const getActiveClassName = () => {
    let activeClassName = 'sidebar__link-active'
    if ( option !== undefined ) {
      if ( option === optionSelect ) {
        return activeClassName;
      } else {
        return '';
      }
    } else {
      return activeClassName;
    }
  }

  return (
    <NavLink
      to={route}
      onClick={onClick}
      activeClassName={getActiveClassName()}
    >
      <li className="sidebar__link">
        <p className="sidebar__link-title">
          {title}
          {/* {newLink ? <Badge className="sidebar__link-badge"><span>New</span></Badge> : ''} */}
        </p>
      </li>
    </NavLink>
  )
}

SidebarLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  newLink: PropTypes.bool,
  route: PropTypes.string,
  onClick: PropTypes.func,
};

SidebarLink.defaultProps = {
  icon: '',
  newLink: false,
  route: '/',
  onClick: () => {},
};

export default SidebarLink;