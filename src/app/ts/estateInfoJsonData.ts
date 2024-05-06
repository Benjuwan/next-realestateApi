export type estateInfoJsonData = {
    status: string;
    data: estateInfoJsonDataContents[];
    message?: {
        insufficient: string;
    }
}

export type estateInfoJsonDataContents = {
    Area: string;
    BuildingYear: string
    CityPlanning: string;
    CoverageRatio: string;
    Classification?: string;
    DistrictName: string;
    Direction?: string;
    FloorAreaRatio: string;
    FloorPlan: string;
    Frontage?: string;
    LandShape?: string;
    Municipality: string;
    MunicipalityCode: string;
    Period: string;
    Prefecture: string;
    Purpose: string;
    Region?: string;
    Renovation: string;
    Structure: string;
    TradePrice: string;
    PricePerUnit?: string;
    UnitPrice?: string;
    Type: string;
    TotalFloorArea?: string;
    Use: string;
    Breadth?: string;
    Remarks?: string;
}