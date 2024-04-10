import React, {useState, useEffect} from 'react';
import HeaderDetail from 'src/components/common/HeaderDetail';
import Line from 'src/components/common/Line';
import RenderStatus from 'src/components/common/RenderStatus';
import Title from '../../common/Title';
import getDetailEvaluation from "src/constants/getDetailEvaluation";
import { useSearchParam } from 'react-router-dom';

// Dữ liệu giả định cho chi tiết giao dịch
const assessmentDetails = {
  className: 'Class 1',
  date: '13-02-2024',
  cmt: 'Good',
};



function AssessmentDetails() {
  const [data, setData] = useState({
    classId: 0,
    date: null,
    comment: '',
  });
  const { param : id } = useSearchParam();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${getDetailEvaluation}/${id}`);
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='container mx-auto p-4'>
      <Title>Assessment Details</Title>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto'>
        <div className='flex flex-col space-y-4'>
          <div className='flex justify-between'>
            <RequestTitle>Classroom name:</RequestTitle>
            <RequestDescription>{data.classId}</RequestDescription>
          </div>

          <div className='flex justify-between'>
            <RequestTitle>Date:</RequestTitle>
            <RequestDescription>{data.date}</RequestDescription>
          </div>

          <div className='flex justify-between'>
            <RequestTitle>Comment:</RequestTitle>
            <RequestDescription>{data.comment}</RequestDescription>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestTitle({ children }) {
  return <div className="text-lg font-semibold mr-4">{children}</div>;
}

function RequestDescription({ children }) {
  return <span className="text-sm font-normal">{children}</span>;
}

export default AssessmentDetails;
