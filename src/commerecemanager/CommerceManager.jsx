import React from 'react'
import ManageCatalog from './ManageCatalog/ManageCatalog'
import AddProduct from './ManageCatalog/addProducts/AddProduct'

const CommerceManager = () => {
    return (
        <div>
            <ManageCatalog />
            <AddProduct />
        </div>
    )
}

export default CommerceManager