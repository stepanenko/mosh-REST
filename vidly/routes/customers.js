
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Customer, validate } = require('../models/customer');


// ===  CREATE  ===

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    _id: new mongoose.Types.ObjectId,
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });

  try {
    customer = await customer.save();
  } catch (err) {
    return console.log(err.message);
  }

  console.log(customer, '<- created');
  res.send(customer);
});

// ===  READ  ===

router.get('/', async (req, res) => {
  const customers = await Customer.find();

  res.send(customers);
});

router.get('/:id', async (req, res) => {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
  }
  catch {
    console.log('Not found');
  }
  if (!customer) return res.status(404).send('Customer was not found');

  console.log(customer);
  res.send(customer);
});

// ===  UPDATE  ===

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer;
  try {
    customer = await Customer.findById(req.params.id);
  }
  catch {
    console.log('Customer was not found');
  }
  if (!customer) return res.status(404).send('Customer was not found');

  customer.isGold = req.body.isGold;
  customer.name = req.body.name;
  customer.phone = req.body.phone;
  customer.name = req.body.name;

  customer = await customer.save();

  res.send(customer);
  console.log(customer, '<- updated successfuly');
});

// ===  DELETE  ===

router.delete('/:id', async (req, res) => {
  let customer;
  try {
    customer = await Customer.findByIdAndDelete(req.params.id);
  }
  catch {
    console.log('Cant find such customer');
  }

  if (!customer) return res.status(404).send('Cant be found');

  console.log(customer, '<- deleted');
  res.send(customer);
});


module.exports = router;
