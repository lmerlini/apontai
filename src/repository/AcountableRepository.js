const { Accountable } = require('../models');
const FieldsRepository = require('./FieldsRepository')


/**
 * Repository for handling operations related to the accountable model. 
 */
class AccountableRepository {


    constructor() {
        this.model = Accountable
        this.fields = new FieldsRepository()
    }

    async list(customerId, params) {
        return await this.model.findAll({
            where: { customer_id: customerId, ...params },
            ... this.fields.getAttributes()
        });


    }

}

/**
 * Exports the WorkRepository class.
 */
module.exports = AccountableRepository;
