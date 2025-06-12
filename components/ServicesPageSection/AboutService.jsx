import Image from "next/image";
import React from "react";
import ContactBanner from "../ContactBanner";
import { getBanner } from "@/lib/api";
import ContactBannerService from "../ContactBannerService";

export async function getServerSideProps(context) {
  const lang = context.locale || "az";
  try {
    const banner = await getBanner(lang);
    return {
      props: {
        banner,
      },
    };
  } catch (error) {
    return {
      props: {
        banner: null,
      },
    };
  }
}

function ServiceHeader({ title, description }) {
  return (
    <div className="flex flex-col gap-5 font-arimo p-0 m-0">
      <div className="flex flex-row items-center gap-5 font-arimo p-0 m-0">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="28" height="28" rx="14" fill="#5E7740" />
          <path
            d="M21 14L11.6666 23.3333L15.1666 14L11.6666 4.66665L21 14Z"
            fill="white"
          />
        </svg>
        <h2 className="text-lg md:text-4xl font-bold p-0 m-0">{title}</h2>
      </div>
      <div className="p-0 m-0">
        <p
          className="text-base text-neutral-400 p-0 m-0"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}

function AboutService({ serviceData }) {
  if (!serviceData) {
    return (
      <div className="bg-white rounded-4xl p-6 flex items-center justify-center h-full">
        <div className="text-center text-neutral-400">
          <p className="text-xl mb-3 p-0 m-0">
            Bu xidmətə aid məlumat tapılmadı
          </p>
          <svg
            width="56"
            height="56"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <rect width="28" height="28" rx="14" fill="#5E7740" />
            <path
              d="M21 14L11.6666 23.3333L15.1666 14L11.6666 4.66665L21 14Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    );
  }

  const Template =
    serviceData.template === "Template 2"
      ? Template2
      : serviceData.template === "Template 3"
      ? Template3
      : Template1;

  return <>
<Template serviceData={serviceData}  
  
  />
  </> ;
}

function Template1({ serviceData, banner }) {
  const attributes = serviceData.attributes || [];

  return (
    <div className="bg-white rounded-4xl p-6">
      <ServiceHeader
        title={serviceData.title}
        description={serviceData.description}
      />

      <div className="flex flex-col md:flex-row gap-10 w-full mt-7">
        <div className="w-full md:w-3/4">
          <Image
            src={serviceData.image}
            alt={serviceData.title || "İstixana"}
            width={500}
            height={500}
            className="w-full rounded-3xl h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center md:w-1/3 md:border-t-2 md:border-brand p-0 m-0">
          <p
            className="text-base text-neutral-400 p-0 m-0"
            dangerouslySetInnerHTML={{ __html: serviceData.description_2 }}
          />
        </div>
      </div>

      {attributes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <div className="flex flex-col min-h-fit w-full">
            {attributes[0] && (
              <div className="flex flex-col gap-4 h-full justify-center p-0 m-0">
                <p className="text-black text-2xl font-medium font-archivo p-0 m-0">
                  {attributes[0].title}
                </p>
                <p
                  className="text-neutral-400 text-base p-0 m-0"
                  dangerouslySetInnerHTML={{
                    __html: attributes[0].description,
                  }}
                ></p>
              </div>
            )}
          </div>
          <div className="min-h-fit">
            {attributes[0] && (
              <Image
                src={attributes[0].image || "/images/services/img4.jpg"}
                alt={attributes[0].title}
                width={500}
                height={500}
                className="w-full rounded-3xl h-full min-h-[200px] object-cover"
              />
            )}
          </div>
          <div className="flex flex-col min-h-fit w-full">
            {attributes[1] && (
              <div className="flex flex-col gap-4 h-full justify-center p-0 m-0">
                <p className="text-black text-2xl font-medium font-archivo p-0 m-0">
                  {attributes[1].title}
                </p>
                <p
                  className="text-neutral-400 text-base p-0 m-0"
                  dangerouslySetInnerHTML={{
                    __html: attributes[1].description,
                  }}
                ></p>
              </div>
            )}
          </div>
          <div className="min-h-fit">
            {attributes[1] && (
              <Image
                src={attributes[1].image || "/images/services/img3.jpg"}
                alt={attributes[1].title}
                width={500}
                height={500}
                className="w-full rounded-3xl h-full min-h-[200px] object-cover"
              />
            )}
          </div>
          <div className="flex flex-col min-h-fit">
            {attributes[2] && (
              <div className="flex flex-col gap-4 h-full justify-center p-0 m-0">
                <p className="text-black text-2xl font-medium font-archivo p-0 m-0">
                  {attributes[2].title}
                </p>
                <p
                  className="text-neutral-400 text-base p-0 m-0 text-justify"
                  dangerouslySetInnerHTML={{
                    __html: attributes[2].description,
                  }}
                ></p>
              </div>
            )}
          </div>
          <div className="min-h-fit">
            {attributes[2] && (
              <Image
                src={attributes[2].image || "/images/services/img5.jpg"}
                alt={attributes[2].title}
                width={500}
                height={500}
                className="w-full rounded-3xl h-full min-h-[200px] object-cover"
              />
            )}
          </div>
          <div className="flex flex-col min-h-fit w-full">
            {attributes[3] && (
              <div className="flex flex-col gap-4 h-full justify-center p-0 m-0">
                <p className="text-black text-2xl font-medium font-archivo p-0 m-0">
                  {attributes[3].title}
                </p>
                <p
                  className="text-neutral-400 text-base p-0 m-0"
                  dangerouslySetInnerHTML={{
                    __html: attributes[3].description,
                  }}
                ></p>
              </div>
            )}
          </div>
          <div className="min-h-fit">
            {attributes[3] && (
              <Image
                src={attributes[3].image || "/images/services/img6.jpg"}
                alt={attributes[3].title}
                width={500}
                height={500}
                className="w-full rounded-3xl h-full min-h-[200px] object-cover"
              />
            )}
          </div>
          <div className="flex flex-col min-h-fit w-full">
            {attributes[4] && (
              <div className="flex flex-col gap-4 h-full justify-center p-0 m-0">
                <p className="text-black text-2xl font-medium font-archivo p-0 m-0">
                  {attributes[4].title}
                </p>
                <p
                  className="text-neutral-400 text-base p-0 m-0"
                  dangerouslySetInnerHTML={{
                    __html: attributes[4].description,
                  }}
                ></p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 w-full mt-8">
          <div className="text-center text-neutral-400">
            <p className="text-xl p-0 m-0">Bu xidmətə aid məlumat tapılmadı</p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <ContactBannerService banner={banner} />
      </div>
    </div>
  );
}

function Template2({ serviceData, banner }) {
  return (
    <div className="bg-white rounded-4xl p-6">
      <ServiceHeader
        title={serviceData.title}
        description={serviceData.description}
      />

      <div className="flex flex-col md:flex-row gap-10 w-full mt-7">
        <div className="w-full">
          <Image
            src={serviceData.image || "/images/services/img2.jpg"}
            alt={serviceData.name}
            width={500}
            height={500}
            className="w-full rounded-3xl h-[210px] object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-5 p-0 m-0">
        <p className="text-black text-2xl font-medium font-archivo p-0 m-0">
          {serviceData.name}
        </p>
        <p
          className="text-base text-neutral-400 p-0 m-0"
          dangerouslySetInnerHTML={{ __html: serviceData.description_2 }}
        />
      </div>

      {serviceData.attributes && serviceData.attributes.length > 0 ? (
        <div className="flex flex-col gap-3">
          {serviceData.attributes.map((attr, index) => (
            <div key={index} className="flex flex-row gap-5 mt-8 w-full">
              <div className="w-[35%]">
                <Image
                  src={attr.image || "/images/services/img4.jpg"}
                  alt={attr.title}
                  width={500}
                  height={500}
                  className="w-full rounded-3xl h-[200px] object-cover"
                />
              </div>
              <div className="flex w-[65%] flex-col gap-4 justify-center p-0 m-0">
                <p className="text-black text-2xl font-medium font-archivo p-0 m-0">
                  {attr.title}
                </p>
                <p
                  className="text-neutral-400 text-base p-0 m-0"
                  dangerouslySetInnerHTML={{ __html: attr.description }}
                ></p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 w-full mt-8">
          <div className="text-center text-neutral-400">
            <p className="text-xl p-0 m-0">Bu xidmətə aid məlumat tapılmadı</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-5 p-0 m-0">
        <p className="text-black text-2xl font-medium font-archivo p-0 m-0">
          {serviceData.name}
        </p>
        <p
          className="text-base text-neutral-400 p-0 m-0"
          dangerouslySetInnerHTML={{ __html: serviceData.description_3 }}
        />
      </div>

      <ContactBannerService banner={banner} />
    </div>
  );
}

function Template3({ serviceData, banner }) {
  return (
    <div className="bg-white rounded-4xl p-6">
      <ServiceHeader
        title={serviceData.title}
        description={serviceData.description}
      />

      {serviceData.attributes && serviceData.attributes.length > 0 ? (
        <div className="flex flex-col gap-3">
          {serviceData.attributes.map((attr, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-5 mt-8 w-full"
            >
              {index % 2 === 0 ? (
                <>
                  <div className="w-full md:w-[65%]">
                    <Image
                      src={attr.image || "/images/services/img4.jpg"}
                      alt={attr.title}
                      width={500}
                      height={500}
                      className="w-full rounded-3xl h-[200px] md:h-[300px] object-cover"
                    />
                  </div>
                  <div className="flex w-full md:w-[35%] flex-col gap-4 justify-center p-0 m-0">
                    <p className="text-black text-xl md:text-2xl font-medium font-archivo p-0 m-0">
                      {attr.title}
                    </p>
                    <p
                      className="text-neutral-400 text-base p-0 m-0"
                      dangerouslySetInnerHTML={{ __html: attr.description }}
                    ></p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start justify-center md:items-end w-full md:w-[35%] flex-col gap-4 order-1 md:order-none p-0 m-0">
                    <p className="text-black text-xl md:text-2xl font-medium font-archivo p-0 m-0">
                      {attr.title}
                    </p>
                    <p className="text-neutral-400 md:text-end text-base p-0 m-0">
                      {attr.description}
                    </p>
                  </div>
                  <div className="w-full md:w-[65%] order-0 md:order-none">
                    <Image
                      src={attr.image || "/images/services/img4.jpg"}
                      alt={attr.title}
                      width={500}
                      height={500}
                      className="w-full rounded-3xl h-[200px] md:h-[300px] object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 w-full mt-8">
          <div className="text-center text-neutral-400">
            <p className="text-xl p-0 m-0">Bu xidmətə aid məlumat tapılmadı</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-5 p-0 m-0">
        <p className="text-neutral-400 p-0 m-0">{serviceData.description_3}</p>
      </div>

      <ContactBannerService banner={banner} />
    </div>
  );
}

export default AboutService;
