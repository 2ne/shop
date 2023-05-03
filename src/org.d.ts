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
  img: string;
  title: string;
  link: string;
  address: string;
  startTime: string;
  endTime: string;
  price: string;
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
