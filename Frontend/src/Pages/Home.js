import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../components/Main';
import Doc from '../components/Doc'
import FormSubmission from '../components/FundRaise';
import NGO from '../components/NGO';
import Option1 from '../components/Option1';
import Option2 from '../components/Option2';
import Option3 from '../components/Option3';
import Profile from '../components/Profile';
import Initiatives from '../components/Initiatives';
import ViewFundRaiser from '../components/ViewFundRaiser';
import CreateInitiative from '../components/CreateInitiative';
import Footer from '../components/Footer';

const Home = () => {
  const [activeSection, setActivesection] = useState(null);
  const [isClicked, setisClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const navigate = useNavigate();

  function handleViewFundRaiser() {
    isLoggedIn ? (setActivesection('viewFundRaiser')) : (navigate('/login'))
  }
  function handleContactSupport() {
    navigate('/help');
  }
  function handleInitiatives() {
    isLoggedIn ? (setActivesection('Initiative')) : (navigate('/login'))
  }
  function handleSignUp() {
    navigate('/signup');
  }

  function handleLogin() {
    navigate('/login');

  }
  function handleFormSubmission() {
    isLoggedIn ? (setActivesection('form')) : (navigate('/login'))
  }
  function handleNgo() {
    isLoggedIn ? (setActivesection('ngo')) : (navigate('/login'))
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setisClicked(false);
      }
    }
    isClicked ? (document.addEventListener("mousedown", handleClickOutside)) : (document.removeEventListener("mousedown", handleClickOutside));
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClicked]);
  const renderContent = () => {
    switch (activeSection) {
      case 'viewFundRaiser': return (<div><ViewFundRaiser activeSection={activeSection} setActivesection={setActivesection} /></div>)
      case 'form': return (<div><FormSubmission activeSection={activeSection} setActivesection={setActivesection} /></div>)
      case 'ngo': return (<NGO />)
      case 'Initiative': return (<div>
        <Initiatives activeSection={activeSection} setActivesection={setActivesection} /></div>)
      case 'option1': return <Option1 setActivesection={setActivesection} />;
      case 'option2': return <Option2 setActivesection={setActivesection} />;
      case 'option3': return <Option3 setActivesection={setActivesection} />;
      case 'createInitiatives': return (<div><CreateInitiative /></div>)
      case 'doc': return (<Doc activeSection={activeSection} setActivesection={setActivesection} />)
      default: return (<div><Main /></div>)
    }
  }

  return (
    <div className="home-container flex flex-col min-h-screen bg-gray-50">
      <div className="navbar w-full bg-[#001512] fixed top-0 z-50 flex justify-between items-center px-8 py-4 shadow-md">
        <nav className="navbar-nav flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">FundRaiser Platform</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button
              className="inline-flex items-center justify-center relative cursor-pointer select-none  
              box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem]
              h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 
              transition-all duration-300"
              onClick={() => { setActivesection(null) }}
            >
              Home
            </button>
            <button
              className="inline-flex items-center justify-center relative cursor-pointer select-none  
              box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem]
              h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 
              transition-all duration-300"
              onClick={isLoggedIn ? handleFormSubmission : handleSignUp}
            >
              Start a Fundraiser
            </button>
            <button
              onClick={handleContactSupport}
              className="inline-flex items-center justify-center relative cursor-pointer select-none  
              box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem]
              h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 
              transition-all duration-300"
            >
              Help
            </button>
            {isLoggedIn ? (
              <div>
                <button
                  className="inline-flex items-center justify-center relative cursor-pointer select-none  
                box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem]
                h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 
                transition-all duration-300"
                  onClick={() => setisClicked(!isClicked)}
                >
                  Profile
                </button>
                <div className="absolute top-12 right-0 w-[300px] rounded-lg shadow-lg bg-[rgba(5,7,10,0.7)]">
                  {
                    isClicked ? (<div ref={profileRef}>
                      <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    </div>) : (null)
                  }
                </div>
              </div>
            ) : (
              <>
                <button
                  className="inline-flex items-center justify-center relative cursor-pointer select-none  
                  box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem]
                  h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 
                  transition-all duration-300"
                  onClick={handleSignUp}
                >
                  Signup
                </button>
                <button
                  className="inline-flex items-center justify-center relative cursor-pointer select-none  
                  box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem]
                  h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 
                  transition-all duration-300"
                  onClick={handleLogin}
                >
                  LogIn
                </button>
              </>
            )}
            <div className="relative" ref={menuRef}>
              <button
                className="inline-flex items-center justify-center relative cursor-pointer select-none  
                box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem]
                h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 
                transition-all duration-300"
                onClick={toggleMenu}
              >
                Menu
              </button>
              {isMenuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-2 text-gray-700 space-y-2">
                  <li>
                    <button
                      onClick={handleViewFundRaiser}
                      className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded-lg">
                      View Fundraisers
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleInitiatives}
                      className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded-lg">
                      Initiatives
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleNgo}
                      className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded-lg">
                      NGO's
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
      <div className="mt-20">{renderContent()}</div>
      <div>
        <Footer />
      </div>
    </div>
  )
};
export default Home;