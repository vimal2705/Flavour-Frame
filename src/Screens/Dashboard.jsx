import { useEffect, useState } from "react";
import $ from "jquery";
import { Link, useNavigate } from 'react-router-dom';
import dashboardLogo from "../assets/images/flavour-frame-logo.jpg";
import generateImage from "../assets/images/generate-image.png";
import collectionsIcon from "../assets/images/collection.png";
import galleryIcon from "../assets/images/gallery.png";
import logoutIcon from "../assets/images/logout.png";
import addIcon from "../assets/images/add.png";
import csvIcon from "../assets/images/csv.png";
import sliderImage from "../assets/images/slider-bg01.png";
import { auth,common } from "../config/call";
import * as XLSX from 'xlsx';
import * as Filesaver from 'file-saver'
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from '@mui/icons-material/Cancel';



import '../css/Dashboard.css'
import { toast } from "react-toastify";

const ExcelModal = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState('all');
  const [value, setvalue] = useState('all');
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
    if (e.target.value !== "all") {
      setvalue(parseInt(e.target.value))
    setSelectedOption(e.target.value)
    }else{
      setvalue(e.target.value)
    setSelectedOption(e.target.value)
    }
    ;
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
onClose()
    }
  


  const handleSubmit = () => {
    console.log('Selected option:', selectedOption);
    console.log('Selected dropdown:', selectedCategory);
    common.GetExcelApi(selectedCategory,selectedOption).then((res) => {
      let ImageList = []
      console.log("res=>>",res.data.data)
      res.data.data.map((item, i) => {
        console.log('Asdasd', item.url);
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
      <div className="bg-black rounded-lg p-8">
        <h2 className="text-white text-2xl mb-6">Download Excel Data</h2>
        <div className="mb-6">
          <label className="text-white block mb-2">Choose an option:</label>
          <div className="flex items-center">
            <input 
              type="radio"
              id="option1"
              name="Today"
              value={1}
              checked={value === 1}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label htmlFor="option1" className="text-white mr-4">Today</label>

            <input
              type="radio"
              id="option2"
              name="Last 7 days"
              value={7}
              checked={value === 7}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label htmlFor="option2" className="text-white mr-4">Last 7 days</label>

            <input
              type="radio"
              id="option3"
              name="all"
              value="all"
              checked={value === 'all'}
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
            {categories.map((item,i) => (
              <option key={i} value={item.id}>{item.name}</option>
            ))}
          </select>

        <div className="flex justify-end mt-2">
          <button
            onClick={onClose}
            className="bg-white text-black-700 px-4 py-2 rounded-lg mr-2 hover:bg-black-600"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-black-800"
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

const CategoryModel = ({isOpen, onClose})=> {

  const Category = () => {
    const [data, setData] = useState([]);
    const [params, setParams] = useState({ uid: "", name: "" });
  
    const fetchApiData = () => {
      common.getCollection().then(({ data }) => {
        setData(data.data.collectionData.recordset);
      });
    };
    useEffect(() => {
      fetchApiData();
    }, []);
  
    const onAdd = () => {
      if (params.name && params.uid) {
        common
          .addCollection(params)
          .then(({ data }) => {
            fetchApiData();
            setParams({ uid: "", name: "" });
            toast.success(data.message);
          })
          .catch(() => {
            toast.error("something went wrong");
          });
      } else {
        toast.error("Some Prop are missing");
      }
    };
  
    return (
      <div>
        <div className="flex gap-2 mt-3">
          <input
            value={params.name}
            placeholder="Category Name"
            onChange={(v) => setParams((e) => ({ ...e, name: v.target.value }))}
            className="bg-black/40 px-3 py-1 placeholder:text-gray-100 flex-1 text-white  rounded-lg"
          />
          <input
            type="number"
            placeholder="Code"
            value={params.uid}
            onChange={(v) => setParams((e) => ({ ...e, uid: v.target.value }))}
            className="bg-black/40 px-3 py-1 placeholder:text-gray-100 flex-1  text-white rounded-lg"
          />
          <div
            className="bg-black  h-[30px] w-[30px] flex justify-center items-center bottom-[10px] left-[10px] rounded-full"
            onClick={onAdd}
          >
            <AddIcon className="!text-white !text-[18px]" />
          </div>
        </div>
        <div className="mt-2 max-h-[250px] overflow-auto">
          {data.map((item,i) => (
            <div key={i} className="flex justify-between">
              <p>{item.name}</p>
              <p>{item.uid}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CardItem = ({ title, children }) => {
    return (
      <div className="bg-white relative rounded-2xl p-2 w-full">
        <p className="font-bold border-b pb-2 !mb-1">{title}</p>
        <div className="px-2"> {children}</div>
      </div>
    );
  };

  if (!isOpen) return null;

  return(
    <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-black rounded-lg p-2">
      <div onClick={()=> onClose()} className="text-cyan-50 bg-red p-2 flex right-1 justify-end items-center" > <CancelIcon /></div>
      <CardItem title="Categories" >
            <Category />
          </CardItem>
      </div>
      </div>
  )

}


function Dashboard() {
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInputValue, setModalInputValue] = useState('');
  const [user, setUser] = useState(undefined);
  const [data, setData] = useState([]);
  const [isModalExelOpen, setIsModalExcelOpen] = useState(false);
  const [isModalcategoryOpen, setIsModalCategoryOpen] = useState(false);
  const navigate = useNavigate()
  const onLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const handleClosecategoryModal = () => {
    setIsModalCategoryOpen(false);
  };
  const handleOpencategoryModal = () => {
    setIsModalCategoryOpen(true);
  };
  const handleOpenExcelModal = () => {
    setIsModalExcelOpen(true);
  };
  const handleCloseExcelModal = () => {
    setIsModalExcelOpen(false);
  };
    useEffect(() => {
        $(document).ready(function () {
          // Toggle checkbox within .collectionItem on click
          $(".collectionItem").click(function (event) {
            // Prevent the event from immediately propagating to .collectionItem
            if (!$(event.target).is("input:checkbox")) {
              var checkbox = $(this).find(".selectedCollection");
              checkbox.prop("checked", !checkbox.prop("checked"));
    
              // Add or remove class based on checkbox state
              $(this).toggleClass(
                "highlightedCollection",
                checkbox.prop("checked")
              );
            }
          });
    
          // Change class based on checkbox state without clicking on .collectionItem
          $(".selectedCollection").change(function () {
            $(this)
              .closest(".collectionItem")
              .toggleClass("highlightedCollection", this.checked);
          });
        });
    
        $(document).ready(function () {
          var sideNavTop = $(".sideNavigation").offset().top; // Initial top position
          var contentHeaderTop = $(".contentHeader").offset().top; // Adjust accordingly
          var toolBarHeaderTop = $(".toolBarHeader").offset().top; // Adjust accordingly
    
          $(window).scroll(function () {
            var currentScroll = $(window).scrollTop();
    
            if (currentScroll >= sideNavTop) {
              $(".sideNavigation").addClass("fixed-top");
            } else {
              $(".sideNavigation").removeClass("fixed-top");
            }
    
            if (currentScroll >= contentHeaderTop) {
              $(".contentHeader").addClass("fixed-top");
            } else {
              $(".contentHeader").removeClass("fixed-top");
            }
    
            if (currentScroll >= toolBarHeaderTop) {
              $(".toolBarHeader").addClass("fixed-top");
            } else {
              $(".toolBarHeader").removeClass("fixed-top");
            }
          });
        });
      }, []);

      useEffect(() => {
        if (token) {
          auth.userDetail().then(({ data }) => {
            setUser(data.data.user);
            // fetchListing(data.data.user.id)
            fetchListing(87)
            if(data.data.user.company_name !== null){
              setIsModalOpen(false)
            } else{
              setIsModalOpen(true)
            }
          });
        }
      }, [token]);

      const fetchListing = (id) => {
        // common.getListing().then(({ data }) => {
        //   console.log("asdasd",data);
        //   setData(data.data);
        // });
        common.getbycollection(id).then(({ data }) => {
          setData(data.data);
        });

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
  return (
    <div className="fullWidthContainer">
      <div className="sideNavigation">
        <img className="dashboardLogo" src={dashboardLogo} alt="Dashboard Logo" />
        <ul>
          <li>
            <img src={generateImage} alt="Generate Icon" /><Link to="/generate">Generate</Link>
          </li>
          <li className="active">
            <img src={collectionsIcon} alt="Collections Icon" /><Link to="/dashboard">Collections</Link>
          </li>
        </ul>
        <div className="userDetails">
        {token && <>
         <span onClick={() => navigate('/settings')} className="userIcon"> {user?.first_name[0].toUpperCase()}
                          {user?.last_name[0].toUpperCase()}</span>
                          {user?.first_name.toUpperCase()}
                          {user?.last_name.toUpperCase()}
        <span onClick={onLogout} className="logoutIcon h-6 w-10">  <img  className="logoutIcon h-6 w-10" src={logoutIcon} alt="Logout Icon" />
        </span>
          </>
  }
  </div>
      </div>
      <div className="contentContainer">
        <div className="contentHeader">
          <h1>Collections</h1>
        </div>
        <div className="toolBarHeader">
          <input className="searchTextBox" type="text" placeholder="search" />
          <div className="buttonSection">
            <button onClick={handleOpencategoryModal}><img src={addIcon} alt="Add Icon" /> Add Collection</button>
            <button onClick={handleOpenExcelModal}> <img src={csvIcon} alt="Download CSV Icon" /> Download CSV</button>
          </div>
        </div>
<div className="collectionGrid">
        {
          Object.keys(data)?.map((item,index) => (
            <div className="collectionItem" key={index} >
              <input className="selectedCollection" type="checkbox" />
              <span className="collectionNumber">{data[item].length}</span>
              <ul className="imageGrid">
                {
                  data[item].slice(0, 4).map((datas,i) => {
                    const ImgUrl = datas?.url?.includes('/')
                    ? "http://images.iykyknow.ai/".replace('imagine/', '') + datas.url
                    : "http://images.iykyknow.ai/" + datas.url;
                    console.log("ImgUrl",ImgUrl);
                    return(
                    <li key={i}><img src={ImgUrl} alt="" />{item.url}</li>
                  )})
                }
              </ul>
              <span className="itemName">{item}</span>
            </div>
           
          ))
        }
      </div>
      </div>
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
      <CategoryModel
isOpen={isModalcategoryOpen}
onClose={handleClosecategoryModal}      />
    </div>
  )
}

export default Dashboard