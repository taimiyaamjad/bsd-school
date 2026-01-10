import { NavItem, Page, SchoolStat } from './types';

export const SCHOOL_NAME = "BSD Public School";
export const SCHOOL_ADDRESS = "123 Education Lane, Knowledge City, ST 54321";
export const SCHOOL_PHONE = "+1 (555) 123-4567";
export const SCHOOL_EMAIL = "admissions@bsdpublicschool.edu";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', page: Page.HOME },
  { label: 'About Us', page: Page.ABOUT },
  { label: 'Academics', page: Page.ACADEMICS },
  { label: 'Admissions', page: Page.ADMISSIONS },
  { label: 'Contact', page: Page.CONTACT },
];

export const SCHOOL_STATS: SchoolStat[] = [
  { label: 'Students', value: '1,200+', icon: 'users' },
  { label: 'Faculty', value: '85+', icon: 'graduation-cap' },
  { label: 'Years of Excellence', value: '25', icon: 'award' },
  { label: 'Sports Facilities', value: '15+', icon: 'trophy' },
];

export const SYSTEM_INSTRUCTION = `You are the AI Assistant for BSD Public School. 
Your goal is to help prospective parents, students, and visitors understand what makes our school special.
Key Information:
- Founded: 1999
- Philosophy: "Excellence in Education, Character in Life"
- Grades: K-12
- Curriculum: Comprehensive STEM focused, Arts integration, Sports excellence.
- Admissions: Open for Fall 2024. Application deadline is May 30th.
- Location: Knowledge City.
- Facilities: Olympic size pool, Digital Library, Robotics Lab.

Be polite, professional, and encouraging. Keep answers concise (under 100 words) unless asked for details.`;
