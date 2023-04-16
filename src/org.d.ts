export interface OrgColours {
  primary: string;
  primary_text: string;
  secondary: string;
  secondary_text: string;
  interactive: string;
}

export interface OrgTiles {
  img: string;
  title: string;
  link: string;
}

export const orgName: string;
export const orgLogo: string;
export const orgColours: OrgColours;
export const orgTiles: OrgTiles[];
