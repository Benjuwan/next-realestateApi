export type FetchCityData = {
    status: string;
    data: CityAry[];
    message?: {
        insufficient: string;
    }
};

export type CityAry = {
    id: string;
    name: string;
};