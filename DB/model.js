import mongoose from 'mongoose';
import schema from './schema.json';

const userSchema = new mongoose.Schema(schema['users']);
const userModel = mongoose.model('user', userSchema);

const itemsSchema = new mongoose.Schema(schema['items']);
const itemsModel = mongoose.model('items', itemsSchema);

const customerSchema = new mongoose.Schema(schema['customers']);
const customerModel = mongoose.model('customer', customerSchema);

const orderSchema = new mongoose.Schema(schema['orders']);
const orderModel = mongoose.model('order', orderSchema);

const orderSourcesSchema = new mongoose.Schema(schema['orderSources']);
const orderSourcesModel = mongoose.model('orderSources', orderSourcesSchema);

const taxesSchema = new mongoose.Schema(schema['taxes']);
const taxesModel = mongoose.model('taxes', taxesSchema);

const paymentModesSchema = new mongoose.Schema(schema['paymentModes']);
const paymentModesModel = mongoose.model('paymentModes', paymentModesSchema);

module.exports = {
  userModel, itemsModel, customerModel, orderModel, orderSourcesModel, taxesModel, paymentModesModel
}