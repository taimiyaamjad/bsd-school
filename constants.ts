import { NavItem, Page, SchoolStat } from './types';

export const SCHOOL_NAME = "BSD Public School";
export const SCHOOL_LOGO_URL = "https://bsdpublic.wordpress.com/wp-content/uploads/2024/12/cropped-1000001464-removebg-preview-1.png";
export const SCHOOL_ADDRESS = "Guraini, Jaunpur, Uttar Pradesh, India";
export const SCHOOL_PHONE = "+91 7080672744";
export const SCHOOL_EMAIL = "educationbsd@gmail.com";
export const DIGITAL_PORTAL_URL = "https://bsd-digital-portal.vercel.app/";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', page: Page.HOME },
  { label: 'About Us', page: Page.ABOUT },
  { label: 'Academics', page: Page.ACADEMICS },
  { label: 'Admissions', page: Page.ADMISSIONS },
  { label: 'Gallery', page: Page.GALLERY },
  { label: 'Contact', page: Page.CONTACT },
  { label: 'Staff Login', page: Page.STAFF_LOGIN },
  { label: 'Digital Portal', page: 'PORTAL' as any },
];

export const SCHOOL_STATS: SchoolStat[] = [
  { label: 'Students', value: '800+', icon: 'users' },
  { label: 'Faculty', value: '40+', icon: 'graduation-cap' },
  { label: 'Years of Excellence', value: '7+', icon: 'award' },
  { label: 'Sports Facilities', value: '10+', icon: 'trophy' },
];

export const SYSTEM_INSTRUCTION = `You are the AI Assistant for BSD Public School, located in Guraini, Jaunpur.
Key Information:
- Founded: 2017
- Location: Guraini, Jaunpur.
- Affiliation: CBSE (since 2018).
- Contact Phone: ${SCHOOL_PHONE}
- Contact Email: ${SCHOOL_EMAIL}
- Leadership: Shashank Sir (Principal), Bobby Sir (Vice Principal), Sabajeet Sir (Director).
- Notable Faculty: Mr. Ramakant Prajapati (Math), Mr. Bobby Sir (Science), Mr. Amit Sir (English), Mr. Deepak Sir (Social Studies), Mr. Abbaas Sir (Computer Science), Ms. Preeti Mam (Hindi).
- Philosophy: Providing a supportive and challenging environment for academic and personal growth.
- Admissions: Open for the new academic session.
- Digital Portal: Accessible at https://bsd-digital-portal.vercel.app/ for students and staff.

Be polite, professional, and helpful. Keep responses concise.`;