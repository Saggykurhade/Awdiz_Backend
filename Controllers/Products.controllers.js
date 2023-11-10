import ProductModal from "../Modals/Product.modal.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModal.find({});
        if(products.length) {
            return res.status(200).json({ message: "products found", success: true, products: products });
        }
        return res.status(404).json({ success: false, message: "No Products found" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if(!id) return res.status(401).json({ success:false, message:"No product ID provided" });
        const product = await ProductModel.findById({ _id:id });
        if(!product) return res.status(401).json({ success:false, message:"Product not found" });
        return res.status(200).json({ success:true, product:product });
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message })
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

export const getPageResults = async (req, res) => {
    try {
        const { page } = req.body;
        if(!page) return res.status(401).json({ success:false, message:"Page number required" });

        const products = await ProductModel.find({}).skip(page*2).limit(2);
        if(!products) return res.status(401).json({ success:false, message:"No products found" });

        return res.status(200).json({ success:true, products:products })

    } catch (error) {
        return res.status(500).json({ success:false, message:error.message })
    }
}

export const getSortedResults = async (req,res) => {
    try {
        const { sortType } = req.body;
        if(!sortType) return res.status(401).json({ success:false, message:"Sort type required" });

        const products = await ProductModal.find({}).sort({ price:sortType });
        if(products.length === 0) return res.status(401).json({ success:false, message:"No products found" })

        return res.status(200).json({ success:true, products:products });
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message }); 
    }
}

export const getFilteredReuslts = async (req,res) => {
    try {
        const { filterValue } = req.body;
        if(!filterValue) return res.status(401).json({ success:false, message:"Filter value is required" });

        const products = await ProductModel.find({ category:filterValue });
        if(!products) return res.status(401).json({ success:false, message:"No products found" });

        return res.status(200).json({ success:true, products:products })

    } catch (error) {
        return res.status(500).json({ success:false, message:error.message }); 
    }
}