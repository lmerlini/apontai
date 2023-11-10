
const { Op } = require('sequelize');
const { Company } = require('../models');




/**
 * Repository for Company operations.
 * @class
 */
class CompanyRepository {

    constructor() {
        /** @type {typeof import('../models/company')} */
        this.model = Company;

    }

    /**
     * Find all companies.
     * @returns {Promise<Array>} A promise that resolves to an array of companies.
     */
    async findAll() {
        return this.model.findAll();
    }

    /**
    * Search for companies based on generic query criteria.
    * @param {Object} queryParams - The search query parameters.
    * @returns {Promise<Array>} A promise that resolves to an array of companies.
    */
    async search(queryParams) {
        const whereClause = {};
        // TODO: Verificar se não dá pra pegar direto da model criando um method
        const searchableFields = ['name', 'nick_name', 'email', 'cnpj', 'city'];

        for (const field of searchableFields) {
            if (queryParams[field]) {
                whereClause[field] = { [Op.like]: `%${queryParams[field]}%` };
            }
        }
        if (Object.keys(whereClause).length === 0) {
            return [];
        }

        return this.model.findAll({
            where: whereClause
        });
    }

    /**
  * Create a new company.
  * @param {Object} data - The data to create a new company.
  * @returns {Promise<Object>} A promise that resolves to the created company.
  */
    async create(data) {
        return this.model.create(data);
    }

    /**
     * Delete a company by its ID.
     * @param {number} id - The ID of the company to delete.
     * @returns {Promise<number>} A promise that resolves to the number of companies deleted.
     */
    async delete(id) {
        return this.model.destroy({ where: { id } });
    }

    /**
     * Update a company by its ID and return the updated object.
     * @param {number} id - The ID of the company to update.
     * @param {Object} data - The data to update the company with.
     * @returns {Promise<Object>} A promise that resolves to the updated company object.
     */
    async update(id, data) {
        const [updateCount] = await this.model.update(data, { where: { id } });

        if (updateCount === 1) {
            const updatedCompany = await this.model.findByPk(id);
            return updatedCompany;
        }
        return null;
    }

}

module.exports = CompanyRepository;
