import { Outlet } from 'react-router-dom';
import './globals.css';

export default function AppLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
