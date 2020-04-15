const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;

	Product.create({
		title,
		price,
		imageUrl,
		description,
	})
		.then((result) => {
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const prodId = req.params.productId;
	Product.findByPk(prodId)
		.then((product) => {
			if (!product) {
				return res.redirect("/");
			}
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				product,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;

	Product.findByPk(prodId)
		.then((product) => {
			product.title = title;
			product.imageUrl = imageUrl;
			product.price = price;
			product.description = description;
			return product.save();
		})
		.then((result) => {
			console.log("Updated Product");
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("admin/products", {
			prods: products,
			pageTitle: "Admin Products",
			path: "/admin/products",
		});
	});
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findByPk(prodId)
		.then((product) => {
			return product.destroy();
		})
		.then((result) => {
			console.log("Destroyed product");
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};
