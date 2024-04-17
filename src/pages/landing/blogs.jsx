import blogPost1 from "../../assets/images/blog_post1.png"
import blogAccount from "../../assets/images/blog_account.png"

const Blogs = () => {
  return (
    <section className="flex flex-col items-center gap-16">
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-[40px] font-black text-landing_color max-w-[840px]">
          Insights Unveiled - Discover the Latest in Visitor Analytics
        </p>
        <p className="text-xl font-normal text-[#A1A1A1] max-w-[750px]">
          Step into the forefront of analytics innovation with our blog. Here we dissect trends, share expert tips, and spotlight success stories to guide you through the evolving landscape of visitor tracking.
        </p>
      </div>
      <div className="flex flex-col items-center gap-16">
        <div className="flex max-w-[1250px] gap-10 justify-between">
          <div className="flex flex-col gap-6 cursor-pointer">
            <img alt="blog" src={blogPost1} />
            <div className="flex flex-col gap-[14px] px-4 items-start">
              <p className="px-6 py-2 bg-green-200 rounded-lg text-base font-medium text-[#0E1D04]">
                Article
              </p>
              <p className="text-[28px] font-bold text-landing_color">
                5 Ways Webmetic's Real-Time Analytics Can Boost Your Business
              </p>
              <p className="text-base font-medium text-[#A1A1A1]">
                This website belongs to one of my clients. He built it on an expired domain and started getting amazing results in just 1.5 years.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <img alt="blog_account" src={blogAccount} />
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm font-bold text-landing_color">
                  Bonnie Green
                </p>
                <div className="flex items-center gap-3 text-xs font-normal text-[#727272]">
                  <p>
                    Dec 02, 2023
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#727272" />
                  </svg>
                  <p>
                    16 min read
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 cursor-pointer">
            <img alt="blog" src={blogPost1} />
            <div className="flex flex-col gap-[14px] px-4 items-start">
              <p className="px-6 py-2 bg-green-200 rounded-lg text-base font-medium text-[#0E1D04]">
                Article
              </p>
              <p className="text-[28px] font-bold text-landing_color">
                5 Ways Webmetic's Real-Time Analytics Can Boost Your Business
              </p>
              <p className="text-base font-medium text-[#A1A1A1]">
                This website belongs to one of my clients. He built it on an expired domain and started getting amazing results in just 1.5 years.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <img alt="blog_account" src={blogAccount} />
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm font-bold text-landing_color">
                  Bonnie Green
                </p>
                <div className="flex items-center gap-3 text-xs font-normal text-[#727272]">
                  <p>
                    Dec 02, 2023
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#727272" />
                  </svg>
                  <p>
                    16 min read
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 cursor-pointer">
            <img alt="blog" src={blogPost1} />
            <div className="flex flex-col gap-[14px] px-4 items-start">
              <p className="px-6 py-2 bg-green-200 rounded-lg text-base font-medium text-[#0E1D04]">
                Article
              </p>
              <p className="text-[28px] font-bold text-landing_color">
                5 Ways Webmetic's Real-Time Analytics Can Boost Your Business
              </p>
              <p className="text-base font-medium text-[#A1A1A1]">
                This website belongs to one of my clients. He built it on an expired domain and started getting amazing results in just 1.5 years.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <img alt="blog_account" src={blogAccount} />
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm font-bold text-landing_color">
                  Bonnie Green
                </p>
                <div className="flex items-center gap-3 text-xs font-normal text-[#727272]">
                  <p>
                    Dec 02, 2023
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#727272" />
                  </svg>
                  <p>
                    16 min read
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="button" className="text-2xl font-semibold text-landing_color px-10 py-1">Read more blogs</button>
      </div>
    </section>
  )
}

export default Blogs;