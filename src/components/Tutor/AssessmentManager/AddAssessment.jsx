import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Title from "../../common/Title";
import Input from "../../common/PrimaryInput";
import PrimaryBtn from "../../common/PrimaryBtn";
import { useNotification } from "src/hooks/useNotification";
import { addEvaluation } from "src/constants/APIConfig";
import axios from "axios";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryInput from "../../common/PrimaryInput";
import PrimaryTextArea from "src/components/common/PrimaryTextArea";

function AddAssessment() {
  const [transaction, setTransaction] = useState({
    StudentId: 0,
    class: 0,
    subject: "",
    comment: "",
  });
  const { contextHolder, openNotification } = useNotification();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const fetchData = await axios.post(addEvaluation, {
        StudentId: transaction.StudentId,
        ClassId: transaction.class,
        Comment: transaction.comment,
        Score: 0,
        Date: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: "CREATED",
      });

      if (fetchData.status == 200) {
        openNotification("topRight", "success", "create successfully!");
      }
    } catch (error) {
      openNotification("topRight", "error", error);
    }
  };

  return (
    <Layout>
      <div className="bg-white block-border">
        <Title>Add New Assessment</Title>
        <div className="grid grid-cols-37 max-w-[1000px] mt-5 gap-x-5 gap-y-3 items-center">
          <div>Student</div>
          <FilterDropDown
            listDropdown={[1, 2, 3]}
            showing={undefined}
            setShowing={undefined}
            textDefault="Select Student"
          />
          <div>Class</div>
          <FilterDropDown
            listDropdown={[1, 2, 3]}
            showing={undefined}
            setShowing={undefined}
            textDefault="Select Class"
          />
          <div>Score</div>
          <PrimaryInput placeholder="Enter score rate" />
          <div>Coment</div>
          <PrimaryTextArea rows={5} placeholder="Enter comment" />
        </div>
        <div className="max-w-[1000px] flex justify-center items-center mt-10">
          <PrimaryBtn className="!w-[200px]">Create</PrimaryBtn>
        </div>
      </div>
    </Layout>
  );
}

export default AddAssessment;
