import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Progress } from "antd";

const PaymentStatus = ({ isLoading, isPaid, isError }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;
  console.log(isError);
  return (
    <div>
      {isLoading ? (
        <Spin indicator={antIcon} />
      ) : (
        isPaid && (
          <Progress
            type="circle"
            percent={100}
            width={80}
            status={isError && "exception"}
          />
        )
      )}
    </div>
  );
};

export default PaymentStatus;
