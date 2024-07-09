const AccountableService = require("../service/AccountableService");

/**
 * Controller for handling work-related operations.
 */
class AccountableController {

    constructor() {
        this.service = new AccountableService();
    }

    list = async (req, res, next) => {
        try {
            this._preprocessRequest(req);
            const entries = await this.service.list(req.body.customer_id);
            return res.status(200).json(entries);
        } catch (error) {
            next(error)
        }
    }

    /**
  * Preprocess the request and adds the user ID to the request body.
  * @private
  * @param {Object} req - The Express request object.
  */
    _preprocessRequest(req) {
        const { id } = req.user;
        req.body.user_id = id;
    }
}

/**
 * Exports the WorkController class.
 * @module AccountableController
 */
module.exports = AccountableController;
