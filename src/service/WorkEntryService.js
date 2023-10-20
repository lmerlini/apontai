const WorkEntryRepository = require('../repository/WorkEntryRepository');
const { Op } = require('sequelize');
const ClientService = require('./ClientService');

class WorkEntryService {

    constructor() {
        this.workRepo = new WorkEntryRepository();
        this.client = new ClientService()
    }

    async create(client_id, data) {

        // TODO.: REFATORAR CLASSE E INSTANCIA

        const client = await this.client.findById(client_id)

        if (!client) {
            throw new Error(`Cliente com ID ${client_id} não existe.`);
        }

        return this.workRepo.create(data);
    }

    async list(userId) {
        return this.workRepo.findByUserId(userId);
    }

    async getTotal(userId, startDate, endDate) {

        let result = await this.workRepo.find({
            where: {
                user_id: userId,
                service_date:
                {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
        })

        return result
    }

    async destroy(id) {

        const result = await this.workRepo.deleteById(id);
        if (result) {
            return 'Entrada de trabalho deletada com sucesso!';
        } else {
            throw new Error(`Erro ao deletar entrada de trabalho com ID ${id} não existe.`);
        }
    }

    update(id, entryData) {
        return this.workRepo.updateById(id, entryData);
    }

    async getClientById(id) {

        return await this.workRepo.findAll({
            where: { client_id: id }
        });
    }

}

module.exports = WorkEntryService;
