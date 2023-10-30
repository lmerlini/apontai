const CustomerService = require('../service/CustomerService');

/**
 * Class representing a controller for customers.
 */
class CustomerController {

    /**
     * Creates a new instance of the CustomerController.
     * @constructor
     */
    constructor() {
        this.service = new CustomerService();
    }

    /**
     * Lists all customers.
     * @async
     * @param {Object} _ - The request object. Not used in this function but kept for Express middleware signature.
     * @param {Object} res - The response object.
     */
    list = async (_, res, next) => {
        try {
            const customer = await this.service.list();
            res.status(200).json(customer);
        } catch (error) {
            next(error)
        }
    }

    /**
     * Creates a new customer.
     * @async
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    create = async (req, res, next) => {
        const customerData = req.body;

        try {
            const customer = await this.service.create(customerData);
            res.status(201).json(customer);
        } catch (error) {
            next(error)
        }
    }

    /**
     * Updates an existing customer by its ID.
     * @async
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await this.service.update(id, req.body);
            res.status(200).json({ customer: customer });
        } catch (error) {
            next(error)
        }
    }


    /**
     * Deletes multiple clients provided an array of IDs.
     * @async
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    delete = async (req, res, next) => {
        try {
            const message = await this.service.delete(req.body.id);
            res.status(200).json({ message });
        } catch (error) {
            next(error)
        }
    }
}

/**
 * Exports the CustomerController class.
 * @module CustomerController
 */
module.exports = CustomerController;
