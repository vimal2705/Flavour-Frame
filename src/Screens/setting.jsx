import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { common } from "../config/call";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { auth } from "../config/call";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";


const CardItem = ({ title, children }) => {
  return (
    <div className="bg-white relative rounded-2xl p-2 w-full">
      <p className="font-bold border-b pb-2 !mb-1">{title}</p>
      <div className="px-2"> {children}</div>
    </div>
  );
};

const Selector = ({ list }) => {
  const [selected, setSelected] = useState(list[0]);
  return (
    <div>
      {list.map((item,i) => (
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setSelected(item)}
          key={i}
        >
          <p>{item}</p>
          {item === selected && (
            <div>
              <CheckCircleIcon className="!text-black" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Category = () => {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({ uid: "", name: "" });
  const token = localStorage.getItem("token");

  const fetchApiData = () => {
    common.getCollection().then(({ data }) => {
      setData(data.data.collectionData.recordset);
    });
  };
  useEffect(() => {
    if (token) {
      
      fetchApiData();
    }
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

const SettingScreen = (props) => {
  const [user, setUser] = useState(undefined);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  useEffect(() => {
    setLoading(true)
    if (token) {
      auth.userDetail().then(({ data }) => {
        setUser(data.data.user);
        setLoading(false)

      });
    }else{
      navigate("/")
      setLoading(false)

    }
  }, [token]);

  return (
    <div lassName=" bg-black h-screen pt-[100px] max-h-[100vh]">
    {
      loading ? <Loader/> :
      <div className=" bg-black h-screen pt-[100px] max-h-[100vh] overflow-auto ">
      <div className="px-[20px] max-md:flex-col flex gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <CardItem title="Company Name">{user?.company_name}</CardItem>
          <CardItem title="Photography">
            <Selector list={["Default", "Minimalist", "Studio Shot"]} />
          </CardItem>
          <CardItem title="Camera Angle">
            <Selector
              list={["Default", "Тор", "Front", "45 Deg", "75 Deg", "Close Up"]}
            />
          </CardItem>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <CardItem title="Photo Theme">
            <Selector list={["Default", "Dark", "Light"]} />
          </CardItem>
          <CardItem title="Categories">
            <Category />
          </CardItem>
        </div>
      </div>
    </div>
    }
    </div>
    
  );
};

export default SettingScreen;
