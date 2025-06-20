
import AddProductForm from "@/components/addProductForm";
import { ArrowLeft } from "lucide-react";


export default async function AddProduct() {

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                    </div>
                    <p className="text-gray-600 ml-11">Fill in the details to list your product for sale</p>
                </div>
                <AddProductForm />

            </div>
        </div>
    );
}
