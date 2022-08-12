import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faHome, faBars, faArrowAltCircleLeft, faArrowAltCircleRight, faDiagramPredecessor, faImage, faHistory, faPeopleGroup, faProjectDiagram, faBookReader, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { Outlet, Link, NavLink } from 'react-router-dom';
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

const Container = styled.div`
  display: flex;
  /* justify-content: space-between; */
`
const Sidebar = styled.div`
  
`
const Admin = () => {
  const [menuCollapse, setMenuCollapse] = useState(false)

  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  return (
    <Container>

      <Sidebar className='' id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext mx-2 d-flex align-itme-center mt-1">
              <p>{menuCollapse ? <Link className='text-dark' to='/home'><FontAwesomeIcon className='fs-3 pt-1' icon={faHome} /></Link> : <Link className='text-dark' to='/home'><FontAwesomeIcon className='fs-3 pt-1 mx-1' icon={faHome} />Home</Link>}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? (
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              ) : (
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={<FontAwesomeIcon icon={faPlus} />}>
                <Link className='text-dark' to='add-teacher'>Add Teacher</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faDiagramPredecessor} />}>
                <Link className='text-dark' to='manage-teacher'>Manage Teacher</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faPlus} />}>
                <Link className='text-dark' to='add-talk'>Add Talk</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faDiagramPredecessor} />}>
                <Link className='text-dark' to='manage-talk'>Manage Talk</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faDiagramPredecessor} />}>
                <Link className='text-dark' to='addResult'>Add result</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faImage} />}>
                <Link className='text-dark' to='image-gallery'>Image gallery</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faHistory} />}>
                <Link className='text-dark' to='history'>Add History</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faHistory} />}>
                <Link className='text-dark' to='manage-history'>Manage History</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faPeopleGroup} />}>
                <Link className='text-dark' to='govt-body'>Govt body</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faPeopleGroup} />}>
                <Link className='text-dark' to='add-funding'>Add funding</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faProjectDiagram} />}>
                <Link className='text-dark' to='project'>Project</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faHistory} />}>
                <Link className='text-dark' to='manage-project'>Manage Project</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faBookReader} />}>
                <Link className='text-dark' to='addNotice'>Notice board</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faImage} />}>
                <Link className='text-dark' to='addBanner'>Add banner</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faPeopleGroup} />}>
                <Link className='text-dark' to='manageAdmin'>Manage admin</Link>
              </MenuItem>
              <MenuItem icon={<FontAwesomeIcon icon={faBars} />}>
                <Link className='text-dark' to='addEvent'>Add event</Link>
              </MenuItem>

            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu className='' iconShape="square">
              <MenuItem icon={<FontAwesomeIcon icon={faBars} />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </Sidebar>


      <Outlet />



    </Container>
  );
};

export default Admin;