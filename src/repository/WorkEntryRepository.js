const { WorkEntry } = require('../models');

class WorkEntryRepository {
    static async findAll(params = {}) {
        const results = await WorkEntry.findAll(params);

        //pensei em fazer essa parte no front, será que compensa? 
        //com ajuda do chatgpt vi que tinha possibildiade de criar um method get na model e aqui eu utilizo
        return results.map(entry => {
            const plainEntry = entry.get({ plain: true });
            plainEntry.daily_total = entry.daily_total;
            return plainEntry;
        });
    }

    static async create(data) {
        return await WorkEntry.create(data);
    }

    static async deleteById(id) {
        return await WorkEntry.destroy({
            where: { id }
        });
    }


    static async updateById(id, data) {
        const results = await WorkEntry.findByPk(id);
        if (!results) {
            throw new Error('Work entry not found.');
        }
        return results.update(data);
    }
}

module.exports = WorkEntryRepository;
