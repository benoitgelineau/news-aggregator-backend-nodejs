import React, { Component } from 'react';
import Topics from './Topics';
import Buttons from './Buttons';
import styles from '../../styles/sidebar/Sidebar.scss';

class Sidebar extends Component {
  state = {
    isOpen: false,
  };

  toggleSidebar = (e) => { // Use Redux (to toggle from Navbar also)
    e.preventDefault();
    /** Add accessibility with keyDown or keyPress (DOWN key) */
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const { isOpen } = this.state;
    /** SEE COUNTRYDROPDOWN TO CLOSE SIDEBAR ON CLICK OUTSIDE AREA */
    return (
      <div className={isOpen ? styles.sidebarOpen : styles.sidebar}>
        <div className={styles.sidebar__list}>
          <Topics />
          <Buttons />
        </div>
        {/* <div
          role="button"
          tabIndex="0"
          className={styles.sidebar__clickCatcher}
          onClick={this.toggleSidebar}
          onKeyDown={this.toggleSidebar}
        /> */}
      </div>
    );
  }
}

export default Sidebar;
