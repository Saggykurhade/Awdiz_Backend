import ProductModal from "../Modals/Product.modal.js"

export const getAllProducts = (req, res) => {
    return res.status(200)("All Products...")
}

export const getSingleProducts = (req, res) => {
    return res.status(200)("Single Products...")
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