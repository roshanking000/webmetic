import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  FaXTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { format } from "date-fns";

import websiteLinkIcon from "../assets/images/website_link.svg";
import lineIcon from "../assets/images/line.png";
import dotIcon from "../assets/images/dot.png";
import downloadIcon from "../assets/images/download.svg";
import removeIcon from "../assets/images/remove.svg";
import RecordingIcon from "../assets/icons/RecordingIcon";

const LeadProfile = ({
  item,
  value,
  selectedAll,
  onHandleSelect,
  onHandleCheck,
}) => {
  console.log(item);
  const [selected, setSelected] = useState(selectedAll);
  const [open, setOpen] = useState(-1);
  const [open1, setOpen1] = useState(-1);

  useEffect(() => {
    setSelected(selectedAll);
  }, [selectedAll]);

  const secondsToHMS = (seconds) => {
    if (seconds > 600) return "10:0";
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;
    return minutes + ":" + remainingSeconds;
  };

  const handleOpen = (value) => setOpen(open === value ? -1 : value);

  const handleOpen1 = (value) => setOpen1(open1 === value ? -1 : value);

  return (
    <Accordion open={open === value}>
      <AccordionHeader onClick={() => handleOpen(value)}>
        <div className="flex gap-4 items-center hover:bg-gray-100 w-full">
          <div className="flex items-center gap-4 py-4 text-left w-[40%] min-w-[200px]">
            {item.logo !== null ? (
              <img
                alt={item.company}
                className="w-9 h-9 rounded-full"
                src={`${import.meta.env.VITE_IMG_URL}${item.logo}`}
              />
            ) : (
              <div className="flex flex-col justify-center items-center gap-[10px] w-9 h-9 p-[10px] bg-green_medium rounded-full">
                <p className="text-xl font-semibold text-primary-400">
                  {item.company.charAt(0).toUpperCase()}
                </p>
              </div>
            )}
            <p>{item.company}</p>
          </div>
          <div className="text-left w-[15%] min-w-[300px]">
            <p>{item.city}</p>
          </div>
          <div className="text-center w-[5%] min-w-[50px]">
            <p>{item.pages}</p>
          </div>
          <div className="text-left w-[20%] min-w-[200px]">
            <p className="text-ellipsis overflow-hidden">
              {item.source.replace("https://", "")}
            </p>
          </div>
          <div className="text-center w-[5%] min-w-[50px]">
            {item.duration === undefined
              ? 0
              : secondsToHMS(item.duration.toFixed(0))}
          </div>
          <div className="text-center w-[15%] min-w-[100px]">
            <div className="flex items-center gap-1">
              {item.social?.map((item, index) => {
                return (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.name === "twitter" ? (
                      <FaXTwitter />
                    ) : item.name === "facebook" ? (
                      <FaFacebook />
                    ) : item.name === "youtube" ? (
                      <FaYoutube />
                    ) : item.name === "instagram" ? (
                      <FaInstagram />
                    ) : item.name === "linkedin" ? (
                      <FaLinkedin />
                    ) : (
                      <></>
                    )}
                  </a>
                );
              })}
              {item.website_url !== undefined && (
                <a href={item.website_url} target="_blank" rel="noreferrer">
                  <CiGlobe />
                </a>
              )}
            </div>
          </div>
        </div>
      </AccordionHeader>
      <AccordionBody>
        <div className="overflow-x-auto">
          <div className="w-full inline-block align-middle">
            <div className="max-h-[560px] overflow-auto">
              <table className="min-w-full bg-table">
                <thead className="border-t-[1px] border-b-[1px] border-neutral-100">
                  <tr className="text-xs font-semibold text-neutral-black-400">
                    <th scope="col" className="px-6 py-4 text-left w-[20%]">
                      <span className="cursor-pointer inline-flex items-center">
                        Visitors
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-4 text-left w-[30%]">
                      <span className="cursor-pointer inline-flex items-center">
                        Page visited
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-4 text-left w-[15%]">
                      <span className="cursor-pointer inline-flex items-center">
                        Source
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-4 text-left w-[15%]">
                      <span className="cursor-pointer inline-flex items-center">
                        Session Duration
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-4 text-end w-[20%]">
                      <span className="cursor-pointer inline-flex items-center">
                        Recording
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-base text-neutral-black-700 font-medium">
                  <tr className="cursor-pointer hover:bg-gray-100 h-16">
                    <td colSpan={5} className="text-start py-2">
                      <div className="w-full">
                        <Accordion open={open1 === 1}>
                          <AccordionHeader
                            className="py-1"
                            onClick={() => handleOpen1(1)}
                          >
                            <div className="text-base text-neutral-black-700 font-medium px-6 py-2 w-[20%]">
                              <p>Visitor #1</p>
                            </div>
                            <div className="text-base text-neutral-black-700 font-medium px-6 py-2 w-[30%]">
                              <p>{item.visitors.length}</p>
                            </div>
                            <div className="text-base text-neutral-black-700 font-medium px-6 py-2 w-[15%]">
                              <p>Direct</p>
                            </div>
                            <div className="text-base text-neutral-black-700 font-medium px-6 py-2 w-[15%]">
                              <p>
                                {" "}
                                {item.duration === undefined
                                  ? 0
                                  : secondsToHMS(item.duration.toFixed(0))}
                              </p>
                            </div>
                            <div className="py-2 flex items-center justify-end w-[20%]">
                              <button className="flex p-2 items-center gap-1 rounded bg-[#D4EAC6]">
                                <RecordingIcon />
                                <p className="text-sm font-semibold text-[#142807]">
                                  Show Recording
                                </p>
                              </button>
                            </div>
                          </AccordionHeader>
                          <AccordionBody>
                            {item.visitors?.map((it, index) => {
                              return (
                                <div key={index} className="flex w-full">
                                  <div className="flex items-center gap-3 px-6 py-2 w-[20%] pl-[44px]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <circle
                                        cx="4"
                                        cy="4"
                                        r="3"
                                        stroke="#333843"
                                        strokeWidth="2"
                                      />
                                    </svg>
                                    <p>{format(
                                      new Date(it.timestamp),
                                      "MM/dd/yyyy HH:mm"
                                    )}</p>
                                  </div>
                                  <div className="px-6 py-2 w-[30%]">
                                    <p>{it.document_location}</p>
                                  </div>
                                  <div className="px-6 py-2 w-[15%]">
                                    <p>-</p>
                                  </div>
                                  <div className="px-6 py-2 w-[15%]">
                                    <p>
                                      {" "}
                                      {it.time_spent === undefined
                                        ? 0
                                        : secondsToHMS(
                                            it.time_spent.toFixed(0)
                                          )}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </AccordionBody>
                        </Accordion>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AccordionBody>
    </Accordion>
  );
};

export default LeadProfile;
