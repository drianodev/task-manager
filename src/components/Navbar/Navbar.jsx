import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();

  const menuItems = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Tasks',
      path: '/tasks',
    },
  ];

  return (
    <Menu mode="horizontal" selectedKeys={[pathname]}>
      {menuItems.map((item) => (
        <Menu.Item key={item.path}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Navbar;
