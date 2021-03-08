export interface State {
    entities: Array<Entity>;
    token: string;
    user: User;
    leaderboardUsers: Array<LeaderboardUser>;
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

export interface User {
    id: number;
    activated_at: string;
    created_at: string;
    deleted_at: null;
    email: string;
    facebook_id: string;
    is_activated: boolean;
    is_guest: string;
    is_superuser: string;
    last_login: null;
    last_seen: null;
    name: string;
    permissions: null;
    surname: null;
    updated_at: string;
    username: string;
    avatar: string;
    entities: Array<Entity>;
}

export interface LeaderboardUser {
    id: number;
    name: string;
    email: string;
    points: number;
}
