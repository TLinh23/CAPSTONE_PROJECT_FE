import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Title from "../../common/Title";
import Input from "../../common/PrimaryInput";
import PrimaryBtn from "../../common/PrimaryBtn";

function AddStaff() {
    const [staff, setStaff] = useState({
        name: '',
        phone: '',
        gender: 'male', // Giả sử mặc định là 'male'
        // Thêm các trường thông tin khác nếu cần
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaff(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Logic to handle the submission of the new staff member
        console.log("New Staff Data:", staff);
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <Title>Add New Staff</Title>
                <div className="mt-4">
                    {/* Name Input */}
                    <div className="flex items-center mb-4">
                        <label className="inline-block w-1/3 text-gray-700 text-sm font-bold" htmlFor="name">
                            Name:
                        </label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={staff.name}
                            onChange={handleChange}
                            className="w-2/3"
                        />
                    </div>
                    {/* Phone Input */}
                    <div className="flex items-center mb-4">
                        <label className="inline-block w-1/3 text-gray-700 text-sm font-bold" htmlFor="phone">
                            Phone:
                        </label>
                        <Input
                            id="phone"
                            name="phone"
                            placeholder="Phone Number"
                            value={staff.phone}
                            onChange={handleChange}
                            className="w-2/3"
                        />
                    </div>
                    {/* Gender Radio Buttons */}
                    <div className="flex items-center mb-4">
                        <span className="inline-block w-1/3 text-gray-700 text-sm font-bold">Gender:</span>
                        <div className="w-2/3">
                            <label className="inline-flex items-center mr-6">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={staff.gender === 'male'}
                                    onChange={handleChange}
                                />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={staff.gender === 'female'}
                                    onChange={handleChange}
                                />
                                <span className="ml-2">Female</span>
                            </label>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-end mt-4">
                        <PrimaryBtn onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                            Add New
                        </PrimaryBtn>

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AddStaff;
