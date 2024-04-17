import StoryImage1 from "../../assets/images/story-1.png"
import StoryImage2 from "../../assets/images/story-2.png"

const Story = () => {
  return (
    <section className="flex flex-col items-center gap-16">
      <div className="flex flex-col justify-center items-center gap-6 max-w-[787px] text-center">
        <p className="text-[40px] font-black text-landing_color">Explore the Core of Webmetic – Where Every Click Tells a Story</p>
        <p className="text-2xl font-normal text-[#A1A1A1]">Here, data isn't just numbers—it's the pulse of potential customer journeys, the rhythm of engagement, and the melody of growing business opportunities.</p>
      </div>
      <div className="flex flex-col gap-16 max-w-[1200px] px-12">
        <div className="flex justify-between items-center gap-[70px]">
          <img alt="story_1" src={StoryImage1} />
          <div className="flex flex-col gap-10 items-start">
            <div className="flex flex-col gap-5 items-start">
              <p className="text-[28px] font-bold text-landing_color">Navigate Your Visitor Data Through an Interactive Panorama of Insights</p>
              <p className="text-xl font-normal text-[#A1A1A1]">Embark on an exploratory journey with VisiTrack’s immersive analytics dashboard. Visualize the flow of your digital traffic in a dynamic, interactive canvas that paints a clear picture of your audience's online behavior.</p>
            </div>
            <button type="button" className="flex justify-center items-center px-10 py-3 rounded bg-[#E2FFD3] text-xl font-medium text-landing_color">Learn More</button>
          </div>
        </div>
        <div className="flex justify-between items-center gap-[100px]">
          <div className="flex flex-col gap-10 items-start">
            <div className="flex flex-col gap-5 items-start">
              <p className="text-[28px] font-bold text-landing_color">Craft Targeted Engagement with In-Depth Visitor Profiling and Behavior Analysis</p>
              <p className="text-xl font-normal text-[#A1A1A1]">Go beyond the surface with VisiTrack’s comprehensive visitor profiles. Delve into nuanced behavior patterns, uncover the driving forces behind each click, and forge meaningful connections that turn casual browsers into loyal customers.</p>
            </div>
            <button type="button" className="flex justify-center items-center px-10 py-3 rounded bg-[#E2FFD3] text-xl font-medium text-landing_color">Learn More</button>
          </div>
          <img alt="story_2" src={StoryImage2} />
        </div>
      </div>
    </section>
  )
}

export default Story;