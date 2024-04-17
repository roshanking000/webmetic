/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import LeadProfile from "./lead_profile";

const LeadProfiles = ({
  data,
  onHandleSelect,
  onHandleSelection,
  onHandleCheck,
}) => {
  const { t } = useTranslation();

  const [selectedAll, setSelectedAll] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <div className="flex flex-col pb-12">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden rounded-lg">
            <div className="flex flex-col min-w-full bg-table">
              <div className="flex items-center gap-4">
                <div className="flex items-center py-5 text-xs font-bold text-table-th w-[40%] min-w-[200px]">
                  <span className="cursor-pointer inline-flex items-center">
                    {t("lead_profile.company")}
                  </span>
                </div>
                <div className="flex items-center py-5 text-xs font-bold text-table-th w-[15%] min-w-[300px]">
                  <span className="cursor-pointer inline-flex items-center text-center">
                    {t("lead_profile.city")}
                  </span>
                </div>
                <div className="flex justify-center items-center py-5 text-xs font-bold text-table-th w-[5%] min-w-[50px]">
                  <span className="cursor-pointer inline-flex items-center">
                    {t("lead_profile.pages")}
                  </span>
                </div>
                <div className="flex justify-center items-center py-5 text-xs font-bold text-table-th w-[20%] min-w-[200px]">
                  <span className="cursor-pointer inline-flex items-center">
                    {t("lead_profile.source")}
                  </span>
                </div>
                <div className="flex justify-center items-center py-5 text-xs font-bold text-table-th w-[5%] min-w-[50px]">
                  <span className="cursor-pointer inline-flex items-center">
                    {t("lead_profile.durations")}
                  </span>
                </div>
                <div className="flex items-center py-5 text-xs font-bold text-table-th w-[15%] min-w-[100px]">
                  <span className="cursor-pointer inline-flex items-center">
                    {t("lead_profile.social")}
                  </span>
                </div>
              </div>
            </div>
            {tableData.length === 0 && (
              <div className="text-center hover:bg-gray-100">
                {t("lead_profile.no_data")}
              </div>
            )}
            {tableData.map((item, index) => {
              return (
                <LeadProfile
                  key={index}
                  item={item}
                  value={index}
                  selectedAll={selectedAll}
                  onHandleSelect={(item) => onHandleSelect(item)}
                  onHandleCheck={(checkStatus, name) => {
                    let checkedCount = 0;
                    if (checkStatus === true) {
                      let _temp = checkedList;
                      checkedCount = _temp.length + 1;
                      _temp.push(name);
                      setCheckedList(_temp);
                    } else {
                      for (let i = 0; i < checkedList.length; i++) {
                        if (checkedList[i] === name) {
                          let _temp = checkedList;
                          checkedCount = _temp.length - 1;
                          _temp.splice(i, 1);
                          setCheckedList(_temp);
                        }
                      }
                    }
                    onHandleCheck(checkedCount);
                  }}
                />
              );
            })}
            {/* <table className="min-w-full divide-y divide-[#E2E8F0] bg-table pb-12">
              <thead className="bg-gray-50">
                <tr className="uppercase">
                  <th
                    scope="col"
                    className="flex items-center px-6 py-5 text-xs font-bold text-table-th"
                  >
                    <span className="cursor-pointer inline-flex items-center">
                      {t('lead_profile.company')}
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-xs font-bold text-center text-table-th"
                  >
                    <span className="cursor-pointer inline-flex items-center">
                    {t('lead_profile.city')}
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-xs font-bold text-center text-table-th"
                  >
                    <span className="cursor-pointer inline-flex items-center">
                    {t('lead_profile.pages')}
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-xs font-bold text-center text-table-th"
                  >
                    <span className="cursor-pointer inline-flex items-center">
                    {t('lead_profile.source')}
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-xs font-bold text-center text-table-th w-[200px]"
                  >
                    <span className="cursor-pointer inline-flex items-center">
                    {t('lead_profile.durations')}
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-xs font-bold text-center text-table-th"
                  >
                    <span className="cursor-pointer inline-flex items-center">
                    {t('lead_profile.social')}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-lg text-table-td">
                {tableData.length === 0 && (
                  <tr className="hover:bg-gray-100">
                    <td colSpan={8} className="text-center">
                      {t('lead_profile.no_data')}
                    </td>
                  </tr>
                )}
                {tableData.map((item, index) => {
                  return (
                    <LeadProfile
                      key={index}
                      item={item}
                      selectedAll={selectedAll}
                      onHandleSelect={(item) => onHandleSelect(item)}
                      onHandleCheck={(checkStatus, name) => {
                        let checkedCount = 0;
                        if (checkStatus === true) {
                          let _temp = checkedList;
                          checkedCount = _temp.length + 1;
                          _temp.push(name);
                          setCheckedList(_temp);
                        } else {
                          for (let i = 0; i < checkedList.length; i++) {
                            if (checkedList[i] === name) {
                              let _temp = checkedList;
                              checkedCount = _temp.length - 1;
                              _temp.splice(i, 1);
                              setCheckedList(_temp);
                            }
                          }
                        }
                        onHandleCheck(checkedCount);
                      }}
                    />
                  );
                })}
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadProfiles;
