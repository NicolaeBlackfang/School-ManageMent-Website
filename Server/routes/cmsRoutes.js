// routes/cmsRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const cms = require('../controllers/cmsController');

// Public content -------------------------------------------------------------
router.get('/public/site', cms.getPublicSite);
router.get('/public/menu', cms.getPublicMenu);
router.get('/public/pages/:slug', cms.getPageBySlug);
router.get('/public/news', cms.listPublicNews);
router.get('/public/news/:slug', cms.getPublicNewsBySlug);
router.get('/public/gallery', cms.listPublicGallery);
router.get('/public/facilities', cms.listPublicFacilities);
router.get('/public/academic', cms.listPublicAcademic);

// Admin content --------------------------------------------------------------
router.use('/admin/cms', protect, authorizeRoles('admin'));

router.get('/admin/cms/menu', cms.listMenu);
router.post('/admin/cms/menu', cms.saveMenuItem);
router.put('/admin/cms/menu/reorder', cms.reorderMenu);
router.put('/admin/cms/menu/:id', cms.saveMenuItem);
router.delete('/admin/cms/menu/:id', cms.deleteMenu);

router.get('/admin/cms/pages', cms.listPages);
router.post('/admin/cms/pages', cms.savePage);
router.put('/admin/cms/pages/:id', cms.savePage);
router.delete('/admin/cms/pages/:id', cms.deletePage);

router.get('/admin/cms/news', cms.listNews);
router.post('/admin/cms/news', cms.saveNews);
router.put('/admin/cms/news/:id', cms.saveNews);
router.delete('/admin/cms/news/:id', cms.deleteNews);

router.get('/admin/cms/gallery', cms.listGallery);
router.post('/admin/cms/gallery', cms.saveGalleryItem);
router.put('/admin/cms/gallery/:id', cms.saveGalleryItem);
router.delete('/admin/cms/gallery/:id', cms.deleteGallery);

router.get('/admin/cms/facilities', cms.listFacilities);
router.post('/admin/cms/facilities', cms.saveFacility);
router.put('/admin/cms/facilities/:id', cms.saveFacility);
router.delete('/admin/cms/facilities/:id', cms.deleteFacility);

router.get('/admin/cms/academic', cms.listAcademic);
router.post('/admin/cms/academic', cms.saveAcademicInfo);
router.put('/admin/cms/academic/:id', cms.saveAcademicInfo);
router.delete('/admin/cms/academic/:id', cms.deleteAcademic);

router.put('/admin/cms/site', cms.updateSiteInfo);

module.exports = router;
