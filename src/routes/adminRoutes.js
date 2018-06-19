import Center from '../controllers/centersController';
import authorization from '../middleware/authorization';
import centerValidation from '../middleware/centerValidation';
import verifyAdmin from '../middleware/verifyAdmin';
import { verifyCenterId } from '../middleware/idValidation';

/**
 *@function adminRoutes
 *
 * @export
 * @param {any} app
 *
 * @returns {void}
 */
export default function adminRoutes(app) {
  // add center
  app.route('/api/v1/centers')
    .post(authorization, verifyAdmin, centerValidation, Center.addCenter)
    .get(Center.getAllCenters);

  app.route('/api/v1/centers/:centerId')
    .put(authorization, verifyAdmin, verifyCenterId, Center.editCenter)
    .delete(authorization, verifyAdmin, verifyCenterId, Center.deleteCenter)
    .get(verifyCenterId, Center.getACenter);
}
