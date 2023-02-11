import React from 'react';
import PropTypes from 'prop-types';

// Components
import TopbarSidebarButton from './TopbarSidebarButton';
import MenuSettings from '../../MenuOptions/MenuSettings';
import TopbarProfile from './TopbarProfile';
import TopbarMenuLink from './TopbarMenuLink';


const Topbar = ({ 
  changeMobileSidebarVisibility,
  changeSidebarVisibility,
  active,
  setActive,
  changeColor,
  changeFont,
  animation,
  setAnimation,
  sizeFont,
  setSizeFont, 
}) => (
  <div className="topbar">
    <div className="topbar__wrapper">
      <div className="topbar__left">
        <TopbarSidebarButton
          onClickMobile={changeMobileSidebarVisibility}
          onClickDesktop={changeSidebarVisibility}
        />
        <div className="d-flex align-items-center">
          {/* <Link className="topbar__logo" to="/" /> */}
          <h1 className="siteTitle pt-2 h4">FRONT</h1>
        </div>
      </div>
      <div className="topbar__right align-items-center">
        <MenuSettings
          setSizeFont={setSizeFont}
          sizeFont={sizeFont}
          changeColor={changeColor}
          changeFont={changeFont}
          animation={animation}
          setAnimation={setAnimation}
        />
        <TopbarProfile />
        <TopbarMenuLink />
      </div>
    </div>
  </div>
);

Topbar.propTypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
};

export default Topbar;