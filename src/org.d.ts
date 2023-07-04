export interface OrgColours {
  primary: string;
  primary_text: string;
  secondary: string;
  secondary_text: string;
  interactive: string;
}

export interface OrgBanners {
  img: string;
  title: string;
  description?: string;
  link: string;
}

export interface OrgTiles {
  img: string;
  title: string;
  link: string;
}

export interface Event {
  img?: string;
  hideImage?: boolean;
  title: string;
  description?: string;
  link: string;
  address: string;
  startTime: string;
  endTime: string;
  price: string;
  colour?:
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "stone";
}

export interface OrgEvents {
  [key: string]: Event[];
}

export const orgName: string;
export const orgLogo: string;
export const orgColours: OrgColours;
export const orgBanners: OrgBanners[];
export const orgTiles: OrgTiles[];
export const orgEvents: OrgEvents;
