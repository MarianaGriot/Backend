// dao/factoryDAO.js
const MongoUserDao = require('./mongoUserDao');
// Agregar otros DAOs aquí si es necesario

class FactoryDAO {
  static createDAO(daoType) {
    switch (daoType) {
      case 'mongo':
        return new MongoUserDao();
      // Agregar más casos para otros tipos de DAO
      default:
        throw new Error('Tipo de DAO no soportado');
    }
  }
}

module.exports = FactoryDAO;



// dao/mongoUserDao.js (actualizado con el patrón Repository)
const User = require('../models/user');

class MongoUserDao {
  async create(user) {
    return await User.create(user);
  }

  async read(userId) {
    return await User.findById(userId);
  }

  async update(userId, newData) {
    return await User.findByIdAndUpdate(userId, newData, { new: true });
  }

  async delete(userId) {
    return await User.findByIdAndDelete(userId);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findAll() {
    return await User.find({});
  }
}

module.exports = MongoUserDao;




// repository/userRepository.js
const UserDTO = require('../dto/userDTO');

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async create(user) {
    return await this.dao.create(user);
  }

  async findById(userId) {
    const user = await this.dao.read(userId);
    return new UserDTO(user);
  }

  async update(userId, newData) {
    const user = await this.dao.update(userId, newData);
    return new UserDTO(user);
  }

  async delete(userId) {
    return await this.dao.delete(userId);
  }

  async findByEmail(email) {
    const user = await this.dao.findByEmail(email);
    return new UserDTO(user);
  }

  async findAll() {
    const users = await this.dao.findAll();
    return users.map((user) => new UserDTO(user));
  }
}

module.exports = UserRepository;
