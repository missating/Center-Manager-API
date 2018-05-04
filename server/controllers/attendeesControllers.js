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
   * @param {any} res - HTTP Response
   * @memberof attendeesControllers
   *
   * @returns {object} Class instance
   */
  static bookOccasion(req, res) {
    const { numberOfSeats, going } = req.body;

    return db.Occasion.findById(req.params.eventId)
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
            occasionId: req.params.eventId
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
                occasionId: req.params.eventId,
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


  /**
   *@description - Edits the response for the booked event
   * @static
   *
   * @param {any} req - HTTP Request
   * @param {any} res - Http Response
   *
   * @memberof attendeesControllers
   *
   * @returns {object} Class instance
   */
  static editBookOccasion(req, res) {
    const { numberOfSeats, going } = req.body;

    db.Attendee.findOne({
      where: {
        occasionId: req.params.eventId,
        userId: req.userId
      }
    }).then((foundAttendee) => {
      if (foundAttendee) {
        const attendeeDetails = {
          numberOfSeats:
            numberOfSeats ?
              parseInt(numberOfSeats.trim(), 10) : foundAttendee.numberOfSeats,
          going: going ? going.trim() : foundAttendee.going
        };
        foundAttendee.update(attendeeDetails)
          .then(updateAttendee => res.status(200)
            .json({
              data: {
                attending: updateAttendee
              }
            }));
      }
      if (!foundAttendee) {
        return res.status(200)
          .json({
            errors: {
              status: '404',
              title: 'Not Found',
              detail: 'You don\'t have an attendee detail with that Id'
            }
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
}
