export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  ACADEMICS = 'ACADEMICS',
  ADMISSIONS = 'ADMISSIONS',
  CONTACT = 'CONTACT'
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
