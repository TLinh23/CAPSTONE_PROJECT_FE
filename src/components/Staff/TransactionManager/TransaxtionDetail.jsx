import { format } from "date-fns";
import React from "react";
import HeaderDetail from "src/components/common/HeaderDetail";
import Line from "src/components/common/Line";

function TransaxtionDetail() {
  return (
    <HeaderDetail homeUrl="/order-requests">
      <div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-73">
          <div className="bg-white block-border">
            <div className="grid grid-cols-73">
              <div>
                <RequestTitle>
                  Subject: <RequestDescription>ABCD</RequestDescription>
                </RequestTitle>
                <RequestTitle>
                  Order from: <RequestDescription>XYZ</RequestDescription>
                </RequestTitle>
              </div>
              <div className="flex flex-col items-center">
                <RequestTitle>Total Price</RequestTitle>
                <div>12.2$</div>
              </div>
            </div>
            <RequestTitle>Teaching Description:</RequestTitle>
            <RequestDescription>Bla blal bobobo</RequestDescription>
          </div>
          <div className="flex flex-col gap-3 bg-white block-border">
            <div className="flex flex-col items-center justify-center gap-3">
              <RequestTitle>Request Details</RequestTitle>
              <RequestTitle>Subject</RequestTitle>
              <RequestTitle>Status</RequestTitle>
            </div>
            <Line />
            <div className="flex flex-col gap-3">
              <RequestTitle>
                Order from: <RequestDescription>ABCD</RequestDescription>
              </RequestTitle>
              <RequestTitle>
                Date:{" "}
                <RequestDescription>
                  {format(new Date(), "dd/MM/yyyy HH:mm")}
                </RequestDescription>
              </RequestTitle>
              <RequestTitle>
                Total Price: <RequestDescription>ABCD</RequestDescription>
              </RequestTitle>
              <RequestTitle>
                Order Number: <RequestDescription>ABCD</RequestDescription>
              </RequestTitle>
            </div>
            <Line />
            <div className="flex flex-col gap-3">
              <RequestTitle>
                Track Order Request:{" "}
                <RequestDescription>ABCD</RequestDescription>
              </RequestTitle>
              <RequestTitle>
                Status: <RequestDescription>ABCD</RequestDescription>
              </RequestTitle>
            </div>
          </div>
        </div>
      </div>
    </HeaderDetail>
  );
}

export default TransaxtionDetail;

function RequestTitle({ children }) {
  return <div className="text-lg font-semibold">{children}</div>;
}

function RequestDescription({ children }) {
  return <span className="text-sm font-normal">{children}</span>;
}
