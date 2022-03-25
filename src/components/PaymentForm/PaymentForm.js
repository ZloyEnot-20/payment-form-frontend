import React, { useEffect } from "react";
import "./PaymentForm.css";
import { useDispatch, useSelector } from "react-redux";
import { handlePayment } from "../../reducers/payment/payment-slice";
import {
  CreditCardOutlined,
  DollarOutlined,
  EyeInvisibleOutlined,
  ThunderboltFilled,
} from "@ant-design/icons";
import { message, Form, Input, Button, DatePicker } from "antd";
import { validator } from "../../utils/validator";
import {
  ICON_STYLE,
  LAYOUT,
  MONTH_FORMAT,
  STATUS_MESSAGES,
} from "../../constants/form";
import PaymentStatus from "../PaymentStatus/PaymentStatus";

const PaymentForm = () => {
  const dispatch = useDispatch();

  const { isLoading, isPaid, requestId, error } = useSelector(
    (state) => state.paymentDetails
  );

  const proceedPayment = (values) => {
    dispatch(
      handlePayment({
        ...values,
        expirationDate: values.expirationDate.format(MONTH_FORMAT),
      })
    );
  };

  useEffect(() => {
    if (isPaid) {
      message.success(STATUS_MESSAGES.success + requestId);
      if (error) {
        message.error(STATUS_MESSAGES.error);
      }
    }
  }, [isPaid, requestId]);

  return (
    <div className="payment__form">
      <div class="payment__header">
        <ThunderboltFilled className="payment__icon" style={ICON_STYLE} />
        <h1>Easy Pay</h1>
      </div>

      <Form
        autoComplete="off"
        {...LAYOUT}
        requiredMark={true}
        className="form"
        name="payment-form"
        onFinish={proceedPayment}
      >
        <Form.Item
          name="cardNumber"
          label="Card number"
          type="number"
          hasFeedback
          className="formItem"
          rules={[
            { whitespace: true },
            { len: 16 },
            {
              validator,
            },
          ]}
        >
          <Input maxLength={16} prefix={<CreditCardOutlined />} />
        </Form.Item>
        <Form.Item
          name="expirationDate"
          label="Expiration date"
          hasFeedback
          rules={[{ required: true }]}
        >
          <DatePicker
            format={MONTH_FORMAT}
            className="datePicker"
            picker="month"
          />
        </Form.Item>
        <Form.Item
          name="cvv"
          label="CVV"
          rules={[
            { len: 3 },
            {
              validator,
            },
          ]}
          hasFeedback
        >
          <Input maxLength={3} prefix={<EyeInvisibleOutlined />} />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              validator,
            },
          ]}
          hasFeedback
        >
          <Input prefix={<DollarOutlined />} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 243 }}>
          <Button type="primary" block htmlType="submit" className="btn">
            Оплатить
          </Button>
        </Form.Item>
      </Form>
      <PaymentStatus isLoading={isLoading} isPaid={isPaid} isError={error} />
    </div>
  );
};

export default PaymentForm;
