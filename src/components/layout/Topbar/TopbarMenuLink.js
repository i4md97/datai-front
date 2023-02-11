import React from 'react';
import { useHistory } from 'react-router-dom';

// Image
import LogoutIcon from './../../_icons/LogoutIcon';

const TopbarMenuLinks = () => {


  const history = useHistory();
  
  const logoutHandler = () => {
    history.push("/");
  }

  return (
    <div>
      <button className="topbar__btn logout-btn align-items-center" onClick={logoutHandler}>
        <LogoutIcon />
      </button>
    </div>
  )
}

export default TopbarMenuLinks;