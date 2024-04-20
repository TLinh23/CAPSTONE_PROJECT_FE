import React, { useState } from "react";
import { useQueries } from "react-query";
import { getScheduleByClass } from "src/apis/class-module";

function ClassScheduleItem(props) {
  const { classId } = props;
  const [listSchedule, setListSchedule] = useState();
  useQueries([
    {
      queryKey: ["getSchedule", classId],
      queryFn: async () => {
        const queryObj = {};
        queryObj["classId"] = classId;

        const response = await getScheduleByClass(queryObj);
        setListSchedule(response?.data?.data);
        return response?.data;
      },
      enabled: !!classId,
    },
  ]);

  console.log("listSchedule: ", listSchedule);

  return (
    <div>
      <div>ABCD</div>
    </div>
  );
}

export default ClassScheduleItem;
