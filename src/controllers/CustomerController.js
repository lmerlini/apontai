const CustomerService = require('../service/CustomerService');

class CustomerController {

    constructor() {
        this.service = new CustomerService();
    }

    async list(_, res) {
        try {
            const customer = await this.service.list();
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({
                message: 'Erro ao retornar dados dos clientes',
                error: error
            })
        }
    }

    async create(req, res) {
        const customerData = req.body;

        try {
            const customer = await this.service.create(customerData);
            res.status(201).json(customer);
        } catch (error) {
            if (error.errors)
                res.status(500).json({ error: error.errors })
            else
                res.status(500).json({ error: "Ocorreu um erro, tente novamente!!!" })
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const customer = await this.service.update(id, req.body)
        res.status(200).json({ customer: customer })
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const message = await this.service.delete(id);
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar o Cliente.' });
        }
    }

    async deleteClients(req, res) {
        try {
            const message = await this.service.delete(req.body.id);
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar o Cliente.', error });
        }
    }
}

module.exports = CustomerController;
