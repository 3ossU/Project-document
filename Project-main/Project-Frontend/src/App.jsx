import { useState, useEffect } from 'react'; // เพิ่ม useEffect
import "./App.css";
import Stat from "./page/Admin/stat";
import Sellerlist from "./page/Admin/sellerlist";
import Verify from "./page/Admin/verify";
import Postguide from "./page/Admin/guide";
import { BrowserRouter, Route, Routes,useLocation } from "react-router-dom";
import AdminAppLayout from "./layouts/AdminAppLayout";
import Home from "./page/Buyer/Home";
import Propertie from "./page/Buyer/Propertie";
import TradingGuide from "./page/Buyer/Guide/TradingGuide";
import TradingGuideBuyer from "./page/Buyer/Guide/TradingGuideBuyer"
import TradingGuideRent from "./page/Buyer/Guide/TradingGuideRent"
import TradingGuideSeller from "./page/Buyer/Guide/TradingGuideSeller"
import TradingGuideFinancing from "./page/Buyer/Guide/TradingGuideFinancing"
import TradingGuideArticle from "./page/Buyer/Guide/TradingGuideArticle"
import TradingGuideS from "./page/Seller/GuideSeller/TradingGuideS"
import TradingGuideBuyerS from "./page/Seller/GuideSeller/TradingGuideBuyerS"
import TradingGuideRentS from "./page/Seller/GuideSeller/TradingGuideRentS"
import TradingGuideSellerS from "./page/Seller/GuideSeller/TradingGuideSellerS"
import TradingGuideFinancingS from "./page/Seller/GuideSeller/TradingGuideFinancingS"
import TradingGuideArticleS from "./page/Seller/GuideSeller/TradingGuideArticleS"
import Login from "./page/LoginRegister.jsx/Login";
import Register from "./page/LoginRegister.jsx/Register"
import RegisterasSeller from "./page/LoginRegister.jsx/RegisterasSeller"
import UserAppLayout from "./layouts/UserAppLayout";
import SellerAppLayout from "./layouts/SellerAppLayout";
import ForwardToLogin from "./page/ForwardToLogin";
import PostProperty from "./page/Seller/PostProperty";
import HomeSeller from "./page/Seller/HomeSeller";
import PropertyInfo from "./page/Buyer/PropertyInfo";
import PropertyDetail from "./page/Buyer/PropertyDetail";
import Terms from "./page/Buyer/Terms";
import Privacy from "./page/Buyer/Privacy";
import Conditions from "./page/Buyer/Conditions";
import Policy from "./page/Buyer/Policy";
import Property from "./page/Seller/Property";
import ProInfo from "./page/Seller/ProInfo";
import PrivacyPolicy from "./page/Seller/PrivaryPolicy";
import PolicyUse from "./page/Seller/PolicyUse";
import ConditionsOf from "./page/Seller/ConditionsOf";
import TermsSale from "./page/Seller/TermsSale";
import Profile from "./page/Buyer/Profile";
import ProfileSeller from "./page/Seller/Profile";

// 1. สร้าง Component สำหรับส่งสัญญาณ Heartbeat เบื้องหลัง
function GlobalHeartbeat() {
  const location = useLocation(); //  ให้ดักจับการเปลี่ยนหน้าเว็บ

  useEffect(() => {
    const sendHeartbeat = async () => {
      try {
        const storedUser = localStorage.getItem('user'); 
        if (!storedUser) return; // ถ้ายังไม่ล็อกอิน ให้ข้ามไปเลย

        const userInfo = JSON.parse(storedUser);
        
        // ถ้าล็อกอินแล้วแต่ไม่มี ID แสดงว่าตอน Save ใน Login.jsx มีปัญหา
        if (!userInfo.id) {
            console.log(" พบ User แต่ไม่มี ID ใน localStorage");
            return;
        }

        // ยิงข้อมูลไปที่ Backend
        const res = await fetch('http://localhost:3000/admin/heartbeat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userInfo.id,
            role: userInfo.role
          }),
        });
        
        if (res.ok) {
           console.log(" ส่ง Heartbeat สำเร็จ ID:", userInfo.id);
        }
      } catch (error) {
        console.error(" Heartbeat failed", error);
      }
    };

    // 1. ส่งทันทีที่มีการเปลี่ยนหน้า (เช่น เพิ่งล็อกอินเสร็จ)
    sendHeartbeat();

    // 2. ถ้าเปิดหน้าเดิมทิ้งไว้เฉยๆ ให้ส่งทุกๆ 30 นาที
    const heartbeatInterval = setInterval(() => { sendHeartbeat(); }, 30000); 

    // รีเซ็ตการตั้งเวลาใหม่เมื่อเปลี่ยนหน้า
    return () => clearInterval(heartbeatInterval);
  }, [location.pathname]); // 👈 สั่งให้ทำงานทุกครั้งที่ URL เปลี่ยน

  return null; 
}

function App() {
  return (
    <BrowserRouter basename="/Project/">
      {/* 2. นำ Component มาวางไว้ข้างใน BrowserRouter */}
      <GlobalHeartbeat /> 
      
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='registerasseller' element={<RegisterasSeller />} />
        
        {/* ดึงlayout */}
        <Route path="/admin" element={<AdminAppLayout />}>
          <Route path="sellerlist" element={<Sellerlist />} />
          <Route path="stat" element={<Stat />} />
          <Route path="verify" element={<Verify />} />
          <Route path="guide" element={<Postguide />} />
        </Route>
        
        <Route path="buyer" element={<UserAppLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="propertie" element={<Propertie />} />
          <Route path="tradingguide" element={<TradingGuide />} />
          <Route path='tgbuyer' element={<TradingGuideBuyer />} />
          <Route path='tgrent' element={<TradingGuideRent />} />
          <Route path='tgseller' element={<TradingGuideSeller />} />
          <Route path='tgfinancing' element={<TradingGuideFinancing />} />
          <Route path='tgarticle/:id' element={<TradingGuideArticle />} />
          <Route path="login" element={<Login />} />
          <Route path="buyerpropertyinfo" element={<PropertyInfo />} />
          <Route path="propertydetail/:id" element={<PropertyDetail />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="policy" element={<Policy />} />
          <Route path="conditions" element={<Conditions />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        <Route path="seller" element={<SellerAppLayout />}>
          <Route path="homeseller" element={<HomeSeller />} />
          <Route path="property" element={<Property />} />
          <Route path="trading-guide" element={<TradingGuideS />} />
          <Route path='tgrent' element={<TradingGuideRentS />} />
          <Route path='tgbuyer' element={<TradingGuideBuyerS />} />
          <Route path='tgseller' element={<TradingGuideSellerS />} />
          <Route path='tgfinancing' element={<TradingGuideFinancingS />} />
          <Route path='tgarticle/:id' element={<TradingGuideArticleS />} />
          <Route path="login" element={<Login />} />
          <Route path="postproperty" element={<PostProperty />} />
          <Route path="sellerpropertyinfo/:id" element={<ProInfo />} />
          <Route path="termssale" element={<TermsSale />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="policyuse" element={<PolicyUse />} />
          <Route path="conditionsof" element={<ConditionsOf />} />
          <Route path="profile" element={<ProfileSeller />} />
        </Route>
        
        <Route path='*' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;