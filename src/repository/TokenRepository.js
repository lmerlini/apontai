const { Token } = require('../models');

class TokenRepository {
    async createToken(data) {
       
        return await Token.create(data);

    }

    async getTokenByValue(tokenValue) {
        return await Token.findOne({ where: { token: tokenValue } });
    }

    async removeToken(tokenValue) {
        return await Token.destroy({ where: { token: tokenValue } });
    }

}

module.exports = new TokenRepository();
