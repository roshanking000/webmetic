import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from "react-toastify";

import { fetchConnectedWebsites } from "@/api/connectedWebsitesService";

import { useAuth } from "@/provider/authProvider";

import Sidebar from '../components/sidebar'
import Header from '../components/header'

const BaseLayout = () => {
  const { account } = useAuth();

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

  return (
    <div className="w-full min-h-screen flex flex-row bg-sidebar">
      <Sidebar />
      <main className='flex flex-col gap-[44px] bg-main w-full rounded-3xl sm:px-[60px] py-8 sm:ml-[120px]'>
      <Header period={period} setPeriod={setPeriod} selectedDomain={selectedDomain} />
        <Outlet context={[period]} />
      </main>
    </div>
  )
}

export default BaseLayout
