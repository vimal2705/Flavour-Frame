import { useEffect, useState } from "react";
import $ from "jquery";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Dashboard.css";
import { auth,common } from "../config/call";
import { toast } from "react-toastify";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import Loader from "../components/Loader";

const Item = ({ data, onupdate,index,index1}) => {
    const [pluValue, setPluValue] = useState();
    const [isClicked, setIsClicked] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isSelected, setisSelected] = useState(data.isSelected);
    const navigate = useNavigate()
    const token = localStorage.getItem("token");

    
    useEffect(() => {
      if (token) {
        
        fectchData()    
      }
    }, []);
    const fectchData = () => {
      common.getCollection().then(({ data: res }) => {
        console.log("res.data",res.data);
        setCategories(res.data.collectionData.recordset);
        const filteredItem = res.data.collectionData.recordset.find(item => item.uid === data.collection_id);
        setSelectedCategory(filteredItem ? filteredItem.name : "")
        console.log("filteredItem ",filteredItem ? filteredItem.id : "")
      });
    }
  
    useEffect(() => {
      if (data.plu) setPluValue(data.plu) 
      if(data.isSelected) setisSelected(data.isSelected)
    
    }, [data.plu,data.isSelected]);
  
    const onSubmit = () => {
      let param = { plu: pluValue, isSelected: 0 };
      if (selectedCategory) {
        param.collection_id = selectedCategory;
        console.log("data.uid,",data.uid);
        common.updatePLU(data.id, param).then((res) => {
          toast.success("Updated successfully");
        });
        const newdata = {
          collection_id:selectedCategory,
          id:data.id,
          isSelected:isSelected,
          parent_id:data.parent_id,
          plu:pluValue,
          url:data.url
        }
        onupdate(newdata,index,index1)
        setIsClicked(false)
      }else{
        toast.error("Select Category");
        setIsClicked(true)
  
      }
    };
    const onSelect = (item) => {
  if(!item){
    let param = { plu: pluValue, isSelected: 1 };
    common.updatePLU(data.id, param).then((res) => {
          toast.success("Updated successfully");
          setisSelected(true)
        }).catch((err)=> console.log("errr",err))}
    }
  
    const downloadImage = () => {
      const imageUrl = `http://images.iykyknow.ai/${data.url}`; 
      fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectURL;
        a.download = data.url; 
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(objectURL);
        toast.success("saved successfully");
  
      })
      .catch(error => {
        toast.error("Fail to save");
  
        console.error('Error downloading image:', error);
      });
    };
  
    return (
      <div className="relative flip-box aspect-square">
        <div
          className="flip-box-inner "
          style={{ transform: isClicked ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <div
            className="flip-box-front rounded-2xl overflow-hidden bg-white "
            onClick={() => setIsClicked(true)}
          >
            <img src={`http://images.iykyknow.ai/${data.url}`} className="h-full w-full "/>
         {data.plu && <div className="bg-black/40 absolute text-[12px] top-[12px] left-[12px] text-white rounded-full p-2">
              {data.plu}
            </div>}
            <div className="bg-black absolute h-[40px] w-[40px] flex justify-center items-center bottom-[10px] left-[10px] rounded-full" onClick={downloadImage}>
              <FileDownloadIcon className="!text-white"  />
            </div>
          {data.plu && 
          <div onClick={() => onSelect(data.isSelected)} 
          className={`bg-black/40 absolute h-[40px] w-[40px] flex justify-center items-center bottom-[10px] right-[10px] rounded-full ${isSelected && 'bg-green-500'}`} >
              <CheckCircleOutlineIcon className="!text-white z-20" />
            </div>
            }
          </div>
          <div
            class="flip-box-back rounded-2xl flex flex-col p-4 overflow-hidden bg-white"
            style={{ transform: "rotateY(180deg)" }}
          >
            <select
              value={selectedCategory}
              onChange={(v) => setSelectedCategory(v.target.value)}
              
              className="w-full border border-black py-1.5 px-2 rounded-lg"
            >
              <option value="" hidden>
             { selectedCategory ? selectedCategory : "Select category"}
              </option>
              {categories.map((item,index) => (
                <option value={item.uid} key={index}>{item.name}</option>
              ))}
            </select>
            <div className="flex-1" />
  
            <p className="font-bold text-[15px] mt-4">Add PLU No.</p>
            <input
              value={pluValue}
              onChange={(e) => setPluValue(e.target.value)}
              className="text-[18px] text-center focus:outline-0"
              placeholder="PLU Number"
            />
            <div className="flex-1" />
            <div className="flex justify-around pt-2 border-t border-black">
              <div className="cursor-pointer" onClick={() => setIsClicked(false)}>
                <HighlightOffIcon className="!text-[40px]" />
              </div>
              <div onClick={onSubmit}>
                <SaveIcon className="!text-[40px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


const ReGenerate = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(undefined);
  const [keyword, setKeyword] = useState(location.state?.keyword || "");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    if (token) {
    if (location.state?.id) {
      common.getDetails(location.state?.id).then(({ data }) => {
        console.log("data",data)
        setData(data.data);
        setLoading(false)
      });
    }
  }else{
    navigate("/")
    setLoading(false)
  }
  }, [location]);

  const fetchListing = () => {
    common.getListing().then(({ data }) => {
      console.log("asdasd", data);
      setData(data.data);
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setSearchValue(selectedImage);
  };


const onupdate = (updatedata,id,index1) => {
    var newdata = {...data}
    newdata.imageData[index1].imagineData[id] = updatedata
    setData(newdata)
  }

  const  handleRegenerate = (param) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } else {
      const formData = new FormData();
      const key = typeof param === "string" ? "prompt" : "image";
      formData.append(key, param);
      common.regenerateImage(location?.state?.id, formData).then( navigate("/generate"));
    }
  };

  return (
    <>
    {  
          loading ? <Loader/> : <div className=" bg-black h-screen pt-[100px] max-h-[100vh] overflow-auto">
          <div className="flex mx-20"
          onClick={() => navigate('/generate')}
          >
            <CancelIcon sx={{
              fontSize:30,
              color:"#fff"
            }}/>
          </div>
             <div className="flex justify-center items-center my-4">
            <input
              type="text"
              placeholder="Keyword"
              value={keyword}
              className="block mr-2 px-4 py-2 rounded border border-black"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              onClick={() => handleRegenerate(keyword)}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              Regenerate
            </button>
          </div>
         {data && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-[5%] my-4">
              {data.imageData?.map((item,index1) => (item.imagineData.map((item,index) => (
                <Item data={item} onupdate={onupdate} index={index} index1={index1} key={index}/>
                ))))}
            </div>
          )}
        </div>
    }
    </>
    
  );
};

export default ReGenerate;
