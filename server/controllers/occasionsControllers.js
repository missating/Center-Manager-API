import db from '../models/index';
import verifyPageNumber from '../helperFunctions/idValidation';

const errors = {
  status: '404',
  title: 'Not Found',
  detail: 'Can\'t find a center with that Id by you'
};

/**
 *@class occasionsController
 *
 * @export
 *
 */
export default class occasionsControllers {
  /**
   * @description - Creates an event
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof occasionsControllers
   *
   * @returns {object} Class instance
   */
  static addOccasion(req, res) {
    const {
      title, type, date, time, centerId
    } = req.body;

    return db.Center.findById(req.params.centerId)
      .then((foundCenter) => {
        if (!foundCenter) {
          return res.status(404)
            .json({
              errors
            });
        }
        return db.Occasion.findOne({
          where: {
            centerId: req.body.centerId,
            date: req.body.date
          }
        })
          .then((foundOccasion) => {
            if (foundOccasion) {
              return res.status(409)
                .json({
                  errors: {
                    status: '409',
                    title: 'Conflict',
                    detail: 'The above date is currently booked'
                  }
                });
            }
            if (!foundOccasion) {
              db.Occasion.create({
                userId: req.userId,
                centerId,
                title,
                type,
                date,
                time
              })
                .then(newOccasion =>
                  res.status(201)
                    .json({
                      data: {
                        occasion: newOccasion
                      }
                    }));
            }
          });
      })
      .catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }));
  }


  /**
   * @description - Edits the details an event
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof occasionsControllers
   *
   * @returns {object} Class instance
   */
  static editOccasion(req, res) {
    const {
      title, type, date, time, centerId
    } = req.body;

    db.Occasion.findOne({
      where: {
        id: req.params.eventId,
        userId: req.userId
      }
    }).then((foundOccasion) => {
      if (foundOccasion) {
        if (date) {
          db.Occasion.findOne({
            where: {
              centerId: centerId || foundOccasion.centerId,
              date
            }
          }).then((existingEvent) => {
            if (existingEvent
              && existingEvent.id !== parseInt(req.params.eventId, 10)) {
              return res.status(400).send({
                message: 'The center is already booked for that day'
              });
            }
            const occasionDetails = {
              title: title ? title.trim() : foundOccasion.title,
              type: type ? type.trim() : foundOccasion.type,
              date: date ? date.trim() : foundOccasion.date,
              time: time ? time.trim() : foundOccasion.trim,
              centerId: centerId ?
                parseInt(centerId.trim(), 10) : foundOccasion.centerId
            };
            foundOccasion.update(occasionDetails)
              .then(updatedOccasion => res.status(200)
                .json({
                  data: {
                    occasion: updatedOccasion
                  }
                }));
          });
        } else {
          const occasionDetails = {
            title: title ? title.trim() : foundOccasion.title,
            type: type ? type.trim() : foundOccasion.type,
            date: date ? date.trim() : foundOccasion.date,
            time: time ? time.trim() : foundOccasion.trim,
            centerId: centerId ?
              parseInt(centerId.trim(), 10) : foundOccasion.centerId
          };
          foundOccasion.update(occasionDetails)
            .then(updatedOccasion => res.status(200)
              .json({
                data: {
                  occasion: updatedOccasion
                }
              }));
        }
      }
      if (!foundOccasion) {
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
   * @description - Deletes an event
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof occasionsControllers
   *
   * @returns {object} Class instance
   */
  static deleteOccasion(req, res) {
    db.Occasion.findOne({
      where: {
        id: req.params.eventId,
        userId: req.userId
      }
    })
      .then((foundOccasion) => {
        if (foundOccasion) {
          db.Occasion.destroy({
            where: {
              id: req.params.eventId,
              userId: req.userId
            },
            cascade: true
          })
            .then(() => res.status(200)
              .json({
                data: {
                  message: 'The Event has been successfully deleted'
                }
              }));
        }
        if (!foundOccasion) {
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
   * @description - Gets all events
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof occasionsControllers
   *
   * @returns {object} Class instance
   */
  static getAllOcassions(req, res) {
    db.Occasion.findAndCountAll().then((all) => {
      const limit = 6;
      let offset = 0;
      const page = parseInt((req.query.page || 1), 10);
      const error = verifyPageNumber(page);
      if (error.page) {
        return res.status(400).json({ error });
      }
      const numberOfItems = all.count;
      const pages = Math.ceil(numberOfItems / limit);
      offset = limit * (page - 1);
      db.Occasion.findAll({
        limit,
        offset,
        order: [
          ['id', 'DESC']
        ]
      })
        .then((occasion) => {
          if (occasion) {
            return res.status(200)
              .json({
                data: {
                  numberOfItems,
                  limit,
                  pages,
                  currentPage: page,
                  occasion
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


  /**
   * @description - Gets one event
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof occasionsControllers
   *
   * @returns {object} Class instance
   */
  static getOneOccasion(req, res) {
    db.Occasion.findOne({
      where: {
        id: req.params.eventId
      },
      include: [
        {
          model: db.Center
        }
      ]
    })
      .then((occasion) => {
        if (!occasion) {
          return res.status(404)
            .json({
              errors: {
                status: '404',
                title: 'Not Found',
                detail: 'Can\'t find an event with that Id'
              }
            });
        }
        if (occasion) {
          return res.status(200)
            .json({
              data: {
                occasion
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
  }


  /**
   * @description - Gets all events created by a user
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof occasionsControllers
   *
   * @returns {object} Class instance
   */
  static getAllUserOccasion(req, res) {
    db.User.findOne({
      where: {
        id: req.userId
      }
    }).then((existingUser) => {
      if (!existingUser) {
        return res.status(404)
          .json({
            errors: {
              status: '404',
              title: 'Not Found',
              detail: 'A user with that id is not found'
            }
          });
      }
      db.Occasion.findAndCountAll({
        where: {
          userId: req.userId
        }
      }).then((all) => {
        const limit = 6;
        let offset = 0;
        const page = parseInt((req.query.page || 1), 10);
        const error = verifyPageNumber(page);
        if (error.page) {
          return res.status(400).json({ error });
        }
        const numberOfItems = all.count;
        const pages = Math.ceil(numberOfItems / limit);
        offset = limit * (page - 1);
        db.Occasion.findAll({
          where: {
            userId: req.userId
          },
          limit,
          offset,
          order: [
            ['id', 'DESC']
          ]
        }).then(allUserOccasion => res.status(200)
          .json({
            data: {
              numberOfItems,
              limit,
              pages,
              currentPage: page,
              events: allUserOccasion
            }
          }));
      });
    })
      .catch(() => res.status(500)
        .json({
          errors: {
            status: '500',
            detail: 'Internal server error'
          }
        }));
  }
}
