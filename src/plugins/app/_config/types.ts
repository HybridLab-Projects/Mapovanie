/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */

import { GeolocationPosition } from '@capacitor/core'

export interface GroupMember {
    id: number,
    is_active: boolean,
    is_invited: boolean,
    role: string,
    user: User
}

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
    members: GroupMember[],
    categories: Array<Category>,
    invite_hash: string,
    invite_expires_at: string;
    image: string;
    entities_count: string
}

export interface Category {
    id: number;
    key: string;
    full_name: string;
    description: string;
    group: Group;
    icon: string;
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
    avatar: string,
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
    groups_count: number
}

export interface LeaderboardUser {
    avatar:string;
    email:string;
    entities_count: number
    id:number
    name: string
    points:number;
    surname: string;
    username: string;

}

export interface State {
    entities: Array<Entity>;
    token: string;
    user: User;
    leaderboardUsers: Array<LeaderboardUser>;
    myMapUnChecked: Array<number>;
    groups: Array<Group>;
    userLocation: GeolocationPosition
}
