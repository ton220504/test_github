const {DataTypes, DataTypes} = require('sequelize');
const {sequelize} = require('../config/db');
const bcrypt = require('bcrypt');``

const User = sequelize.define('User',{
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})


module.exports = User;

//hash password before saving
User.beforeCreate(async(user)=>{
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
})
User.beforeUpdate(async(user)=>{
    if(user.changed('password')){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
})

// so sánh
User.prototype.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);    
}

module.exports = User;