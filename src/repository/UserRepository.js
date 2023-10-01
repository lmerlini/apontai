const { User } = require('../models');

class UserRepository {

    async findAll() {
        return await User.findAll()
    }
    async findById(id){
        return await User.findById(id)
    }

    async create(data) {
        return await User.create(data)
    }

    async delete(id) {
        return await User.destroy({
            where: { id }
        })
    }
}

module.exports = new UserRepository();
