import { groq } from "next-sanity";

// Site settings (singleton)
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    name,
    tagline,
    bio,
    aboutText,
    portrait,
    availabilityStatus,
    email,
    phone,
    location,
    socialLinks,
    behanceUrl,
    resumeFile,
    "resumeUrl": resumeFile.asset->url
  }
`;

// Featured projects for home page
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    client,
    "category": category->title,
    "categorySlug": category->slug.current,
    year,
    thumbnail,
    heroImage
  }
`;

// All projects
export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    client,
    "category": category->title,
    "categorySlug": category->slug.current,
    year,
    thumbnail
  }
`;

// Single project by slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    "category": category->title,
    "categorySlug": category->slug.current,
    year,
    thumbnail,
    heroImage,
    body,
    gallery,
    "previousProject": *[_type == "project" && order < ^.order] | order(order desc)[0] {
      title,
      slug,
      thumbnail
    },
    "nextProject": *[_type == "project" && order > ^.order] | order(order asc)[0] {
      title,
      slug,
      thumbnail
    }
  }
`;

// All project slugs for static params
export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// All categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }
`;

// All services
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    features,
    icon,
    order,
    pricingLabel
  }
`;

// All testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    clientName,
    role,
    company,
    quote,
    avatar
  }
`;

// Featured testimonials for home page
export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
    _id,
    clientName,
    role,
    company,
    quote,
    avatar
  }
`;
