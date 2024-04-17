import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import CloseButton from "../../assets/icons/CloseButton"
import SaveIcon from '../../assets/icons/SaveIcon'
import DownloadReport from '../../assets/icons/DownloadReport'
import ECommerceIcon from '../../assets/icons/ECommerceIcon'
import MailIcon from '../../assets/icons/MailIcon'
import ArrowUpOutlineIcon from '../../assets/icons/ArrowUpOutlineIcon'

import companyIcon from "../../assets/images/statista.svg"

const CompanyProfileModal = ({ data, open, setOpen }) => {
  const cancelButtonRef = useRef(null)

  return (
    <>
      {data !== null && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-[#313138] bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="inline-flex flex-col gap-5 items-start p-5 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 min-w-[500px]">
                    <div className="flex p-[5px] justify-end w-full">
                      <CloseButton onClick={() => setOpen(false)} />
                    </div>
                    <div className='flex flex-col items-start gap-[10px] p-[10px] rounded-2xl border border-[#E2E8EF] bg-[#F9FBFF] w-full'>
                      <div className='flex items-start gap-[10px] w-full'>
                        <img alt={data.company_name} className='w-[60px] h-[60px]' src={companyIcon} />
                        <div className='flex flex-col flex-1 justify-center items-start gap-[5px]'>
                          <div className='flex justify-between w-full'>
                            <p className='text-xl font-bold text-primary-500'>{data.company_name}</p>
                            <div className='flex gap-[15px]'>
                              <button type="button" className="bg-white focus:ring-0 focus:outline-none font-medium rounded-lg border border-[#E0E2E7] text-xs text-secondary-400 px-3 py-[8px] text-center inline-flex items-center">
                                <SaveIcon />
                                Save this company
                              </button>
                              <button type="button" className="bg-secondary-400 focus:ring-0 focus:outline-none font-medium rounded-lg text-xs text-neutral-50 px-3 py-[8px] text-center inline-flex items-center">
                                <DownloadReport />
                                Download Report
                              </button>
                            </div>
                          </div>
                          <div className='flex items-center gap-[10px]'>
                            <div className='flex items-center gap-[10px] pr-[10px] border-r-2'>
                              <ECommerceIcon />
                              <p className='text-base text-neutral-400'>E-commerce</p>
                            </div>
                            <div className='flex items-center gap-[5px]'>
                              <MailIcon />
                              <p className='text-base text-secondary-400'>instamart@mrt.io</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col p-[10px] justify-center gap-2'>
                        <p className='text-sm text-ellipsis overflow-hidden text-secondary-500'>Assigned Tags</p>
                        <div className='flex items-center gap-[10px]'>
                          <div className='flex items-center gap-[10px]'>
                            <p className='text-xs text-center text-neutral-50 font-semibold text-ellipsis overflow-hidden px-[10px] py-[5px] rounded-full bg-tertiary-400 min-w-[68px]'>Top</p>
                            <p className='text-xs text-center text-neutral-50 font-semibold text-ellipsis overflow-hidden px-[10px] py-[5px] rounded-full bg-primary-400 min-w-[68px]'>Most Visited</p>
                            <p className='text-xs text-center text-neutral-50 font-semibold text-ellipsis overflow-hidden px-[10px] py-[5px] rounded-full bg-neutral-50 min-w-[68px]'>E-Commerce</p>
                            <p className='text-xs text-center text-neutral-50 font-semibold text-ellipsis overflow-hidden px-[10px] py-[5px] rounded-full bg-neutral-100 min-w-[68px]'>Website</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col p-[10px] justify-center gap-[10px] w-full'>
                      <p className='text-lg font-semibold text-secondary-400 text-ellipsis overflow-hidden'>Company Stats</p>
                      <div className='flex justify-between items-center'>
                        <div className='flex flex-col justify-center items-center gap-[10px] p-[10px] rounded-lg bg-neutral-700 text-neutral-700 w-[170px]'>
                          <p className='text-2xl font-bold'>15m 20s</p>
                          <p className='text-sm'>Avg. Session Duration</p>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-[10px] p-[10px] rounded-lg bg-primary-300 w-[170px]'>
                          <div className='flex justify-center items-center gap-[5px]'>
                            <ArrowUpOutlineIcon />
                            <p className='text-2xl font-bold text-primary-300'>05%</p>
                          </div>
                          <p className='text-sm text-neutral-700'>Avg. Bounce Rate</p>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-[10px] p-[10px] rounded-lg bg-tertiary-100 text-neutral-700 w-[170px]'>
                          <p className='text-2xl font-bold'>04</p>
                          <p className='text-sm'>Daily Pages Visit</p>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-[10px] p-[10px] rounded-lg bg-teal-50 text-neutral-700 w-[170px]'>
                          <p className='text-2xl font-bold'>24</p>
                          <p className='text-sm'>Avg. Daily Visitor</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col p-[10px] gap-[15px] w-full'>
                      <p className='text-lg font-semibold text-ellipsis overflow-hidden text-secondary-400'>Company Information</p>
                      <div className='flex flex-col gap-5'>
                        <div className='flex justify-between items-center'>
                          <div className='flex flex-col justify-center gap-[15px] p-[10px] w-[236px]'>
                            <p className='text-sm text-neutral-800'>Company Founded</p>
                            <p className='text-base font-semibold text-neutral-950'>Apr 23, 2015</p>
                          </div>
                          <div className='flex flex-col justify-center gap-[15px] p-[10px] w-[236px]'>
                            <p className='text-sm text-neutral-800'>Company Management</p>
                            <p className='text-base font-semibold text-neutral-900'>Daniel Smith Jonathan</p>
                          </div>
                          <div className='flex flex-col justify-center gap-[15px] p-[10px] w-[236px]'>
                            <p className='text-sm text-neutral-800'>Company Type</p>
                            <p className='text-base font-semibold text-neutral-900'>E-commerce</p>
                          </div>
                        </div>
                        <div className='flex justify-between items-center'>
                          <div className='flex flex-col justify-center gap-[15px] p-[10px]'>
                            <p className='text-sm text-neutral-800'>Company Location</p>
                            <p className='text-base font-semibold text-neutral-900'>Brooklyn 121 Park Street, Brooklyn, USA</p>
                          </div>
                          <div className='flex flex-col justify-center gap-[15px] p-[10px]'>
                            <p className='text-sm text-neutral-800'>Company Website</p>
                            <a href="https://www.samplewebsite.com" target='_blank' rel='noreferrer' className='text-base font-semibold text-secondary-400'>www.samplewebsite.com</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  )
}

export default CompanyProfileModal;