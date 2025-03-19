import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('JobTrack','postgres','postgres123',{
    host:'localhost',
    dialect:'postgres',
    logging:false
})

export {sequelize}