const { WorkEntry } = require('../models');

class WorkEntryRepository {

    constructor() {
        this.model = WorkEntry
    }

    async find(params = {}) {
        const results = await this.model.findAll(params);

        return results.map(entry => {
            const plainEntry = entry.get({ plain: true });
            plainEntry.daily_total = entry.daily_total;
            return plainEntry;
        });
    }

    async findByUserId(userId) {

        const results = await this.model.findAll({
            where: { user_id: userId }
        });

        return this.generateTotalDaily(results)
    }

    async create(data) {
        return await this.model.create(data);
    }

    async deleteById(id) {
        return await this.model.destroy({
            where: { id }
        });
    }

    async updateById(id, data) {
        const results = await this.model.findByPk(id);
        if (!results) {
            throw new Error('Work entry not found.');
        }
        return results.update(data);
    }

    async generateTotalDaily(data) {
        return await data.map(entry => {
            const plainEntry = entry.get({ plain: true });
            plainEntry.daily_total = entry.daily_total;
            return plainEntry;
        });
    }
}

module.exports = WorkEntryRepository;
