const ClientRepository = require('../repository/ClientRepository');

exports.getAllClients = async (req, res) => {
    const clients = await ClientRepository.findAll();
    res.json(clients);
};

exports.createClient = async (req, res) => {

    let { name, phone, cnpj, email } = req.body

    phone = phone.replace(/\D+/g, '');
    cnpj = cnpj.replace(/\D+/g, '');

    const data = {
        name, phone, cnpj, email
    }

    const client = await ClientRepository.create(data);
    res.json(client);
};

exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await ClientRepository.deleteById(id);

        if (result) {
            return res.status(200).json({ message: 'Cliente deletado com sucesso!' });
        } else {
            return res.status(404).json({ message: result });
        }

    } catch (error) {
        console.error('Erro ao deletar o Cliente:', error);
        return res.status(500).json({ message: 'Erro ao deletar o Cliente.' });
    }
}
