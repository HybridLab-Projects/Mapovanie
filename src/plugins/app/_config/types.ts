/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */

export interface Group {
    id: number,
    name: string,
    second_name: string,
    sort_order: string,
    created_at:string,
    updated_at: string,
    creator: User,
    description: string,
    tags_string: string,
    members_count: number,
    members: [{id: number, is_active: boolean, is_invited: boolean, user: User}],
    categories: Array<Category>,
    invite_hash: string,
    invite_expires_at: string;
    image: {url: string};
    entities_count: string
}

export interface Category {
    id: number;
    key: string;
    full_name: string;
    description: string;
    group: Group;
    icon: {url: string};
    created_at: string;
    updated_at: string;
}

export interface Entity {
    id: number;
    category: Category;
    condition: string;
    address: string;
    lon: string;
    lat: string;
    custom_fields: Record<string, any>;
    device_uuid: string;
    user: User;
    images: [{url: string}];
    description: string;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number,
    name: string,
    surname: string,
    username: string,
    avatar: {url: string},
    points: number,
    entities_count: number,
    entities: Array<Entity>,
    description: string,
    email: string,
    last_login: string,
    last_seen: string,
    created_at: string,
    updated_at: string,
    deleted_at:string,
    is_guest:boolean,
}

export interface LeaderboardUser {
    id: number;
    name: string;
    email: string;
    points: number;
}

export interface State {
    entities: Array<Entity>;
    token: string;
    user: User;
    leaderboardUsers: Array<LeaderboardUser>;
    myMapUnChecked: Array<number>;
    groups: Array<Group>
}
