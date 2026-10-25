// models/CmsModels.js
// WordPress-style content primitives: a navigable menu tree, standalone pages,
// news/notices/announcements, gallery items, facilities and academic sections.
const mongoose = require('mongoose');

const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);

const MenuItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true, maxlength: 80 },
    url: { type: String, required: true, trim: true, maxlength: 500 },
    location: { type: String, enum: ['header', 'footer'], default: 'header', index: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', default: null, index: true },
    order: { type: Number, default: 0 },
    isExternal: { type: Boolean, default: false },
    openInNewTab: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SitePageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, unique: true, index: true, lowercase: true, trim: true },
    excerpt: { type: String, default: '', maxlength: 400 },
    content: { type: String, default: '', maxlength: 100000 },
    coverImage: { type: String, default: '' },
    isPublished: { type: Boolean, default: false, index: true },
    showTitle: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

SitePageSchema.pre('validate', function () {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  else if (this.slug) this.slug = slugify(this.slug);
});

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, unique: true, index: true, lowercase: true, trim: true },
    type: { type: String, enum: ['news', 'notice', 'announcement'], default: 'news', index: true },
    excerpt: { type: String, default: '', maxlength: 500 },
    content: { type: String, default: '', maxlength: 100000 },
    coverImage: { type: String, default: '' },
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date, default: Date.now, index: true },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

NewsSchema.pre('validate', function () {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  else if (this.slug) this.slug = slugify(this.slug);
});

const GalleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, default: '', trim: true, maxlength: 160 },
    image: { type: String, required: true },
    category: { type: String, default: 'Campus', trim: true, maxlength: 80, index: true },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

const FacilitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, default: '', maxlength: 5000 },
    icon: { type: String, default: '' },
    image: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

const AcademicInfoSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    content: { type: String, default: '', maxlength: 50000 },
    items: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

module.exports = {
  slugify,
  MenuItem: mongoose.model('MenuItem', MenuItemSchema),
  SitePage: mongoose.model('SitePage', SitePageSchema),
  News: mongoose.model('News', NewsSchema),
  GalleryItem: mongoose.model('GalleryItem', GalleryItemSchema),
  Facility: mongoose.model('Facility', FacilitySchema),
  AcademicInfo: mongoose.model('AcademicInfo', AcademicInfoSchema),
};
