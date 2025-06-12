import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NewsHead() {
  const { t } = useTranslation();
  return (
    <div className="-mt-20 z-50 relative rounded-[40PX] bg-white py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:items-start">
          {/* Başlık */}
          <div className="md:col-span-1 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-xl text-foreground">{t("news.title")}</h2>
          </div>
          {/* İstatistikler */}
          <div className='flex flex-col'>
           <div className="md:col-span-1 flex flex-col md:flex-row  items-center md:items-start justify-between">

            <div className="mb-8 md:mb-3">
              <div className="text-5xl font-bold text-primary">150+</div>
              <p className="text-muted-foreground mt-3">{t("news.project")}</p>
             
            </div>
            <div>
              <div className="text-5xl font-bold text-primary">99%</div>
              <p className="text-muted-foreground mt-3">{t("news.satisfaction")}</p>
            </div>
            
           </div>

              <p className="text-sm text-center md:text-left text-gray text-muted-foreground mt-3 w-full">
                {t("news.description")}
              </p>
        
          </div>
          
          {/* Açıklama */}
          <div className="md:col-span-1 text-left md:text-start mt-8 md:mt-0">
            <p className="font-semibold text-center md:text-left text-gray-500 text-base max-w-md md:ml-auto">
              {t("news.description2")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}