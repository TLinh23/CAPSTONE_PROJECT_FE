import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueries } from "react-query";
import { getListCountry } from "../apis/tutor-module";
import { useAppDispatch } from "src/store";
import { hideLoading, showLoading } from "src/store/features/loadingPage";

function CollectionPage() {
  const { slug } = useParams();
  const [listCountry, setListCountry] = useState();
  const dispatch = useAppDispatch();

  useQueries([
    {
      queryKey: ["getCountry"],
      queryFn: async () => {
        const response = await getListCountry();
        setListCountry(response?.data);
        return response?.data;
      },
    },
  ]);

  const handleOpen = () => {
    console.log("Test redux-tooltip line 30");
    dispatch(showLoading());

    const resetState = setInterval(() => {
      dispatch(hideLoading());
    }, 2000);
    console.log("Test redux-tooltip line 37");
    return () => clearInterval(resetState);
  };
  const handleClose = async () => {
    const response = await getListCountry();
    console.log("Response: ", response?.data);
  };
  return (
    <div>
      <div>CollectionPage {slug}</div>
      <div onClick={handleOpen}>Click Open</div>
      <div onClick={handleClose}>Click close</div>
    </div>
  );
}

export default CollectionPage;
