export interface Results {
    success: number;
    pager: Pager;
    results: Events[];
}

export interface Pager {
    page: number;
    per_page: number;
    total: number;
}

export interface League {
    id: string;
    name: string;
    cc: string;
}

export interface Home {
    id: string;
    name: string;
    image_id: string;
    cc?: any;
}

export interface Away {
    id: string;
    name: string;
    image_id: string;
    cc?: any;
}

export interface OAway {
    id: string;
    name: string;
    image_id: string;
    cc?: any;
}

export interface OHome {
    id: string;
    name: string;
    image_id: string;
    cc?: any;
}

export interface Events {
    id: string;
    sport_id: string;
    time: string;
    time_status: string;
    league: League;
    home: Home;
    away: Away;
    ss: string;
    bet365_id: string;
    o_away: OAway;
    round: string;
    o_home: OHome;
}

export interface Articles {
    articles: Array<Article>;
}

export interface Article {
    id: string;
    label: string;
    text: string;
    imageSrc: string;
    link: string;
}
    