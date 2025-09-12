export interface GalleryItem {
  id: number;
  type: "photo" | "video";
  title: string;
  thumbnail: string; // preview image
  src: string;       // full-size photo or video link
  date: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: "photo",
    title: "Corporate Launch Event",
    thumbnail: "/images/gallery/BV2_8820.jpg",
    src: "/images/gallery/BV2_8820.jpg",
    date: "2024-12-05",
  },
  {
    id: 2,
    type: "video",
    title: "Who we are diageo",
    thumbnail: "/images/gallery/roadshow_thumb.jpg",
    src: "/videos/who-we-are-diageo.mp4",
    date: "2024-11-12",
  },
  {
    id: 3,
    type: "photo",
    title: "Warehouse Showcase",
    thumbnail: "/images/gallery/BV2_8865-2.jpg",
    src: "/images/gallery/BV2_8865-2.jpg",
    date: "2024-10-01",
  },
  {
    id: 4,
    type: "video",
    title: "Diageo launches 500 mln savings plan ahead of us tariff hit reuters",
    thumbnail: "/images/gallery/diageo-launches-500-mln-savings-plan-ahead-of-us-tariff-hit-reuters.jpg",
    src: "/videos/diageo-launches-500-mln-savings-plan-ahead-of-us-tariff-hit-reuters_video_720p_english.mp4",
    date: "2024-08-14",
  },
  {
    id: 5,
    type: "photo",
    title: "Charity Donation Drive",
    thumbnail: "/images/gallery/BV2_8878-2.jpg",
    src: "/images/gallery/BV2_8878-2.jpg",
    date: "2024-07-22",
  },
  {
    id: 6,
    type: "video",
    title: "Guinness wrap up with cfo nik jhangiani guinness investor analyst event diageo",
    thumbnail: "/images/gallery/nik-jhangiani-chief-financial-officer.jpg",
    src: "/videos/guinness-wrap-up-with-cfo-nik-jhangiani-guinness-investor-analyst-event-diageo_video_1080p_english.mp4",
    date: "2024-06-15",
  },
  {
    id: 7,
    type: "photo",
    title: "Staff Training Program",
    thumbnail: "/images/gallery/BV2_865-2.jpg",
    src: "/images/gallery/BV2_865-2.jpg",
    date: "2024-05-09",
  },
  {
    id: 8,
    type: "photo",
    title: "Delivery Fleet Showcase",
    thumbnail: "/images/gallery/BV2_8871-2.jpg",
    src: "/images/gallery/BV2_8871-2.jpg",
    date: "2024-04-27",
  },
  {
    id: 9,
    type: "video",
    title: "Explore Scotch Whisky and how it's made diageo",
    thumbnail: "/images/gallery/scotch_whisky.jpg",
    src: "/videos/explore-scotch-whisky-and-how-it-s-made-diageo_video_1080p_english.mp4",
    date: "2024-03-18",
  },
  {
    id: 10,
    type: "photo",
    title: "Warehouse Expansion",
    thumbnail: "/images/gallery/expansion_thumb.jpg",
    src: "/images/gallery/expansion.jpg",
    date: "2024-02-11",
  },
  {
    id: 11,
    type: "photo",
    title: "Product Sampling Event",
    thumbnail: "/images/gallery/sampling_thumb.jpg",
    src: "/images/gallery/sampling.jpg",
    date: "2024-01-05",
  },
  {
    id: 12,
    type: "video",
    title: "TV Commercial Shoot",
    thumbnail: "/images/gallery/diageo-new1.jpg",
    src: "/videos/diageo-behind-the-world-s-biggest-alcohol-brands.mp4",
    date: "2023-12-20",
  },
  {
    id: 13,
    type: "photo",
    title: "Employee Recognition Awards",
    thumbnail: "/images/gallery/awards_thumb.jpg",
    src: "/images/gallery/awards.jpg",
    date: "2023-11-11",
  },
  {
    id: 14,
    type: "photo",
    title: "Holiday Party",
    thumbnail: "/images/gallery/holiday_thumb.jpg",
    src: "/images/gallery/holiday.jpg",
    date: "2023-10-29",
  },
];
