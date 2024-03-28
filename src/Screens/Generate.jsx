import { useEffect, useLayoutEffect, useState } from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import dashboardLogo from "../assets/images/flavour-frame-logo.jpg";
import generateImage from "../assets/images/generate-image.png";
import collectionIcon from "../assets/images/collection.png";
import galleryIcon from "../assets/images/gallery.png";
import logoutIcon from "../assets/images/logout.png";
import uploadImageIcon from "../assets/images/uploadimage.png";
import mime from "mime";

import "../css/Dashboard.css";
import { auth,common } from "../config/call";
import CardItem from "../components/CardItem";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";


const Generate = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function formatDate(dateString) {
    const date = new Date(dateString);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }
  }

  const onLogout = () => {
    setLoading(true)
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
      setLoading(false)
    }, 500);

  };
    useLayoutEffect(()=>{
      setLoading(true)
      fetchListing()
    },[])

  useEffect(() => {
    setLoading(false)
if (loading) {
  
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
      var sideNavTop = $(".sideNavigation").offset().top;
      $(window).scroll(function () {
        var currentScroll = $(window).scrollTop();

        if (currentScroll >= sideNavTop) {
          $(".sideNavigation").addClass("fixed-top");
        } else {
          $(".sideNavigation").removeClass("fixed-top");
        }
      });
    });
  }
  setLoading(false)
  }, []);
  useEffect(() => {
    setLoading(true)

    if (token) {
      auth.userDetail().then(({ data }) => {
        setUser(data.data.user);
      });
      setLoading(false)
    }else{
      setLoading(false)
      navigate("/")
    }

  }, [token]);



  const fetchListing = () => {
    common.getListing().then(({ data }) => {
      console.log("asdasd", data);    
      const sortedArray = data.data.sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt));
      const groupedData = sortedArray.reduce((acc, obj) => {
        const date = new Date(obj.updateAt).toLocaleDateString('en-GB');
        const formattedDate = formatDate(obj.updateAt);
        const existingGroup = acc.find(group => group.Date === formattedDate);
        if (existingGroup) {
          existingGroup.data.push(obj);
        } else {
          acc.push({ Date: formattedDate === new Date().toLocaleDateString('en-GB') ? 'Today' : formattedDate, data: [obj] });
        }
        return acc;
      }, []);
      setLoading(false)
      setData(groupedData);
    }).catch((err)=>{
      console.log("err",err);
      setLoading(false)
    })
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    console.log("e.target.files[0]",e.target.files[0]);
    setSearchValue(selectedImage);
  };
  const onUpload = () => {

      const input = document.getElementById("file-input");
      input.click();
  };
const onGenerate = (param) => {
setLoading(true)
  console.log("Param",param);
  const token = localStorage.getItem("token");
  if (!token) {
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
    setLoading(false)
  } else {
    const formData = new FormData();
    
    const key = typeof param === "string" ? "prompt" : "image";
    formData.append(key, param, param.name);
    console.log("key, param, param.name",key, param, param.name);
    if (typeof param === "string") {
      formData.append(key, param);
         common.generateImage(formData).then(() => {fetchListing()
          toast.success("Success")
          setLoading(true)
        }).catch((err)=> {
          console.log("err",err);
          toast.error("Something went wrong")
          setLoading(true)
        })
    }else{
      var myHeaders = new Headers();
      const Bearer=  "Bearer " + localStorage.getItem("token")
      myHeaders.append("Authorization", Bearer);
     
      var formdata = new FormData();
      formdata.append("image", param, "_Maha Shivaratri Post.png");
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      const Base = process.env.REACT_APP_API_URL
      fetch(`${Base}/api/v1`, requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result)
          fetchListing()
          toast.success("Image uploaded")
          setLoading(false)
        })
        .catch(error => {
          console.log('error', error)
          toast.error("Something went wrong")
          setLoading(false)
        });
   }
setSearchValue("")
  }

};
  return (
    <>
    {
      loading ? <Loader/> : 
      <div className="fullWidthContainer">
      <div className="sideNavigation">
        <img
          className="dashboardLogo"
          src={dashboardLogo}
          alt="Dashboard Logo"
        />
        <ul>
          <li className="active">
            <img src={generateImage} alt="Generate Icon" />
            <a href="#">Generate</a>
          </li>
          <li>
            <img src={collectionIcon} alt="Collections Icon"  />
            <Link to="/dashboard">Collections</Link>
          </li>
        </ul>
        <div onClick={() => navigate('/settings')} className="userDetails">
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
      <div className="fixed top-0 rigth-0 flex items-center justify-center w-screen p-4 gap-4 bg-gradient-to-b from-gray-800 to-black shadow-lg z-50"
      style={{ width: 'calc(100% - 220px)' }}
      >
  <span  className="text-white">Generate</span>
  <input
    type="text"
    value={
      typeof searchValue === "string" ? searchValue : searchValue.name
    }
    disabled={typeof searchValue !== "string"}
    onChange={(e) => setSearchValue(e.target.value)}
    placeholder="Try 'Pizza with glass of beer on side'"
    className="flex-1 px-4 py-2 rounded-lg border border-white focus:outline-none focus:border-gray-500"
  />
  <img onClick={onUpload} src={uploadImageIcon} alt="Upload Image Icon" className="w-6 h-6 bg-white rounded" />
  <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            id="file-input"
          />
  <button     onClick={() => onGenerate(searchValue)}
 className="px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-900">Generate</button>
</div>
<div  style={{ height: '100vh', overflowY: 'auto' ,marginTop:60}}>
  {
    data.map((item,i) => (
      <div key={i} className="flex flex-col p-10 bg-white  m-10 gap-2 rounded-xl">
    <h1 className="text-xl text-black font-bold px-[2%]">{item.Date.toUpperCase()}</h1>
    <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-[2%]">
    {item.data?.map((item,index) => (
            <div
            key={index}
              className="bg-white relative rounded-2xl overflow-hidden aspect-square"
              onClick={() => navigate("/regenrate", { state: { id: item.id,keyword:item.jina } })}
            >
              <CardItem data={item} />
            </div>
          ))}
    </div>
  </div>
    ))
  }
        </div>
      </div>
    </div>
}
      </>   
  );
};

export default Generate;
