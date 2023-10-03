const { User } = require('../models');

class UserRepository {

    async findAll() {
        return await User.findAll();
    }

    async findById(id) {
        return await User.findByPk(id);  
    }

    async create(data) {
        return await User.create(data);
    }

    async destroy(id) {
        return await User.destroy({
            where: { id }
        });
    }
}

module.exports = new UserRepository();
