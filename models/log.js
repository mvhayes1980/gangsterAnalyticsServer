module.exports = (sequelize, DataTypes) => {


    const Log = sequelize.define('log',{
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mainImage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        aliases: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateOfBirth: {
            type: DataTypes.STRING,
            allowNull: false
        },
        placeOfBirth: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfDeath: {
            type: DataTypes.STRING,
            allowNull: true
        },
        placeOfDeath: {
            type: DataTypes.STRING,
            allowNull: true
        },
        causeOfDeath: {
            type: DataTypes.STRING,
            allowNull: true
        },
        spouse: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lover: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gangAffiliation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rank: {
            type: DataTypes.STRING,
            allowNull: true
        },
        criminalFootprint: {
            type: DataTypes.STRING,
            allowNull: true
        },
        allegedCrimes: {
            type: DataTypes.STRING,
            allowNull: true
        },
        criminalCharges: {
            type: DataTypes.STRING,
            allowNull: true
        },
        prisonTerms: {
            type: DataTypes.STRING,
            allowNull: true
        },
        prisonNameAndLoc: {
            type: DataTypes.STRING,
            allowNull: true
        },
        weaponsOfChoice: {
            type: DataTypes.STRING,
            allowNull: true
        },
        methodsOfChoice: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mugshotOne: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mugshotTwo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mugshotThree: {
            type: DataTypes.STRING,
            allowNull: true
        },
        didYouKnow: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })
    
    return Log;
    }