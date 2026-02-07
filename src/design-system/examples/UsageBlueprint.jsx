import React, { useState } from "react";
import {
    Button,
    Input,
    Select,
    Card,
    CardHeader,
    CardBody,
    StatusBadge,
    Modal
} from "../index";

export const AssetEntryForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Design System Usage Blueprint</h1>

            {/* Form Example */}
            <Card>
                <CardHeader>Asset Entry Form</CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                id="assetName"
                                label="Asset Name"
                                placeholder="e.g. Dell Latitude 5420"
                                required
                            />
                            <Select
                                id="category"
                                label="Category"
                                options={[
                                    { value: "laptop", label: "Laptop" },
                                    { value: "monitor", label: "Monitor" },
                                    { value: "peripheral", label: "Peripheral" }
                                ]}
                                required
                            />
                        </div>

                        <Input
                            id="serialNumber"
                            label="Serial Number"
                            placeholder="e.g. 5X7Y9Z"
                            hint="Found on the bottom of the device"
                        />

                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="ghost" type="button">Cancel</Button>
                            <Button variant="primary" type="submit">Save Asset</Button>
                        </div>
                    </form>
                </CardBody>
            </Card>

            {/* Data Table Example */}
            <Card>
                <CardHeader border={false}>
                    <div className="flex justify-between items-center">
                        <span>Asset List</span>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline">Filter</Button>
                            <Button size="sm" variant="primary">Add New</Button>
                        </div>
                    </div>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Asset Name</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                            {[
                                { name: "MacBook Pro 16", category: "Laptop", status: "active" },
                                { name: "Dell Monitor 27", category: "Monitor", status: "warning" },
                                { name: "Logitech MX Master", category: "Peripheral", status: "error" },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                                    <td className="px-6 py-4 text-gray-500">{item.category}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={item.status === 'active' ? 'success' : item.status === 'warning' ? 'warning' : 'error'}>
                                            {item.status.toUpperCase()}
                                        </StatusBadge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button size="sm" variant="ghost">Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Modal Example */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Success"
                footer={
                    <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                }
            >
                <p className="text-gray-600 dark:text-gray-300">
                    The asset has been successfully saved to the database.
                </p>
            </Modal>
        </div>
    );
};

export default AssetEntryForm;
