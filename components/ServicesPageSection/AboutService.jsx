//^ 2nd ___________________________________________

import Image from "next/image";
import React from "react";
import ContactBanner from "../ContactBanner";

function AboutService() {
  return (
    <div className="bg-white rounded-4xl p-6">
      <div className="flex flex-col  gap-5 font-arimo">
        <div className="flex flex-row items-center gap-5 font-arimo">
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

          <h2 className="text-4xl font-bold">About Our Service</h2>
        </div>

        <div>
          <p className="text-base text-neutral-400">
            Sizi kənd təsərrüfatı sahəsində baş verən ən son yeniliklərlə tanış
            edirik. Effektiv məhsuldarlıq, suvarma texnologiyaları və torpaq
            analizi sahəsində mütəxəssis tövsiyələri burada! Kənd təsərrüfatı
            sahəsində baş verən ən son yeniliklərlə tanış edirik. Effektiv
            məhsuldarlıq, suvarma texnologiyaları və torpaq analizi sahəsində
            mütəxəssis tövsiyələri burada!
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 w-full mt-7">
        <div className="w-full md:w-3/4">
          <Image
            src={"/images/services/img2.jpg"}
            alt="hero"
            width={500}
            height={500}
            className="w-full rounded-3xl h-[210px] object-cover"
          />
        </div>
        <div className="md:w-1/3 border-t-2 border-brand">
          <p className="text-neutral-400 pt-7">
            Əkin sahənizə və iqlimə uyğun fərdi istixana sistemləri. AGRIMAN
            Consulting sizə məhsuldarlığı artıran, enerji baxımından səmərəli və
            uzunömürlü istixana layihələri təqdim edir.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <div className="flex flex-col gap-4">
          <p className="text-black text-2xl font-medium font-archivo">
            Modul istixana sistemləri
          </p>
          <p className="text-neutral-400 text-base">
            Tələblərinizə uyğun olaraq istixanaları müxtəlif ölçü və formalarda
            modullar şəklində layihələndiririk. Bu yanaşma həm genişləndirmə
            imkanı verir, həm də resurslara qənaət etməyə kömək edir.
          </p>
        </div>

        <div>
          <Image
            src={"/images/services/img4.jpg"}
            alt="hero"
            width={500}
            height={500}
            className="w-full rounded-3xl h-[200px] object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-black text-2xl font-medium font-archivo">
            Modul istixana sistemləri
          </p>
          <p className="text-neutral-400 text-base">
            Tələblərinizə uyğun olaraq istixanaları müxtəlif ölçü və formalarda
            modullar şəklində layihələndiririk. Bu yanaşma həm genişləndirmə
            imkanı verir, həm də resurslara qənaət etməyə kömək edir.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <div>
          <Image
            src={"/images/services/img4.jpg"}
            alt="hero"
            width={500}
            height={500}
            className="w-full rounded-3xl h-[200px] object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-black text-2xl font-medium font-archivo">
            Modul istixana sistemləri
          </p>
          <p className="text-neutral-400 text-base">
            Tələblərinizə uyğun olaraq istixanaları müxtəlif ölçü və formalarda
            modullar şəklində layihələndiririk. Bu yanaşma həm genişləndirmə
            imkanı verir, həm də resurslara qənaət etməyə kömək edir.
          </p>
        </div>
        <div>
          <Image
            src={"/images/services/img4.jpg"}
            alt="hero"
            width={500}
            height={500}
            className="w-full rounded-3xl h-[200px] object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <div className="flex flex-col gap-4">
          <p className="text-black text-2xl font-medium font-archivo">
            Modul istixana sistemləri
          </p>
          <p className="text-neutral-400 text-base">
            Tələblərinizə uyğun olaraq istixanaları müxtəlif ölçü və formalarda
            modullar şəklində layihələndiririk. Bu yanaşma həm genişləndirmə
            imkanı verir, həm də resurslara qənaət etməyə kömək edir.
          </p>
        </div>

        <div>
          <Image
            src={"/images/services/img4.jpg"}
            alt="hero"
            width={500}
            height={500}
            className="w-full rounded-3xl h-[200px] object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-black text-2xl font-medium font-archivo">
            Modul istixana sistemləri
          </p>
          <p className="text-neutral-400 text-base">
            Tələblərinizə uyğun olaraq istixanaları müxtəlif ölçü və formalarda
            modullar şəklində layihələndiririk. Bu yanaşma həm genişləndirmə
            imkanı verir, həm də resurslara qənaət etməyə kömək edir.
          </p>
        </div>
      </div>
      <ContactBanner />
    </div>
  );
}

export default AboutService;

//? 2nd ___________________________________________

// import Image from "next/image";
// import React from "react";
// import ContactBanner from "../ContactBanner";

// function AboutService() {
//   return (
//     <div className="bg-white rounded-4xl p-6">
//       <div className="flex flex-col  gap-5 font-arimo">
//         <div className="flex flex-row items-center gap-5 font-arimo">
//           <svg
//             width="28"
//             height="28"
//             viewBox="0 0 28 28"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <rect width="28" height="28" rx="14" fill="#5E7740" />
//             <path
//               d="M21 14L11.6666 23.3333L15.1666 14L11.6666 4.66665L21 14Z"
//               fill="white"
//             />
//           </svg>

//           <h2 className="text-4xl font-bold">About Our Service</h2>
//         </div>

//         <div>
//           <p className="text-base text-neutral-400">
//             Sizi kənd təsərrüfatı sahəsində baş verən ən son yeniliklərlə tanış
//             edirik. Effektiv məhsuldarlıq, suvarma texnologiyaları və torpaq
//             analizi sahəsində mütəxəssis tövsiyələri burada! Kənd təsərrüfatı
//             sahəsində baş verən ən son yeniliklərlə tanış edirik. Effektiv
//             məhsuldarlıq, suvarma texnologiyaları və torpaq analizi sahəsində
//             mütəxəssis tövsiyələri burada!
//           </p>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-3 w-full mt-7">
//         <div className="w-full">
//           <Image
//             src={"/images/services/img2.jpg"}
//             alt="hero"
//             width={500}
//             height={500}
//             className="w-full rounded-3xl h-[210px] object-cover"
//           />
//         </div>
//       </div>

//       <div className="flex flex-col gap-3 pt-5">
//         <p className="text-black text-2xl font-medium font-archivo">
//           Modul istixana sistemləri
//         </p>
//         <p className="text-neutral-400">
//           {" "}
//           Sizi kənd təsərrüfatı sahəsində baş verən ən son yeniliklərlə tanış
//           edirik. Effektiv məhsuldarlıq, suvarma texnologiyaları və torpaq
//           analizi sahəsində mütəxəssis tövsiyələri burada! Kənd təsərrüfatı
//           sahəsində baş verən ən son yeniliklərlə tanış edirik. Effektiv
//           məhsuldarlıq, suvarma texnologiyaları və torpaq analizi sahəsində
//           mütəxəssis tövsiyələri burada!{" "}
//         </p>
//       </div>

//       <div className="flex flex-col gap-3">
//         <div className="flex flex-row gap-5 mt-8 w-full">
//           <div className="w-[35%]">
//             <Image
//               src={"/images/services/img4.jpg"}
//               alt="hero"
//               width={500}
//               height={500}
//               className="w-full rounded-3xl h-[200px] object-cover"
//             />
//           </div>
//           <div className="flex w-[65%] flex-col gap-4">
//             <p className="text-black text-2xl font-medium font-archivo">
//               Modul istixana sistemləri
//             </p>
//             <p className="text-neutral-400 text-base">
//               Tələblərinizə uyğun olaraq istixanaları müxtəlif ölçü və
//               formalarda modullar şəklində layihələndiririk. Bu yanaşma həm
//               genişləndirmə imkanı verir, həm də resurslara qənaət etməyə kömək
//               edir.
//             </p>
//           </div>
//         </div>
//         <div className="flex flex-row gap-5 mt-8 w-full">
//           <div className="w-[35%]">
//             <Image
//               src={"/images/services/img4.jpg"}
//               alt="hero"
//               width={500}
//               height={500}
//               className="w-full rounded-3xl h-[200px] object-cover"
//             />
//           </div>
//           <div className="flex w-[65%] flex-col gap-4">
//             <p className="text-black text-2xl font-medium font-archivo">
//               Modul istixana sistemləri
//             </p>
//             <p className="text-neutral-400 text-base">
//               Tələblərinizə uyğun olaraq istixanaları müxtəlif ölçü və
//               formalarda modullar şəklində layihələndiririk. Bu yanaşma həm
//               genişləndirmə imkanı verir, həm də resurslara qənaət etməyə kömək
//               edir.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col gap-3 pt-5">
//         <p className="text-black text-2xl font-medium font-archivo">
//           Modul istixana sistemləri
//         </p>
//         <p className="text-neutral-400">
//           {" "}
//           Sizi kənd təsərrüfatı sahəsində baş verən ən son yeniliklərlə tanış
//           edirik. Effektiv məhsuldarlıq, suvarma texnologiyaları və torpaq
//           analizi sahəsində mütəxəssis tövsiyələri burada! Kənd təsərrüfatı
//           sahəsində baş verən ən son yeniliklərlə tanış edirik. Effektiv
//           məhsuldarlıq, suvarma texnologiyaları və torpaq analizi sahəsində
//           mütəxəssis tövsiyələri burada!{" "}
//         </p>
//       </div>

//       <ContactBanner />
//     </div>
//   );
// }

// export default AboutService;

//! 3rd  ___________________________________________

// import Image from "next/image";
// import React from "react";
// import ContactBanner from "../ContactBanner";

// function AboutService() {
//   return (
//     <div className="bg-white rounded-4xl p-6">
//       <div className="flex flex-col  gap-5 font-arimo">
//         <div className="flex flex-row items-center gap-5 font-arimo">
//           <svg
//             width="28"
//             height="28"
//             viewBox="0 0 28 28"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <rect width="28" height="28" rx="14" fill="#5E7740" />
//             <path
//               d="M21 14L11.6666 23.3333L15.1666 14L11.6666 4.66665L21 14Z"
//               fill="white"
//             />
//           </svg>

//           <h2 className="text-4xl font-bold">About Our Service</h2>
//         </div>

//         <div>
//           <p className="text-base text-neutral-400">
//             Sizi kənd təsərrüfatı sahəsində baş verən ən son yeniliklərlə tanış
//             edirik. Effektiv məhsuldarlıq, suvarma texnologiyaları və torpaq
//             analizi sahəsində mütəxəssis tövsiyələri burada! Kənd təsərrüfatı
//             sahəsində baş verən ən son yeniliklərlə tanış edirik. Effektiv
//             məhsuldarlıq, suvarma texnologiyaları və torpaq analizi sahəsində
//             mütəxəssis tövsiyələri burada!
//           </p>
//         </div>
//       </div>
//       <div className="flex flex-col gap-3">
//         <div className="flex flex-row gap-5 mt-8 w-full">
//           <div className="w-[35%]">
//             <Image
//               src={"/images/services/img4.jpg"}
//               alt="hero"
//               width={500}
//               height={500}
//               className="w-full rounded-3xl h-[200px] object-cover"
//             />
//           </div>
//           <div className="flex w-[65%] flex-col gap-4">
//             <p className="text-black text-2xl font-medium font-archivo">
//               Modul istixana sistemləri
//             </p>
//             <p className="text-neutral-400 text-base">
//               Tələblərinizə uyğun olaraq istixanaları müxtəlif ölçü və
//               formalarda modullar şəklində layihələndiririk. Bu yanaşma həm
//               genişləndirmə imkanı verir, həm də resurslara qənaət etməyə kömək
//               edir.
//             </p>
//           </div>
//         </div>
//         <div className="flex flex-row gap-5 mt-8 w-full">
//           <div className="flex items-end w-[65%] flex-col gap-4">
//             <p className="text-black text-2xl font-medium font-archivo">
//               Modul istixana sistemləri
//             </p>
//             <p className="text-neutral-400 text-end text-base">
//               Tələblərinizə uyğun olaraq istixanaları müxtəlif ölçü və
//               formalarda modullar şəklində layihələndiririk. Bu yanaşma həm
//               genişləndirmə imkanı verir, həm də resurslara qənaət etməyə kömək
//               edir.
//             </p>
//           </div>
//           <div className="w-[35%]">
//             <Image
//               src={"/images/services/img4.jpg"}
//               alt="hero"
//               width={500}
//               height={500}
//               className="w-full rounded-3xl h-[200px] object-cover"
//             />
//           </div>
//         </div>
//         <div className="flex flex-row gap-5 mt-8 w-full">
//           <div className="w-[35%]">
//             <Image
//               src={"/images/services/img4.jpg"}
//               alt="hero"
//               width={500}
//               height={500}
//               className="w-full rounded-3xl h-[200px] object-cover"
//             />
//           </div>
//           <div className="flex w-[65%] flex-col gap-4">
//             <p className="text-black text-2xl font-medium font-archivo">
//               Modul istixana sistemləri
//             </p>
//             <p className="text-neutral-400 text-base">
//               Tələblərinizə uyğun olaraq istixanaları müxtəlif ölçü və
//               formalarda modullar şəklində layihələndiririk. Bu yanaşma həm
//               genişləndirmə imkanı verir, həm də resurslara qənaət etməyə kömək
//               edir.
//             </p>
//           </div>
//         </div>
//         <div className="flex flex-row gap-5 mt-8 w-full">
//           <div className="flex items-end w-[65%] flex-col gap-4">
//             <p className="text-black text-2xl font-medium font-archivo">
//               Modul istixana sistemləri
//             </p>
//             <p className="text-neutral-400 text-end text-base">
//               Tələblərinizə uyğun olaraq istixanaları müxtəlif ölçü və
//               formalarda modullar şəklində layihələndiririk. Bu yanaşma həm
//               genişləndirmə imkanı verir, həm də resurslara qənaət etməyə kömək
//               edir.
//             </p>
//           </div>
//           <div className="w-[35%]">
//             <Image
//               src={"/images/services/img4.jpg"}
//               alt="hero"
//               width={500}
//               height={500}
//               className="w-full rounded-3xl h-[200px] object-cover"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col gap-3 pt-5">
//         <p className="text-black text-2xl font-medium font-archivo">
//           Modul istixana sistemləri
//         </p>
//         <p className="text-neutral-400">
//           {" "}
//           Sizi kənd təsərrüfatı sahəsində baş verən ən son yeniliklərlə tanış
//           edirik. Effektiv məhsuldarlıq, suvarma texnologiyaları və torpaq
//           analizi sahəsində mütəxəssis tövsiyələri burada! Kənd təsərrüfatı
//           sahəsində baş verən ən son yeniliklərlə tanış edirik. Effektiv
//           məhsuldarlıq, suvarma texnologiyaları və torpaq analizi sahəsində
//           mütəxəssis tövsiyələri burada!{" "}
//         </p>
//       </div>

//       <ContactBanner />
//     </div>
//   );
// }

// export default AboutService;
