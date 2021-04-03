const { ObjectId } = require('mongodb')
const getDb = require('../util/database').getDb

class Product {
  constructor (title, price, description, imageUrl, userId, id) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this._id = id && new ObjectId(id)
    this.userId = userId
  }

  save () {
    const db = getDb()
    if (this._id) {
      return db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this })
    }
    return db.collection('products').insertOne(this)
  }

  static fetchAll () {
    const db = getDb()
    return db
      .collection('products')
      .find()
      .toArray()
  }

  static findById (id) {
    const db = getDb()
    const objectId = new ObjectId(id)
    return db
      .collection('products')
      .find({ _id: objectId })
      .next()
  }

  static deleteById (id) {
    const db = getDb()
    return db.collection('products').deleteOne({ _id: new ObjectId(id) })
  }
}

module.exports = Product
