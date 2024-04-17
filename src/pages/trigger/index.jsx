import { useState, useEffect } from "react";

import InformationIcon from "../../assets/icons/InformationIcon";

const TriggerPage = () => {
  const [showSelectionIcons, setShowSelectionIcons] = useState(false);

  const [pageTotalCount, setPageTotalCount] = useState(
    Math.ceil(triggerData.length / 10)
  );
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex p-[10px] justify-between items-start">
        <div className="flex flex-col justify-center gap-[10px]">
          <p className="text-[28px] font-semibold text-primary-600">Trigger</p>
          <div className="flex items-center gap-[10px]">
            <InformationIcon color="#5082C4" />
            <p className="text-sm font-normal text-secondary-400 text-ellipsis">
              Automate tasks, send to your CRM or send notification emails to
              your co-workers.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="flex px-3 py-[10px] justify-center items-center gap-2 rounded-lg bg-secondary-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M7 0C6.69071 0 6.44 0.25072 6.44 0.56V6.44H0.56C0.250712 6.44 0 6.69071 0 7C0 7.30929 0.250712 7.56 0.56 7.56H6.44V13.44C6.44 13.7493 6.69071 14 7 14C7.30929 14 7.56 13.7493 7.56 13.44V7.56H13.44C13.7493 7.56 14 7.30929 14 7C14 6.69071 13.7493 6.44 13.44 6.44H7.56V0.56C7.56 0.25072 7.30929 0 7 0Z"
              fill="white"
            />
          </svg>
          <p className="text-sm font-medium text-ellipsis text-white">
            Add Triggers
          </p>
        </button>
      </div>
      <TriggerTable
        data={triggerData}
        currentPage={currentPage}
        onHandleSelection={(selectedAll) => {
          setShowSelectionIcons(selectedAll);
        }}
        onHandleCheck={(checkedCount) => {
          if (checkedCount === 0) setShowSelectionIcons(false);
          else setShowSelectionIcons(true);
        }}
      />
    </section>
  );
};

export default TriggerPage;

const TriggerTable = ({
  data,
  currentPage,
  onHandleSelection,
  onHandleCheck,
}) => {
  const [selectedAll, setSelectedAll] = useState(false);
  const [tableData, setTableData] = useState(data);
  const [checkedList, setCheckedList] = useState([]);

  return (
    <div className="overflow-x-auto">
      <div className="p-1.5 w-full inline-block align-middle">
        <div className="overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-[#E2E8F0] bg-table pb-12">
            <thead className="bg-gray-50">
              <tr className="uppercase text-xs font-bold text-table-th">
                <th scope="col" className="pl-3">
                  <div className="flex items-center h-5">
                    <input
                      id="checkbox-all"
                      type="checkbox"
                      className="text-blue-600 border-[#021B3F] rounded-sm focus:ring-0 cursor-pointer"
                      onClick={() => {
                        setSelectedAll(!selectedAll);
                        onHandleSelection(!selectedAll);
                      }}
                    />
                    <label htmlFor="checkbox" className="sr-only">
                      Checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="flex items-center py-5">
                  <p className="cursor-pointer inline-flex items-center">
                    name
                  </p>
                </th>
                <th scope="col" className="py-5 text-center">
                  <span className="cursor-pointer inline-flex items-center">
                    assigned tags
                  </span>
                </th>
                <th scope="col" className="py-5 text-center">
                  <span className="cursor-pointer inline-flex items-center">
                    total matched
                  </span>
                </th>
                <th scope="col" className="py-5 text-center">
                  <span className="cursor-pointer inline-flex items-center">
                    email
                  </span>
                </th>
                <th scope="col" className="py-5 text-center">
                  <span className="cursor-pointer inline-flex items-center">
                    website
                  </span>
                </th>
                <th scope="col" className="py-5 text-center">
                  <span className="cursor-pointer inline-flex items-center">
                    updated at
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="text-xs font-normal text-table-td">
              {tableData.map((item, index) => {
                if (
                  (currentPage - 1) * 10 <= index &&
                  index < currentPage * 10
                ) {
                  return (
                    <TriggerItem
                      key={index}
                      item={item}
                      selectedAll={selectedAll}
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
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TriggerItem = ({ item, selectedAll, onHandleCheck }) => {
  const [selected, setSelected] = useState(selectedAll);

  useEffect(() => {
    setSelected(selectedAll);
  }, [selectedAll]);

  return (
    <tr className="cursor-pointer hover:bg-gray-100">
      <td className="pl-3 py-5">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className="text-blue-600 border-[#64748B] rounded-sm focus:ring-0"
            checked={selected}
            onChange={() => {
              setSelected(!selected);
              onHandleCheck(!selected, item.company_name);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <label htmlFor="checkbox" className="sr-only">
            Checkbox
          </label>
        </div>
      </td>
      <td className="text-left">
        <p>{item.name}</p>
      </td>
      <td>
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap items-center gap-[5px] text-center max-w-[150px]">
            {item.assigned_tags.map((item, index) => {
              return (
                <p
                  key={index}
                  className="inline-flex px-[10px] py-[5px] justify-center items-center gap-[10px] rounded-full bg-tertiary-400 text-[10px] font-semibold text-neutral-50"
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>
      </td>
      <td className="text-sm font-semibold text-secondary-400 text-center">
        <p>{item.total_matched}</p>
      </td>
      <td className="text-center">
        <p>{item.email}</p>
      </td>
      <td className="text-center">
        <p>{item.website}</p>
      </td>
      <td className="text-center">
        <p>{item.updated_at}</p>
      </td>
    </tr>
  );
};

const triggerData = [
  {
    name: "Website Visitor",
    assigned_tags: ["Top", "Most Visited"],
    total_matched: 10,
    email: "",
    website: "example.com",
    updated_at: "November 27, 2023",
    status: "active",
  },
  {
    name: "Location: USA, UK",
    assigned_tags: [],
    total_matched: 10,
    email: "sender@exam.io",
    website: "example.com",
    updated_at: "November 27, 2023",
    status: "active",
  },
  {
    name: "New Trigger1",
    assigned_tags: ["E-Commerce", "Website", "Most Visited"],
    total_matched: 10,
    email: "Wasim@exam.io",
    website: "example.com",
    updated_at: "November 27, 2023",
    status: "active",
  },
  {
    name: "Daily visitor",
    assigned_tags: [],
    total_matched: 10,
    email: "sender@exam.io",
    website: "example.com",
    updated_at: "November 27, 2023",
    status: "pause",
  },
  {
    name: "Website Visitor",
    assigned_tags: ["Top", "Most Visited"],
    total_matched: 10,
    email: "",
    website: "example.com",
    updated_at: "November 27, 2023",
    status: "active",
  },
  {
    name: "Location: USA, UK",
    assigned_tags: [],
    total_matched: 10,
    email: "sender@exam.io",
    website: "example.com",
    updated_at: "November 27, 2023",
    status: "active",
  },
  {
    name: "New Trigger1",
    assigned_tags: ["E-Commerce", "Website", "Most Visited"],
    total_matched: 10,
    email: "Wasim@exam.io",
    website: "example.com",
    updated_at: "November 27, 2023",
    status: "active",
  },
  {
    name: "Daily visitor",
    assigned_tags: [],
    total_matched: 10,
    email: "sender@exam.io",
    website: "example.com",
    updated_at: "November 27, 2023",
    status: "pause",
  },
];
