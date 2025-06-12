import React from "react";
import Container from "../Container";

function HeroNews({ data }) {
  return (
    <Container>
      <div className="w-full mt-20 flex flex-col lg:flex-row justify-between items-center h-[380px] md:h-[600px] py-10 lg:py-0">
        <div className="flex  max-w-[700px] flex-col-reverse md:flex-col pt-10 md:pt-2 text-white mb-10 lg:mb-0 w-full lg:w-auto text-center lg:text-left">
       
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-arimo font-medium leading-snug pb-4 sm:pb-6 lg:pb-6">
            {data?.title || "Kənd Təsərrüfatı Xidmətləri"}
          </h1>

          <div className="flex items-start gap-4">
            {/* Visible Vertical Line */}
            <div className="w-[3px] md:w-[3px] bg-[#5E7740]  rounded-full self-stretch" />

            {/* Paragraph */}
            <p
              className="text-base sm:text-lg font-archivo font-normal tracking-wide pb-6 sm:pb-8 lg:pb-9"
              dangerouslySetInnerHTML={{
                __html:
                  data?.description ||
                  "Ağıllı kənd təsərrüfatı həlləri ilə müasir kənd təsərrüfatına doğru.",
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default HeroNews;
