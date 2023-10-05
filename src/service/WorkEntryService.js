const { create, deleteById, findAll, updateById } = require('../repository/WorkEntryRepository');
const { findById } = require('../repository/ClientRepository');
const { Op } = require('sequelize');

class WorkEntryService {

    static getAll() {
        return findAll();
    }

    static async create(client_id, data) {
        const client = await findById(client_id);

        if (!client) {
            throw new Error(`Cliente com ID ${client_id} não existe.`);
        }

        return create(data);
    }

    static async getTotal(startDate, endDate) {

        let result = await findAll({
            where: {
                service_date:
                {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
        })

        return result
    }

    static async destroy(id) {

        const result = await deleteById(id);
        if (result) {
            return 'Entrada de trabalho deletada com sucesso!';
        } else {
            throw new Error(`Erro ao deletar entrada de trabalho com ID ${id} não existe.`);
        }
    }

    static update(id, entryData) {
        return updateById(id, entryData);
    }

    static async getClientById(id) {

        return await findAll({
            where: { client_id: id }
        });
    }

}


module.exports = WorkEntryService;
