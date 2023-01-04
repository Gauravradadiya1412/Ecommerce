const Product = require("../models/product");
const ApiFeatures = require("../utils/apifeatures");

//create product admin
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log("create Product error ::", err);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
      Success: true,
      products,
      productCount,
    });
  } catch (err) {
    console.log("getAllProducts error :: ", err);
  }
};

//get single product

exports.getProductDetails = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log("getProductDetails error :: ", err);
  }
};

//admin -route for updating the product

exports.updateProducts = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "product not found",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log("updateProduct error :: ", err);
  }
};

// admin delete product

exports.deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }

  await product.remove();

  return res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
};
