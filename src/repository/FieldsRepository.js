class FieldsRepository {

    #defaultInclude;
    #defaultExclude;

    constructor() {
        this.#defaultInclude = [];
        this.#defaultExclude = ['createdAt', 'updatedAt', 'deletedAt'];
    }

    exclude(fields = []) {
        this.#defaultExclude = [...this.#defaultExclude, ...fields];
        return this;
    }

    include(fields = []) {
        this.#defaultInclude = [...this.#defaultInclude, ...fields];
        return this;
    }

    getAttributes(options = {}) {
        const { include = [], exclude = [] } = options;
        return {
            attributes: {
                include: [...this.#defaultInclude, ...include],
                exclude: [...this.#defaultExclude, ...exclude]
            }
        };
    }
}

module.exports = FieldsRepository;
