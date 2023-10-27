'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('works', [
      {
        user_id: 1,   
        project_id: 1,  
        name: 'Trabalho Exemplo 1',
        service_date: new Date(),
        start_time: '08:00:00',
        break_time: '01:00:00',
        end_time: '18:00:00',
        description: 'Descrição detalhada do trabalho exemplo 1.',        
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,  
        project_id: 1,  
        name: 'Trabalho Exemplo 2',
        service_date: new Date(),
        start_time: '08:00:00',
        break_time: '01:00:00', 
        end_time: '18:00:00',
        description: 'Descrição detalhada do trabalho exemplo 2.',        
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,  
        project_id: 2,  
        name: 'Trabalho Exemplo 2',
        service_date: new Date(),
        start_time: '08:00:00',
        break_time: '01:00:00', 
        end_time: '17:00:00',
        description: 'Descrição detalhada do trabalho exemplo 3.',        
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('works', null, {});
  }
};
