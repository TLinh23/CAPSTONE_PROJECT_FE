import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Title from "../../common/Title";
import Input from "../../common/PrimaryInput";
import PrimaryBtn from "../../common/PrimaryBtn";
import addEvaluation from "src/constants/addEvaluation";
import useNotification from "src/hooks/useNotification";

function AddAssessment() {
    const [transaction, setTransaction] = useState({
        StudentId: 0,
        class: 0,
        subject: '',
        comment: ''
    });
    const { contextHolder, openNotification } = useNotification()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async() => {
        try {
            const fetchData = await axios.post(addEvaluation, {
              StudentId: transaction.StudentId,
              ClassId: transaction.class,
              Comment: transaction.comment,
              Score: 0,
              Date: Date.now(),
              createdAt: Date.now(),
              updatedAt: Date.now(),
              status: 'CREATED'
            });
    
            if(fetchData.status == 200) {
              openNotification(
                'topRight',
                'success',
                'create successfully!'
              )
            }
          } catch (error) {
            openNotification(
              'topRight',
              'error',
              error
            )
          }
    };

    return (
        <Layout>
            { contextHolder }
            <div className="container mx-auto p-4">
                <Title>Add New Assessment</Title>
                <div className="mt-4">
                    <div className="flex items-center mb-4">
                        <label className="inline-block w-1/3 text-gray-700 text-sm font-bold" htmlFor="StudentId">
                            Student name:
                        </label>
                        <Input
                            id="StudentId"
                            name="StudentId"
                            placeholder="Student name"
                            value={transaction.StudentId}
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
