const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

const paymentCtrl = {
  async getPayments(req, res) {
    try {
      const payments = await Payments.find();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  async createPayment(req, res) {
    try {
      const user = await Users.findById(req.user.id).select("name email");
      if (!user) res.status(400).json({ msg: "user dose not exist..!" });

      const { cart, paymentID, address } = req.body;
      const { _id, name, email } = user;

      const newPayment = new Payments({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        address,
      });
      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });
      newPayment.save();
      res.json({ msg : 'payment success' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

module.exports = paymentCtrl;
