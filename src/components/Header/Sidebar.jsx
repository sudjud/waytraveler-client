import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import header from "./header.module.sass";
import {AiFillHome} from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { RiMapPinFill } from 'react-icons/ri'
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';


const Sidebar = () => {
    const category = useSelector(state => state.place.places)
    // console.log(category)

    return (
        <div>
            <SideNav  
      onSelect={(selected) => {
      }}
      className={header.sdb}
      style={{backgroundColor : '#333', paddingTop : '25px', position : 'fixed', opacity : '0.8'}}
  >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
              <NavIcon>
            <NavLink to='/'>
                  <AiFillHome className={header.home} />
              </NavLink>
              </NavIcon>
              <NavText>
                  <NavLink to='/'>Home</NavLink> 
              </NavText>
          </NavItem>
          <NavItem eventKey="charts">
              <NavIcon>
                  <BiCategory />
              </NavIcon>
              <NavText>
                  <NavLink to='/'>Категории</NavLink> 
              </NavText>
              <NavItem eventKey="charts/linechart">
                  <NavText>
                      Line Chart    
                  </NavText>
              </NavItem>
              <NavItem eventKey="charts/barchart">
                  <NavText>
                      Bar Chart
                  </NavText>
              </NavItem>
          </NavItem>
          <NavItem eventKey="charts">
              <NavIcon>
                  <RiMapPinFill />
              </NavIcon>
              <NavText>
                  <NavLink to='/'>Места</NavLink> 
              </NavText>
                    {category.map((el) => {
                  return (
                        <NavItem  eventKey="charts/linechar">
                  <NavText key={el._id}>
                      {el.name} 
                  </NavText>
              </NavItem>
                    )})}
              <NavItem eventKey="charts/barchar">
                  <NavText>
                      Bar Chaxrt
                  </NavText>
              </NavItem>
          </NavItem>
      </SideNav.Nav>
  </SideNav>
        </div>
    );
};

export default Sidebar;