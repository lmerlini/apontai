const { WorkEntry } = require('../models');

exports.list = async (req, res) => {
    try {
        const entries = await WorkEntry.findAll();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving work entries." });
    }
};

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const entry = await WorkEntry.create(req.body);
        res.json(entry);
    } catch (error) {
        res.status(500).json({ message: "Error creating work entry." });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.body;

        const result = await WorkEntry.destroy({
            where: { id }
        });

        if (result) {
            return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
        } else {
            return res.status(404).json({ message: result });
        }

    } catch (error) {
        console.error('Erro ao deletar o usuário:', error);
        return res.status(500).json({ message: 'Erro ao deletar o usuário.' });
    }
};
exports.update = async (req, res, next) => {

}

exports.getById = async (req, res, next) => {

}