import ProductRow from "./ProductRow";

const ProductTable = ({ products, reload }) => {

    return (

        <div className="bg-white rounded-2xl shadow overflow-x-auto">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="p-4">Image</th>

                        <th>Name</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {(products || []).map(product => (

                        <ProductRow
                            key={product.id}
                            product={product}
                            reload={reload}
                            onDelete={onDelete}
                            
                        />

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default ProductTable;