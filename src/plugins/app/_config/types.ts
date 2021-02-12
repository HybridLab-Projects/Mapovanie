export interface State {
    entities: Array<Entity>;
}

export interface Entity {
    id: number;
    type: string;
    sub_type: string;
    condition: string;
    lon: string;
    lat: string;
    custom_fields: string;
    device_uuid: string;
    images: [
        {
            url: string;
        }
    ];
    date: string;
    address: string;
}
