// controllers/cmsController.js
const mongoose = require('mongoose');
const { SchoolInfo } = require('../models/PublicModels');
const {
  MenuItem,
  SitePage,
  News,
  GalleryItem,
  Facility,
  AcademicInfo,
} = require('../models/CmsModels');

const isId = (value) => mongoose.Types.ObjectId.isValid(value);

const str = (value, max = 200) =>
  typeof value === 'string' ? value.trim().slice(0, max) : undefined;
const bool = (value) => (typeof value === 'boolean' ? value : undefined);
const num = (value) => (Number.isFinite(Number(value)) ? Number(value) : undefined);
const date = (value) => {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
};

const pickDefined = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined));

// Build a nested menu tree from a flat, ordered list.
const buildMenuTree = (items) => {
  const byId = new Map();
  const roots = [];

  for (const item of items) {
    byId.set(String(item._id), { ...item, children: [] });
  }
  for (const item of items) {
    const node = byId.get(String(item._id));
    const parentId = item.parent ? String(item.parent) : null;
    if (parentId && byId.has(parentId)) byId.get(parentId).children.push(node);
    else roots.push(node);
  }
  return roots;
};

const sorted = (items) =>
  [...items].sort((a, b) => (a.order || 0) - (b.order || 0) || String(a.label || a.title || '').localeCompare(String(b.label || b.title || '')));

// Public --------------------------------------------------------------------
const getPublicSite = async (req, res) => {
  try {
    const [info, menu] = await Promise.all([
      SchoolInfo.findOne().lean(),
      MenuItem.find({ location: 'header', isActive: true }).sort({ order: 1, label: 1 }).lean(),
    ]);
    // Never expose the fee configuration on the public site payload.
    const safeInfo = info ? { ...info } : {};
    delete safeInfo.admissionFeeAmount;
    res.json({ success: true, site: safeInfo, menu: buildMenuTree(sorted(menu)) });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to load site content.' });
  }
};

const getPublicMenu = async (req, res) => {
  try {
    const location = req.query.location === 'footer' ? 'footer' : 'header';
    const menu = await MenuItem.find({ location, isActive: true }).sort({ order: 1, label: 1 }).lean();
    res.json({ success: true, data: buildMenuTree(sorted(menu)) });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to load menu.' });
  }
};

const getPageBySlug = async (req, res) => {
  try {
    const page = await SitePage.findOne({ slug: String(req.params.slug || '').toLowerCase(), isPublished: true }).lean();
    if (!page) return res.status(404).json({ success: false, message: 'Page not found.' });
    res.json({ success: true, data: page });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to load page.' });
  }
};

const listPublicNews = async (req, res) => {
  try {
    const filter = { isPublished: true, publishedAt: { $lte: new Date() } };
    if (['news', 'notice', 'announcement'].includes(req.query.type)) filter.type = req.query.type;
    if (req.query.q) filter.title = { $regex: String(req.query.q).slice(0, 80), $options: 'i' };
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
    const data = await News.find(filter).sort({ publishedAt: -1 }).limit(limit).lean();
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to load news.' });
  }
};

const getPublicNewsBySlug = async (req, res) => {
  try {
    const item = await News.findOne({
      slug: String(req.params.slug || '').toLowerCase(),
      isPublished: true,
      publishedAt: { $lte: new Date() },
    }).lean();
    if (!item) return res.status(404).json({ success: false, message: 'Article not found.' });
    res.json({ success: true, data: item });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to load article.' });
  }
};

const listPublicGallery = async (req, res) => {
  try {
    const filter = { isPublished: true };
    if (req.query.category) filter.category = String(req.query.category).slice(0, 80);
    const data = await GalleryItem.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to load gallery.' });
  }
};

const listPublicFacilities = async (req, res) => {
  try {
    const data = await Facility.find({ isPublished: true }).sort({ order: 1, title: 1 }).lean();
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to load facilities.' });
  }
};

const listPublicAcademic = async (req, res) => {
  try {
    const data = await AcademicInfo.find({ isPublished: true }).sort({ order: 1, title: 1 }).lean();
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to load academic information.' });
  }
};

// Admin ---------------------------------------------------------------------
const listAdmin = (Model, sort = { order: 1, createdAt: -1 }) => async (req, res) => {
  try {
    const data = await Model.find({}).sort(sort).lean();
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to load content.' });
  }
};

const saveMenuItem = async (req, res) => {
  try {
    const payload = pickDefined({
      label: str(req.body.label, 80),
      url: str(req.body.url, 500),
      location: ['header', 'footer'].includes(req.body.location) ? req.body.location : undefined,
      parent: isId(req.body.parent) ? req.body.parent : req.body.parent === null ? null : undefined,
      order: num(req.body.order),
      isExternal: bool(req.body.isExternal),
      openInNewTab: bool(req.body.openInNewTab),
      isActive: bool(req.body.isActive),
    });

    if (!payload.label || !payload.url) {
      return res.status(400).json({ success: false, message: 'Label and URL are required.' });
    }
    if (payload.parent && String(payload.parent) === String(req.params.id)) {
      return res.status(400).json({ success: false, message: 'A menu item cannot be its own parent.' });
    }

    const item = req.params.id
      ? await MenuItem.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
      : await MenuItem.create(payload);

    if (!item) return res.status(404).json({ success: false, message: 'Menu item not found.' });
    res.json({ success: true, data: item });
  } catch {
    res.status(400).json({ success: false, message: 'Menu item could not be saved.' });
  }
};

const reorderMenu = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items.slice(0, 500) : [];
    await Promise.all(
      items
        .filter((item) => isId(item.id))
        .map((item) =>
          MenuItem.findByIdAndUpdate(item.id, {
            order: num(item.order) ?? 0,
            parent: isId(item.parent) ? item.parent : null,
          })
        )
    );
    res.json({ success: true, message: 'Menu order saved.' });
  } catch {
    res.status(400).json({ success: false, message: 'Menu order could not be saved.' });
  }
};

const savePage = async (req, res) => {
  try {
    const payload = pickDefined({
      title: str(req.body.title, 160),
      slug: str(req.body.slug, 120),
      excerpt: str(req.body.excerpt, 400) ?? '',
      content: typeof req.body.content === 'string' ? req.body.content.slice(0, 100000) : undefined,
      coverImage: str(req.body.coverImage, 2_000_000) ?? '',
      isPublished: bool(req.body.isPublished),
      showTitle: bool(req.body.showTitle),
      order: num(req.body.order),
    });
    if (!payload.title) return res.status(400).json({ success: false, message: 'Title is required.' });

    const page = req.params.id
      ? await SitePage.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
      : await SitePage.create(payload);

    if (!page) return res.status(404).json({ success: false, message: 'Page not found.' });
    res.json({ success: true, data: page });
  } catch (err) {
    const dup = err.code === 11000;
    res.status(dup ? 409 : 400).json({ success: false, message: dup ? 'That slug is already in use.' : 'Page could not be saved.' });
  }
};

const saveNews = async (req, res) => {
  try {
    const payload = pickDefined({
      title: str(req.body.title, 200),
      slug: str(req.body.slug, 120),
      type: ['news', 'notice', 'announcement'].includes(req.body.type) ? req.body.type : undefined,
      excerpt: str(req.body.excerpt, 500) ?? '',
      content: typeof req.body.content === 'string' ? req.body.content.slice(0, 100000) : undefined,
      coverImage: str(req.body.coverImage, 2_000_000) ?? '',
      isPublished: bool(req.body.isPublished),
      publishedAt: date(req.body.publishedAt),
      expiresAt: req.body.expiresAt === null ? null : date(req.body.expiresAt),
    });
    if (!payload.title) return res.status(400).json({ success: false, message: 'Title is required.' });

    const item = req.params.id
      ? await News.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
      : await News.create(payload);

    if (!item) return res.status(404).json({ success: false, message: 'Article not found.' });
    res.json({ success: true, data: item });
  } catch (err) {
    const dup = err.code === 11000;
    res.status(dup ? 409 : 400).json({ success: false, message: dup ? 'That slug is already in use.' : 'Article could not be saved.' });
  }
};

const saveGalleryItem = async (req, res) => {
  try {
    const payload = pickDefined({
      title: str(req.body.title, 160) ?? '',
      image: str(req.body.image, 2_000_000),
      category: str(req.body.category, 80) ?? 'Campus',
      order: num(req.body.order),
      isPublished: bool(req.body.isPublished),
    });
    if (!payload.image) return res.status(400).json({ success: false, message: 'Image is required.' });

    const item = req.params.id
      ? await GalleryItem.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
      : await GalleryItem.create(payload);

    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    res.json({ success: true, data: item });
  } catch {
    res.status(400).json({ success: false, message: 'Gallery item could not be saved.' });
  }
};

const saveFacility = async (req, res) => {
  try {
    const payload = pickDefined({
      title: str(req.body.title, 160),
      description: str(req.body.description, 5000) ?? '',
      icon: str(req.body.icon, 80) ?? '',
      image: str(req.body.image, 2_000_000) ?? '',
      order: num(req.body.order),
      isPublished: bool(req.body.isPublished),
    });
    if (!payload.title) return res.status(400).json({ success: false, message: 'Title is required.' });

    const item = req.params.id
      ? await Facility.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
      : await Facility.create(payload);

    if (!item) return res.status(404).json({ success: false, message: 'Facility not found.' });
    res.json({ success: true, data: item });
  } catch {
    res.status(400).json({ success: false, message: 'Facility could not be saved.' });
  }
};

const saveAcademicInfo = async (req, res) => {
  try {
    const payload = pickDefined({
      key: str(req.body.key, 80)?.toLowerCase(),
      title: str(req.body.title, 160),
      content: typeof req.body.content === 'string' ? req.body.content.slice(0, 50000) : undefined,
      items: Array.isArray(req.body.items)
        ? req.body.items.filter((i) => typeof i === 'string').slice(0, 100).map((i) => i.slice(0, 500))
        : undefined,
      order: num(req.body.order),
      isPublished: bool(req.body.isPublished),
    });
    if (!payload.title) return res.status(400).json({ success: false, message: 'Title is required.' });

    const item = req.params.id
      ? await AcademicInfo.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
      : await AcademicInfo.create(payload);

    if (!item) return res.status(404).json({ success: false, message: 'Academic section not found.' });
    res.json({ success: true, data: item });
  } catch (err) {
    const dup = err.code === 11000;
    res.status(dup ? 409 : 400).json({ success: false, message: dup ? 'That key is already in use.' : 'Academic section could not be saved.' });
  }
};

const updateSiteInfo = async (req, res) => {
  try {
    const payload = pickDefined({
      schoolName: str(req.body.schoolName, 120),
      tagline: str(req.body.tagline, 200),
      welcomeTitle: str(req.body.welcomeTitle, 200),
      aboutText: str(req.body.aboutText, 4000),
      mission: str(req.body.mission, 4000),
      vision: str(req.body.vision, 4000),
      address: str(req.body.address, 300),
      phone: str(req.body.phone, 60),
      email: str(req.body.email, 120),
      facebook: str(req.body.facebook, 300),
      youtube: str(req.body.youtube, 300),
      schoolLogo: str(req.body.schoolLogo, 2_000_000),
      bannerImage: str(req.body.bannerImage, 2_000_000),
      admissionFeeAmount:
        req.body.admissionFeeAmount !== undefined
          ? Math.max(0, Math.min(1_000_000, Number(req.body.admissionFeeAmount) || 0))
          : undefined,
    });

    const info = await SchoolInfo.findOneAndUpdate({}, payload, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });
    res.json({ success: true, data: info });
  } catch {
    res.status(400).json({ success: false, message: 'Site settings could not be saved.' });
  }
};

const removeContent = (Model, label) => async (req, res) => {
  try {
    if (!isId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid id.' });
    const removed = await Model.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: `${label} not found.` });
    res.json({ success: true, message: `${label} deleted.` });
  } catch {
    res.status(400).json({ success: false, message: `${label} could not be deleted.` });
  }
};

module.exports = {
  getPublicSite,
  getPublicMenu,
  getPageBySlug,
  listPublicNews,
  getPublicNewsBySlug,
  listPublicGallery,
  listPublicFacilities,
  listPublicAcademic,
  listMenu: listAdmin(MenuItem, { location: 1, order: 1 }),
  listPages: listAdmin(SitePage),
  listNews: listAdmin(News, { publishedAt: -1 }),
  listGallery: listAdmin(GalleryItem),
  listFacilities: listAdmin(Facility),
  listAcademic: listAdmin(AcademicInfo),
  saveMenuItem,
  reorderMenu,
  savePage,
  saveNews,
  saveGalleryItem,
  saveFacility,
  saveAcademicInfo,
  updateSiteInfo,
  deleteMenu: removeContent(MenuItem, 'Menu item'),
  deletePage: removeContent(SitePage, 'Page'),
  deleteNews: removeContent(News, 'Article'),
  deleteGallery: removeContent(GalleryItem, 'Gallery item'),
  deleteFacility: removeContent(Facility, 'Facility'),
  deleteAcademic: removeContent(AcademicInfo, 'Academic section'),
};
