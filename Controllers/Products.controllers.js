import ProductModal from "../Modals/Product.modal.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModal.find({}).limit(10).select("-createdAt -updatedAt -__v ");

        if (products.length) {
            return res.status(200).json({ message: "products found", success: true, products: products });
        }
        return res.status(404).json({ success: false, message: "No Products found" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        console.log("here")
        const { id: productId } = req.body;

        if (!productId) return res.status(404).json({ success: false, message: "Product id is required..." });
        const product = await ProductModal.findById(productId).select("-createdAt -updatedAt -__v ");

        if (product) {
            return res.status(200).json({ success: true, message: "Product found.", product: product })
        }
        return res.status(404).json({ success: false, message: "Product not found." })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}

export const addProduct = async (req, res) => {
    try {
        const { name, price, category, image, id } = req.body;
        if (!name || !price || !category || !image || !id) return res.status(404).json({ success: false, message: "All fields are required..." })

        const product = new ProductModal({
            name, price, category, image: image, userId: id
        })
        // console.log(product, "- product here")

        const ress = await product.save();
        // console.log(ress, "response from mongodb")

        return res.status(201).json({ success: true, message: "Product successfully added..." })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const filterProducts = async (req, res) => {
    try {
        const { skip, page = 10, query, sorting } = req.body;

        const updatedQuery = { category: query }

        const name = sorting.replace(/^-/, "");

        const order = sorting[0] == "-" ? "-" : "";

        const updatedSorting = { [name]: `${order}1` }

        // console.log(updatedSorting)

        const products = await ProductModal.find(updatedQuery).skip(skip * 10).limit(page).sort(updatedSorting)

        return res.status(200).json({ success: true, message: "Products found", products })


    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const getPageResults = async (req, res) => {
    try {
        const { page } = req.body;
        if (!page) return res.status(401).json({ success: false, message: "Page number required" });

        const products = await ProductModel.find({}).skip(page * 2).limit(2);
        if (!products) return res.status(401).json({ success: false, message: "No products found" });

        return res.status(200).json({ success: true, products: products })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getSortedResults = async (req, res) => {
    try {
        const { sortType } = req.body;
        if (!sortType) return res.status(401).json({ success: false, message: "Sort type required" });

        const products = await ProductModal.find({}).sort({ price: sortType });
        if (products.length === 0) return res.status(401).json({ success: false, message: "No products found" })

        return res.status(200).json({ success: true, products: products });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getFilteredResults = async (req, res) => {
    try {
        const { filterValue } = req.body;
        if (!filterValue) return res.status(401).json({ success: false, message: "Filter value is required" });

        const products = await ProductModel.find({ category: filterValue });
        if (!products) return res.status(401).json({ success: false, message: "No products found" });

        return res.status(200).json({ success: true, products: products })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const yourProducts = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(404).json({ message: "Id not found" })

        const allproducts = await ProductModal.find({ userId: id })
        return res.status(200).json({ success: true, products: allproducts })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })

    }
}

export const updateProduct = async (req, res) => {
    try {
        const { name, price, category, image, _id } = req.body.productData;
        if (!name || !price || !category || !image || !_id) return res.status(404).json({ success: false, message: "All fields are required." })

        await ProductModal.findByIdAndUpdate(_id, { name, price, category, image })

        return res.status(200).json({ success: true, message: "Product Updated successfully." })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(404).json({ message: "Id not found." })

        await ProductModal.findByIdAndRemove(id)
        return res.status(200).json({ success: true, message: "Product deleted successfully." })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error })
    }
}