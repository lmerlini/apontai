const WorkRepository = require('../repository/WorkRepository');
const { Op } = require('sequelize');
const CustomerService = require('./CustomerService');

//TODO: falta criar os middlewares para erros
class WorkService {

    constructor() {
        this.workRepo = new WorkRepository();
        this.customer = new CustomerService()
    }

    async create(customer_id, data) {
        const customer = await this.customer.findById(customer_id)

        if (!customer) {
            throw new Error(`Cliente com ID ${customer_id} não existe.`);
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
        const result = this.workRepo.updateById(id, entryData);
        if (result) {
            return result
        } else {
            throw new Error(`Não foi possível alterar, tente novamente!`);
        }
    }

    async getClientById(id) {

        return await this.workRepo.findAll({
            where: { client_id: id }
        });
    }

}

module.exports = WorkService;
