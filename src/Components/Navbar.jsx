import React, { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppDrawer from "./Drawer";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { auth,common } from "../config/call";
import { toast } from "react-toastify";
import * as Filesaver from 'file-saver'


import * as XLSX from 'xlsx';
const Navbar = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <React.Fragment>
      <RegularNavbar>{children}</RegularNavbar>
    </React.Fragment>
  );
};

const ExcelModal = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState('all');
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fectchData()    
  }, []);
  const fectchData = () => {
    common.getCollection().then(({ data: res }) => {
      setCategories(res.data.collectionData.recordset);
    });
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setSelectedDropdown(e.target.value);
  };


    const fileType = "application/vnd.openxmIformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
    const fileExtension = '.xlsx';
    const exportToExcel = async (excelData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(excelData); 
      const wb = { Sheets:{ 'data': ws }, SheetNames: ['data'] };
       const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
const data = new Blob([excelBuffer], { type: fileType });
Filesaver.saveAs(data, fileName + fileExtension);
    }
  


  const handleSubmit = () => {
    console.log('Selected option:', selectedOption);
    console.log('Selected dropdown:', selectedCategory);
    common.GetExcelApi(selectedCategory,selectedOption).then((res) => {
      let ImageList = []
      console.log("res=>>",res.data.data)
      res.data.data.map((item, i) => {
        let Data = {};
        Data['SrNo'] = i + 1;
        Data['PLUNo'] = item.plu;
        Data['Category Name'] = item.name ? item.name : 'Not Available';
        Data['Category Code'] = item.uid ? item.uid : '-';
        Data['ImageURL'] = item.url.includes('http')
          ? item.url
          : item.url.includes('/')
          ? "http://images.iykyknow.ai/imagine/".replace('imagine/', '') + item.url
          : "http://images.iykyknow.ai/imagine/" + item.url;
        ImageList.push(Data); // Moved inside the map function
      }); // Removed the extra comma here
      exportToExcel(ImageList,"check")
      // onClose();
    }).catch((err) => {
      console.log("err=>>",err)
      onClose();
    })
  };

 


  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-purple-700 rounded-lg p-8">
        <h2 className="text-white text-2xl mb-6">Download Excel Data</h2>
        <div className="mb-6">
          <label className="text-white block mb-2">Choose an option:</label>
          <div className="flex items-center">
            <input 
              type="radio"
              id="option1"
              name="Today"
              value="Today"
              checked={selectedOption === 'Today'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label htmlFor="option1" className="text-white mr-4">Today</label>

            <input
              type="radio"
              id="option2"
              name="Last 7 days"
              value="Last 7 days"
              checked={selectedOption === 'Last 7 days'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label htmlFor="option2" className="text-white mr-4">Last 7 days</label>

            <input
              type="radio"
              id="option3"
              name="all"
              value="all"
              checked={selectedOption === 'all'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label htmlFor="option3" className="text-white">all</label>
          </div>
        </div>
        <select
            value={selectedCategory}
            onChange={(v) => setSelectedCategory(v.target.value)}
            
            className="w-full border border-black py-1.5 px-2 rounded-lg"
          >
            <option value="" hidden>
           { selectedCategory ? selectedCategory : "Select category"}
            </option>
            {categories.map((item,index) => (
              <option key={index} value={item.id}>{item.name}</option>
            ))}
          </select>

        <div className="flex justify-end mt-2">
          <button
            onClick={onClose}
            className="bg-white text-purple-700 px-4 py-2 rounded-lg mr-2 hover:bg-purple-600"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-purple-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};



const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white w-96 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Enter Compnay Name</h2>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter something"
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
            >
              Submit
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};



const RegularNavbar = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInputValue, setModalInputValue] = useState('');
  const [isModalExelOpen, setIsModalExcelOpen] = useState(true);

  const handleOpenExcelModal = () => {
    setIsModalExcelOpen(true);
  };

  const handleCloseExcelModal = () => {
    setIsModalExcelOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModelSubmit = (value) => {
    console.log('Submitted value:', value);
    if(value !== ""){
      auth.updateUser({
        "company_name": value
    }).then(()=>{
      toast.success("Compnay Name added successfully");
      }).catch((err)=> {
        toast.error("Fail to add Company name");
      })
    }else{
      toast.error("Please Enter compnay name");
    }
  };

  const onLogout = () => {
    navigate("/");
    localStorage.clear();
  };

  useEffect(() => {
    if (token) {
      auth.userDetail().then(({ data }) => {
        setUser(data.data.user);
        if(data.data.user.company_name !== null){
          setIsModalOpen(false)
        } else{
          setIsModalOpen(true)

        }
      });
    }
  }, [token]);



  const onNavigate = (param) => {
    if (token) {
      navigate(param)
    }else{
      navigate('/login')
    }
  }

  return (
    <>
    
      <header class="header header--1 header--fixed ">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <nav class="menu d-lg-flex justify-content-lg-between align-items-lg-center py-3 py-lg-0">
                <div class="d-flex align-items-center justify-content-between">
                  <a
                    href="/"
                    class="logo link d-inline-flex align-items-center flex-shrink-0"
                  >
                    <img
                      src="assets/img/logo-light.png"
                      alt="logo"
                      class="img-fluid object-fit-contain"
                    />
                  </a>
                  <div className="flex gap-2">
                    {token && user && (
                      <div class="animated-border-btn cursor-pointer link d-inline-flex justify-content-center rounded overflow-hidden position-relative z-1">
                        <span class="transition bg-neutral-10 :bg-primary-key gap-2   clr-white px-6 py-2 fw-bold text-center hidden rounded max-[990px]:!flex">
                          {user.first_name[0].toUpperCase()}
                          {user.last_name[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <button
                      class="menu-toggle w-10 h-10 p-0 border-0 lh-1 bg-primary-50 clr-neutral-100 :clr-neutral-100 transition :bg-primary-300 rounded flex-shrink-0 d-lg-none order-sm-3 fs-24"
                      onClick={() => {
                        document.body.classList.toggle("menu-open");
                      }}
                    >
                      <MenuIcon />
                    </button>
                  </div>
                </div>
                <div class="menu-nav d-flex align-items-lg-center flex-column flex-lg-row flex-grow-1 gap-4 pb-4 pb-lg-0 rounded">
                  <ul class="list list-lg-row mx-lg-auto">
                    <li class="menu-list">
                      <a href="/" class="link menu-link">
                        Home{" "}
                      </a>
                    </li>
                    <li class="menu-list">
                      <span onClick={()=> onNavigate('/keyword')} class="link menu-link">
                        Genrate
                      </span>
                    </li>
                    <li class="menu-list">
                      <span onClick={()=> onNavigate('/setting')} class="link menu-link">
                        Settings
                      </span>
                    </li>
                  </ul>
                  <ul class="list list-lg-row gap-4 gap-lg-6 max-[990px]:!hidden">
                    {token ? (
                      <li class="menu-list mx-4 mx-lg-0">
                        <div
                          onClick={onLogout}
                          class="animated-border-btn link d-inline-flex justify-content-center rounded overflow-hidden position-relative z-1"
                        >
                          <span class="d-inline-block transition bg-neutral-10 :bg-primary-key clr-white px-6 py-2 fw-bold text-center rounded">
                            Log out
                          </span>
                        </div>
                      </li>
                    ) : (
                      <li class="menu-list mx-4 mx-lg-0">
                        <a
                          href="/login"
                          class="animated-border-btn link d-inline-flex justify-content-center rounded overflow-hidden position-relative z-1"
                        >
                          <span class="d-inline-block transition bg-neutral-10 :bg-primary-key clr-white px-6 py-2 fw-bold text-center rounded">
                            Login
                          </span>
                        </a>
                      </li>
                    )}
                    {token && user && (
                      <li class="menu-list mx-4 mx-lg-0">
                        <a
                          href="/login"
                          class="animated-border-btn link d-inline-flex justify-content-center rounded overflow-hidden position-relative z-1"
                        >
                          <span class="transition bg-neutral-10 :bg-primary-key gap-2 flex clr-white px-6 py-2 fw-bold text-center rounded">
                            {user.first_name[0].toUpperCase()}
                            {user.last_name[0].toUpperCase()}
                            <PersonIcon className="!text-[20px]" />
                          </span>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {children}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModelSubmit}
        inputValue={modalInputValue}
        setInputValue={setModalInputValue}
      />
      <ExcelModal
      isOpen={isModalExelOpen}
      onClose={handleCloseExcelModal}
      />
    </>
  );
};

export default Navbar;
