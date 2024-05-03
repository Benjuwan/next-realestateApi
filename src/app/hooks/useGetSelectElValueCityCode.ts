"use server";

import { cityAry } from "../ts/filterType/cityDataAryEls";

function useGetSelectElValueCityCode() {
    const get_SelectElValue_CityCode = async (prefCode: string) => {
        const API_KEY: string = process.env.NEXT_PUBLIC_REINFOLIB_API_KEY!;

        const response = await fetch(`https://www.reinfolib.mlit.go.jp/ex-api/external/XIT002?area=${prefCode}`, {
            headers: {
                "Ocp-Apim-Subscription-Key": API_KEY,
            },
        });

        const resObj: cityAry[] = await response.json();
        return resObj;
    }

    return { get_SelectElValue_CityCode }
}

export default useGetSelectElValueCityCode;