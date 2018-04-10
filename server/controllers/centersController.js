import db from '../models/index';

const errors = {
  status: '404',
  title: 'Not Found',
  detail:
    'Can\'t find a center with that id by you'
};

/**
 *@class centersController
 *
 * @export
 *
 */
export default class centersController {
  /**
   * @description - Creates a new center
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof centersController
   *
   * @returns {object} Class instance
   */
  static addCenter(req, res) {
    const {
      centerImage, name, location, facilities
    } = req.body;

    db.Center.findOne({
      where: {
        name,
        userId: req.userId
      }
    }).then((foundCenter) => {
      if (foundCenter) {
        return res.status(409).json({
          errors: {
            status: '409',
            title: 'Conflict',
            detail: 'You already have a center with this name'
          }
        });
      }
      if (!foundCenter) {
        db.Center.create({
          centerImage,
          userId: req.userId,
          name,
          location,
          facilities
        })
          .then(newCenter =>
            res.status(201).json({
              data: {
                center: newCenter
              }
            }));
      }
    })
      .catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }));
  }


  /**
   * @description - Edits the details of a center
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof centersController
   *
   * @returns {object} Class instance
   */
  static editCenter(req, res) {
    const {
      centerImage, name, location, facilities
    } = req.body;


    db.Center.findOne({
      where: {
        id: req.params.centerId,
        userId: req.userId
      }
    }).then((foundCenter) => {
      if (foundCenter) {
        const centerDetails = {
          profileimage: centerImage ? centerImage.trim()
            : foundCenter.profileImage,
          name: name ? name.trim() : foundCenter.name,
          location: location ? location.trim() : foundCenter.location,
          facilities: facilities ? facilities.trim() : foundCenter.facilities
        };
        foundCenter.update(centerDetails)
          .then(updatedCenter => res.status(200)
            .json({
              data: {
                center: updatedCenter
              }
            }));
      }
      if (!foundCenter) {
        return res.status(404)
          .json({
            errors
          });
      }
    })
      .catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }));
  }


  /**
   * @description - Deletes a center
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof centersController
   *
   * @returns {object} Class instance
   */
  static deleteCenter(req, res) {
    db.Center.findOne({
      where: {
        id: req.params.centerId,
        userId: req.userId
      }
    })
      .then((foundCenter) => {
        if (foundCenter) {
          db.Center.destroy({
            where: {
              id: req.params.centerId,
              userId: req.userId
            },
            cascade: true
          })
            .then(() => res.status(200)
              .json({
                data: {
                  message: 'Center deleted successfully'
                }
              }));
        }
        if (!foundCenter) {
          return res.status(404)
            .json({
              errors
            });
        }
      })
      .catch(() => res.status(500)
        .json({
          errors: {
            status: '500',
            detail: 'Internal server error'
          }
        }));
  }


  /**
   * @description - Gets all centers
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof centersController
   *
   * @returns {object} Class instance
   */
  static getAllCenters(req, res) {
    db.Center.findAndCountAll().then((all) => {
      const limit = 6;
      let offset = 0;
      const page = parseInt((req.query.page || 1), 10);
      const numberOfItems = all.count;
      const pages = Math.ceil(numberOfItems / limit);
      offset = limit * (page - 1);
      db.Center.findAll({
        limit,
        offset,
        order: [
          ['id', 'DESC']
        ],
        include: [
          {
            model: db.Occasion
          }
        ]
      })
        .then((centers) => {
          if (centers) {
            return res.status(200)
              .json({
                data: {
                  numberOfItems,
                  limit,
                  pages,
                  currentPage: page,
                  centers
                }
              });
          }
        })
        .catch(() => res.status(500)
          .json({
            errors: {
              status: '500',
              detail: 'Internal server error'
            }
          }));
    });
  }
}

