import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const FAQItem = ({ title, content }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
      <AccordionHeader className="text-lg sm:text-2xl font-semibold text-landing_color font-['Outfit']" onClick={() => handleOpen(1)}>{title}</AccordionHeader>
      <AccordionBody className="text-base sm:text-xl font-normal text-[#766D6D] font-['Outfit']">
        {content}
      </AccordionBody>
    </Accordion>
  )
}

export default FAQItem;