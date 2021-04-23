const express = require('express');
const contentController = require('../controllers/contentController');

const contentRouter = express.Router();
function router(nav) {
  const { getIndex, getById, middleware } = contentController(nav);
  contentRouter.use(middleware);
  contentRouter.route('/')
    .get(getIndex);

  contentRouter.route('/:id')
    .get(getById);
  return contentRouter;
}


module.exports = router;

