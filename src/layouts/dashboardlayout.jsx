import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import clsx from "clsx";

import { useAuth } from "../provider/authProvider";

import { fetchConnectedWebsites } from "@/api/connectedWebsitesService";

import Header from "../components/header";
import Sidebar from "../components/sidebar";

const DashboardLayout = () => {
  const { account } = useAuth();
  const [showSplash, setShowSplash] = useState(null);
  const [period, setPeriod] = useState("All Time");
  const [selectedDomain, setSelectedDomain] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await fetchConnectedWebsites(account._id);
    if (result.status === "success") {
      setSelectedDomain([...selectedDomain, result.connected_websites[0]]);
    } else toast.error(result.msg);
  };

  useEffect(() => {
    const getWebsite = async () => {
      await axios
        .get(
          `${import.meta.env.VITE_SERVER_URL}/account/get_website/${
            account._id
          }`
        )
        .then(async (response) => {
          if (response.data.code === 200) {
            if (response.data.data[0].website.length === 0) setShowSplash(true);
            else setShowSplash(false);
          } else toast.error(response.data.message);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        });
    };
    getWebsite();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-row bg-sidebar">
      {showSplash === false && <Sidebar />}
      <main className={clsx("flex flex-col gap-[44px] bg-main w-full rounded-3xl", showSplash === false ? "sm:px-[60px] py-8 sm:ml-[120px]" : "")}>
        <Header period={period} setPeriod={setPeriod} selectedDomain={selectedDomain} />
        <Outlet context={[showSplash, setShowSplash, period]} />
      </main>
    </div>
  );
};

export default DashboardLayout;
