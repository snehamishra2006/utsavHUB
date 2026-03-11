/**
 * Prisma Schema Definition (Conceptual)
 * 
 * model Event {
 *   id          String   @id @default(cuid())
 *   title       String
 *   description String
 *   date        DateTime
 *   location    String
 *   address     String
 *   latitude    Float
 *   longitude   Float
 *   price       Float?   // null for free
 *   category    String
 *   imageUrl    String
 *   attendees   Int      @default(0)
 *   createdAt   DateTime @default(now())
 *   updatedAt   DateTime @updatedAt
 * }
 */

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  city: string;
  locality: string;
  address: string;
  latitude: number;
  longitude: number;
  price: number | null;
  category: string;
  imageUrl: string;
  attendees: number;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Grand Wedding Expo 2026',
    description: 'The biggest wedding exhibition in Bangalore featuring top designers and planners.',
    date: 'Oct 12, 2026',
    time: '10:00 AM',
    city: 'Bangalore',
    locality: 'Indiranagar',
    address: 'KTPO, Whitefield',
    latitude: 12.9784,
    longitude: 77.7285,
    price: 200,
    category: 'Exhibitions',
    imageUrl: 'https://picsum.photos/seed/wedding/800/600',
    attendees: 1200,
  },
  {
    id: '2',
    title: 'Evening Satsang & Bhajan',
    description: 'A peaceful evening of spiritual songs and meditation.',
    date: 'Aug 20, 2026',
    time: '6:30 PM',
    city: 'Delhi',
    locality: 'South Ex',
    address: 'Iskcon Temple, East of Kailash',
    latitude: 28.5562,
    longitude: 77.2535,
    price: null,
    category: 'Religious',
    imageUrl: 'https://picsum.photos/seed/temple/800/600',
    attendees: 450,
  },
  {
    id: '3',
    title: 'React India Meetup',
    description: 'Networking and deep dives into React 19 and Next.js.',
    date: 'Sep 15, 2026',
    time: '2:00 PM',
    city: 'Pune',
    locality: 'Baner',
    address: 'WeWork, Bluegrass Business Park',
    latitude: 18.5597,
    longitude: 73.7799,
    price: null,
    category: 'Tech',
    imageUrl: 'https://picsum.photos/seed/code/800/600',
    attendees: 120,
  },
  {
    id: '4',
    title: 'IPL Fan Park: RCB vs MI',
    description: 'Live screening on a giant screen with stadium-like atmosphere.',
    date: 'May 05, 2026',
    time: '7:00 PM',
    city: 'Mumbai',
    locality: 'Bandra',
    address: 'MMRDA Grounds, BKC',
    latitude: 19.0607,
    longitude: 72.8644,
    price: 499,
    category: 'Sports',
    imageUrl: 'https://picsum.photos/seed/cricket/800/600',
    attendees: 5000,
  },
  {
    id: '5',
    title: 'Zakir Khan Live - Tathastu',
    description: 'Catch the "Sakht Launda" himself in a brand new stand-up special.',
    date: 'Dec 10, 2026',
    time: '8:00 PM',
    city: 'Bangalore',
    locality: 'Koramangala',
    address: 'St. Johns Auditorium',
    latitude: 12.9344,
    longitude: 77.6113,
    price: 999,
    category: 'Comedy',
    imageUrl: 'https://picsum.photos/seed/comedy/800/600',
    attendees: 800,
  },
  {
    id: '6',
    title: 'Handloom & Handicraft Mela',
    description: 'Direct from artisans across India. Support local craft.',
    date: 'Nov 15, 2026',
    time: '11:00 AM',
    city: 'Delhi',
    locality: 'Connaught Place',
    address: 'Dilli Haat, INA',
    latitude: 28.5733,
    longitude: 77.2075,
    price: 50,
    category: 'Exhibitions',
    imageUrl: 'https://picsum.photos/seed/craft/800/600',
    attendees: 2500,
  },
];
