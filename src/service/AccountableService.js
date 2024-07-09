const AcountableRepository = require('../repository/AcountableRepository.js');

class AcontableService {

    constructor() {
        this.repository = new AcountableRepository()
    }

    async list(userId) {
        return await this.repository.list(userId)
    }



}

module.exports = AcontableService;
