import db from '../models/index';


/**
 * @class attendeesControllers
 *
 * @export
 *
 */
export default class attendeesControllers {
  /**
   *@description - User can book to attend an event
   * @static
   *
   * @param {any} req - HTTP Request
   * @param {any} res - HTTP Request
   * @memberof attendeesControllers
   *
   * @returns {object} Class instance
   */
  static bookOccasion(req, res) {
    const { numberOfSeats, going } = req.body;

    return db.Occasion.findById(req.params.occasionId)
      .then((foundOccasion) => {
        if (!foundOccasion) {
          return res.status(404)
            .json({
              errors: {
                status: '404',
                title: 'Not Found',
                detail: 'Can\'t find an event with that Id'
              }
            });
        }
        return db.Attendee.findOne({
          where: {
            userId: req.userId,
            occasionId: req.params.occasionId
          }
        })
          .then((foundAttendee) => {
            if (foundAttendee) {
              return res.status(409)
                .json({
                  errors: {
                    status: '409',
                    title: 'Conflict',
                    detail: 'You already registered for this event'
                  }
                });
            }
            if (!foundAttendee) {
              db.Attendee.create({
                userId: req.userId,
                occasionId: req.params.occasionId,
                numberOfSeats,
                going
              })
                .then(newAttendee =>
                  res.status(201)
                    .json({
                      data: {
                        newAttendee
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
}
