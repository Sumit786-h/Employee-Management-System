import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';

const App = () => {
  const [user, setUser] = useState(null); // 'admin' | 'employee' | null
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const parsed = JSON.parse(loggedInUser);
      setUser(parsed.role);
      setLoggedInUserData(parsed.data || null);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      setUser('admin');
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }));
      setLoggedInUserData(null);
      return;
    }
    if (userData && userData.length) {
      const employee = userData.find(e => e.email === email && e.password === password);
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }));
        return;
      }
    }
    alert('Invalid Credentials');
  };

  const changeUser = (value) => {
    setUser(value || null);
    setLoggedInUserData(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === 'admin' ? (
        <AdminDashboard changeUser={changeUser} />
      ) : user === 'employee' ? (
        <EmployeeDashboard changeUser={changeUser} data={loggedInUserData} />
      ) : null}
    </>
  );
};

export default App;
