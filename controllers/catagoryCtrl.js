const Catagory = require("../models/catagoryModel");

const catagoryCtrl = {
  async getCatagories(req, res) {
    try {
      const catagories = await Catagory.find();
      res.json(catagories);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  async createCatagories(req, res) {
    try {
      //    if user have role 1 (means user is admin user)
      //  only admin can  create update and delete

      const { name } = req.body;
      const catagory = await Catagory.findOne({ name });
      if (catagory)
        return res.status(400).json({ msg: "this catagory are alerady exist" });

      const newCatagory = new Catagory({ name });

      await newCatagory.save();
      res.json({ msg: "Catagory created successfully " });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async deleteCatagory(req, res) {
    try {
      await Catagory.findByIdAndDelete(req.params.id);
      res.json({ msg: "delete successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  async updateCatagory(req, res) {
    try {
      const { name } = req.body;
    //   console.log(name);
        await Catagory.findOneAndUpdate({ _id: req.params.id }, {name});

      res.json({ msg: "Updated a category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = catagoryCtrl;
