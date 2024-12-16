import { useState } from 'react'
import TezosApp from './components/TezosApp.jsx'
import TezosApp2 from './components/TezosApp2.jsx';
import CertificateManagement from './components/CertificateManagement.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { Buffer } from "buffer";
import UserListPage from './components/UserListPage.jsx';
import CompanyUserHome from './components/CompanyUserHome.jsx';
import Home from './components/Home.jsx';

window.Buffer = Buffer;

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/" element={<TezosApp />} />
          <Route path="/admin/user-list" element={<UserListPage />} />
          <Route path="/user/" element={<CompanyUserHome />} />
          <Route path="/issuer" element={<TezosApp2 />} />
          <Route
            path="/issuer/certificate-management"
            element={<CertificateManagement />}
          />
        </Routes>
      </Router>
    </>
  );
}
export default App


