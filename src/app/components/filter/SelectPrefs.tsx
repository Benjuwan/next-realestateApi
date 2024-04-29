// "use server";

// import { prefcodeData } from "@/app/utils/prefcodeData";
// import React from 'react';
// import SelectCities from './SelectCities';
// import { cityAry } from "@/app/ts/filterType/cityDataAryEls";

// const get_SelectElValue_CityCode = async (prefCode: string) => {
//     const API_KEY: string = process.env.NEXT_PUBLIC_REINFOLIB_API_KEY!;
//     const response = await fetch(`https://www.reinfolib.mlit.go.jp/ex-api/external/XIT002?area=${prefCode}`, {
//         headers: {
//             "Ocp-Apim-Subscription-Key": API_KEY,
//         },
//     });
//     const resObj = await response.json();
//     const resObjDataAry = resObj.data;
//     return resObjDataAry;
// };

// export default async function SelectPrefs({ initialPrefCode }: { initialPrefCode: string }) {
//     const [cities, setCities] = React.useState<cityAry[]>([]);

//     React.useEffect(() => {
//         const fetchData = async () => {
//             if (initialPrefCode) {
//                 const resObjDataAry = await get_SelectElValue_CityCode(initialPrefCode);
//                 setCities(resObjDataAry);
//             }
//         };
//         fetchData();
//     }, [initialPrefCode]);

//     return (
//         <>
//             <form>
//                 <select name="" id="prefLists" onChange={async (event) => {
//                     const newPrefCode = (event.target as HTMLSelectElement).value;
//                     const resObjDataAry = await get_SelectElValue_CityCode(newPrefCode);
//                     setCities(resObjDataAry);
//                 }}>
//                     {prefcodeData.map((data) => (
//                         <option value={data.prefcode} key={data.prefcode}>{data.prefJaName}</option>
//                     ))}
//                 </select>
//             </form>
//             <SelectCities cities={cities} />
//         </>
//     );
// }


"use server";

import { prefcodeData } from "@/app/utils/prefcodeData";
import { cityAry } from "@/app/ts/filterType/cityDataAryEls";
import React from 'react';
import SelectCities from "./SelectCities";

export const get_SelectElValue_CityCode = async (prefCode: string) => {
    const API_KEY: string = process.env.NEXT_PUBLIC_REINFOLIB_API_KEY!;
    const response = await fetch(`https://www.reinfolib.mlit.go.jp/ex-api/external/XIT002?area=${prefCode}`, {
        headers: {
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    });
    const resObj = await response.json();
    const resObjDataAry = resObj.data;
    return resObjDataAry;
};

export default async function SelectPrefs({ initialPrefCode }: { initialPrefCode: string }) {
    const [cities, setCities] = React.useState<cityAry[]>([]);

    if (initialPrefCode) {
        const resObjDataAry = await get_SelectElValue_CityCode(initialPrefCode);
        setCities(resObjDataAry);
    }

    return (
        <>
            <form>
                <select name="" id="prefLists">
                    {prefcodeData.map((data) => (
                        <option value={data.prefcode} key={data.prefcode}>{data.prefJaName}</option>
                    ))}
                </select>
            </form>
            <SelectCities cities={cities} />
        </>
    );
}