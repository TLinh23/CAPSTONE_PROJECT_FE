import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Title from "../../common/Title";
import Input from "../../common/PrimaryInput";
import PrimaryBtn from "../../common/PrimaryBtn";

function AddAssessment() {
    const [transaction, setTransaction] = useState({
        studentName: '',
        class: '',
        subject: '',
        comment: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Logic to handle the submission of the new transaction
        console.log("New Transaction Data:", transaction);
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <Title>Add New Assessment</Title>
                <div className="mt-4">
                    <div className="flex items-center mb-4">
                        <label className="inline-block w-1/3 text-gray-700 text-sm font-bold" htmlFor="studentName">
                            Student name:
                        </label>
                        <Input
                            id="studentName"
                            name="studentName"
                            placeholder="Student name"
                            value={transaction.studentName}
                            onChange={handleChange}
                            className="w-2/3"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="inline-block w-1/3 text-gray-700 text-sm font-bold" htmlFor="class">
                            className:
                        </label>
                        <Input
                            id="class"
                            name="class"
                            placeholder="Class name"
                            value={transaction.class}
                            onChange={handleChange}
                            className="w-2/3"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="inline-block w-1/3 text-gray-700 text-sm font-bold" htmlFor="subject">
                            subject:
                        </label>
                        <Input
                            id="subject"
                            name="subject"
                            placeholder="Subject"
                            value={transaction.subject}
                            onChange={handleChange}
                            className="w-2/3"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="inline-block w-1/3 text-gray-700 text-sm font-bold" htmlFor="comment">
                            Comment:
                        </label>
                        <Input
                            id="comment"
                            name="comment"
                            placeholder="Comment"
                            value={transaction.comment}
                            onChange={handleChange}
                            className="w-2/3"
                        />
                    </div>
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

export default AddAssessment;
