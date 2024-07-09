"use client"
import React from 'react';
import Link from 'next/link';
// import { useAuth } from '../../../../legacy/app/components/context/AuthContext';

const SidBar = () => {

  const logOut=()=>{
    localStorage.clear()
    window.location.href='http://localhost:3000/Signin/Login'
  }
  return (


    <div className="  relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 w-1/4 bg-white shadow-md p-4" >
      <div className="mb-2 p-4">
        <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">Dashbord</h5>
      </div>
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        <NavItem icon="blocks" label="BestSells" />
        <NavItem icon="blocks" label="User" />
        <NavItem icon="books" label="Owner" />
        <NavItem icon="profile" label="Product" />
        <NavItem icon="settings" label="AddProduct" />
        <NavItem icon="log-out" label="Log Out" click={logOut} />
        <NavItem  label="SignIn"  />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label,click }) => {
  console.log("click",click);
  const icons = {
    BestSells: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
     
        <path href='/BestSells' fillRule="evenodd" d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" clipRule="evenodd" />
      </svg>
    ),
    User: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
     
        <path href='/Seller' fillRule="evenodd" d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" clipRule="evenodd" />
      </svg>
    ),
    Owner: (
      <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path href='Seller' fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
      </svg>
    ),
  
    Product: (
      <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path href='Product' fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
      </svg>
    ),
    addProduct: (
      <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path href='AddProduct' fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.85.694c.095.078.171.229.193.451a7.624 7.624 0 000 1.14c.022.222-.098.373-.193.45l-.85.695a1.875 1.875 0 00-.432 2.385l.922 1.598a1.875 1.875 0 002.282.818l1.266-.506c.115-.044.283-.033.45.082.317.218.645.407.986.57.182.088.277.228.297.35l.178 1.072c.151.904.933 1.566 1.85 1.566h1.844c.917 0 1.699-.663 1.85-1.567l.178-1.072c.02-.122.115-.262.297-.35.34-.163.668-.352.985-.57.167-.115.335-.126.45-.082l1.266.506a1.875 1.875 0 002.283-.818l.921-1.598a1.875 1.875 0 00-.432-2.385l-.85-.695c-.095-.077-.171-.228-.193-.45a7.623 7.623 0 000-1.14c-.022-.222.098-.373.193-.451l.85-.694a1.875 1.875 0 00.432-2.385l-.921-1.597a1.875 1.875 0 00-2.283-.819l-1.266.507c-.115.043-.283.032-.45-.083a7.49 7.49 0 00-.986-.57c-.182-.087-.277-.227-.297-.348l-.178-1.072a1.875 1.875 0 00-1.85-1.567h-1.844zm.072 2.122a.375.375 0 01.373-.322h1.844a.375.375 0 01.373.322l.178 1.072a2.625 2.625 0 001.417 1.963c.62.296 1.196.65 1.714 1.05a.375.375 0 00.45.084l1.266-.507a.375.375 0 01.456.164l.922 1.598a.375.375 0 01-.087.477l-.85.695a2.625 2.625 0 00-.98 2.08c.002.752.175 1.492.504 2.08.086.15.203.283.352.377l.85.695a.375.375 0 01.087.477l-.921 1.598a.375.375 0 01-.457.164l-1.266-.506a.375.375 0 00-.45.082c-.518.4-1.094.754-1.714 1.05a2.625 2.625 0 00-1.417 1.964l-.178 1.072a.375.375 0 01-.373.322H11.45a.375.375 0 01-.373-.322l-.178-1.072a2.625 2.625 0 00-1.417-1.964 8.09 8.09 0 01-1.714-1.05.375.375 0 00-.45-.082l-1.266.506a.375.375 0 01-.457-.164l-.921-1.598a.375.375 0 01.087-.477l.85-.695a2.625 2.625 0 00.98-2.08 7.648 7.648 0 01-.504-2.08 2.625 2.625 0 00-.98-2.08l-.85-.695a.375.375 0 01-.087-.477l.922-1.598a.375.375 0 01.457-.164l1.266.506a.375.375 0 00.45-.083c.518-.4 1.094-.754 1.714-1.05a2.625 2.625 0 001.417-1.963l.178-1.072zM12 9.375a2.625 2.625 0 100 5.25 2.625 2.625 0 000-5.25z" clipRule="evenodd" />
      </svg>
    ),
    'log-out': (
      <div  onClick={()=>alert("logout")}>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5"  >
        <path   fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v7.69l2.72-2.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 111.06-1.06l2.72 2.72V4.5a.75.75 0 01.75-.75zm0 17.5a.75.75 0 01-.75-.75V15.56a.75.75 0 111.5 0v4.94a.75.75 0 01-.75.75zm5.75-16.25H13a.75.75 0 000 1.5h4.75A1.25 1.25 0 0119 7.25v9.5a1.25 1.25 0 01-1.25 1.25H13a.75.75 0 000 1.5h4.75A2.75 2.75 0 0020.5 16.75v-9.5A2.75 2.75 0 0017.75 4z" clipRule="evenodd" />
      </svg>
      </div>
    ),
    'SignIn': (
      <div  >

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5"  >
        <path href='SignIn'  fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v7.69l2.72-2.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 111.06-1.06l2.72 2.72V4.5a.75.75 0 01.75-.75zm0 17.5a.75.75 0 01-.75-.75V15.56a.75.75 0 111.5 0v4.94a.75.75 0 01-.75.75zm5.75-16.25H13a.75.75 0 000 1.5h4.75A1.25 1.25 0 0119 7.25v9.5a1.25 1.25 0 01-1.25 1.25H13a.75.75 0 000 1.5h4.75A2.75 2.75 0 0020.5 16.75v-9.5A2.75 2.75 0 0017.75 4z" clipRule="evenodd" />
      </svg>
      </div>
    ),
    };
  

  return (
 <>

{typeof click==="function"  ?<div onClick={click} >
      <div className="flex items-center p-2 gap-4 hover:bg-gray-100 rounded-md transition-colors duration-300">
        <div className="flex-none">{icons[icon]}</div>
        <div className="flex-grow">{label}</div>
      </div>
    </div>
 :<Link href={label} >
      <div className="flex items-center p-2 gap-4 hover:bg-gray-100 rounded-md transition-colors duration-300">
        <div className="flex-none">{icons[icon]}</div>
        <div className="flex-grow">{label}</div>
      </div>
    </Link>
}
    </>
  );
};

export default SidBar;
