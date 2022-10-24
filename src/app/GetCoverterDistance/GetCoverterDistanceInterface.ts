export interface GetCoverterDistanceInterface {
    code: string;
    nameDistance: BaseSettingDistance;
}

export interface BaseSettingDistance {
    name: string;
    ConvertTo: {
        Cm: {
            operator: string;
            value: number;
        };
        Feet: {
            operator: string;
            value: number;
        };
        Inches: {
            operator: string;
            value: number;
        };
        Kilometers: {
            operator: string;
            value: number;
        };
        Meters: {
            operator: string;
            value: number;
        };
        Miles: {
            operator: string;
            value: number;
        };
        Yards: {
            operator: string;
            value: number;
        };
    };
    value?: number;
}

export interface MathOperationDistance{
    operator: string;
    value: number;
}
