export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  ACADEMICS = 'ACADEMICS',
  ADMISSIONS = 'ADMISSIONS',
  CONTACT = 'CONTACT',
  STAFF_LOGIN = 'STAFF_LOGIN',
  GALLERY = 'GALLERY'
}

export interface NavItem {
  label: string;
  page: Page;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface SchoolStat {
  label: string;
  value: string;
  icon: string;
}