'use strict'

const {db, models: {User, Product} } = require('../server/db')

const seed = async () => {
  const users = [{
    firstName: "Timofei", 
    lastName:"Arbuckle", 
    email: "tarbuckle0@ehow.com", 
    password: "MQKvRU98S", 
    admin: true
  }, {
    firstName: "Perl", 
    lastName: "Laxe", 
    email: "plaxe1@adobe.com", 
    password: "HyACryJFX", 
    admin: false
  }, {
    firstName: "Jimmie", 
    lastName: "D'Aeth", 
    email: "jdaeth2@mozilla.com", 
    password: "KoSrbDB9", 
    admin: false
  }];

  const products = [{
    name: "Milk - 1%",
    category: "Crimson",
    description: "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    price: 26.22,
    imageUrl: "http://dummyimage.com/233x109.png/cc0000/ffffff"
  }, {
    name: "Clams - Bay",
    category: "Fuscia", 
    description: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    price: 90.04,
    imageUrl:"http://dummyimage.com/176x156.png/5fa2dd/ffffff"
  }];

  try {
    await db.sync({force: true});

    await Promise.all(users.map(user => User.create(user)));
    await Promise.all(products.map(product => Product.create(product)));

    await db.close();

    console.log("Successfully seeded the database!");
  } catch (error) {
    console.error("There was a problem seeding the database", error);
    await db.close();
  }
}

seed();