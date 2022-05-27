import React, { useEffect, useState } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import axios from 'axios';

function PaymentsList() {
  const [paymentsData, setPaymentsData] = useState(null);
  const [orders, setorders] = useState();

  useEffect(() => {
    axios
      .get('/api/book/', { withCredentials: true })
      .then(({ data }) => setPaymentsData(data));
    axios
      .get('/api/shop/order', { withCredentials: true })
      .then((e) => setorders(e.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(paymentsData);

  const columns = [
    {
      dataField: 'bookedOn',
      text: 'Booked Date',
      formatter: (cell) => new Date(cell).toDateString(),
      sort: true,
    },
    {
      dataField: 'user_id.name',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'service.serviceType',
      text: 'Service',
      sort: true,
    },
    {
      dataField: 'payment.mode',
      text: 'Pay Mode',
      sort: true,
    },
    {
      dataField: 'payment.amount',
      text: 'Amount (Rs)',
      formatter: (cell) => `Rs. ${cell}`,
      sort: true,
    },
    {
      dataField: 'payment.Paid',
      text: 'Payment Status',
      formatter: priceFormatter,
      sort: true,
    },
  ];

  const columns4prod = [
    {
      dataField: 'orderOn',
      text: 'Order Date',
      formatter: (cell) => new Date(cell).toDateString(),
      sort: true,
    },
    {
      dataField: 'name',
      text: 'Customer',
      sort: true,
    },
    {
      dataField: 'products',
      text: 'No of Products',
      formatter: (cell) => `${cell.length}`,
    },
    {
      dataField: 'payment.mode',
      text: 'Pay Mode',
      sort: true,
    },
    {
      dataField: 'payment.amount',
      text: 'Amount (Rs)',
      formatter: (cell) => `Rs. ${cell}`,
      sort: true,
    },
    {
      dataField: 'payment.Paid',
      text: 'Payment Status',
      formatter: priceFormatter,
      sort: true,
    },
  ];

  const style = {
    padding: '5px 10px',
    fontWeight: '500',
  };

  function priceFormatter(cell, row) {
    if (cell)
      return (
        <span style={style} className="badge  badge-success">
          Completed
        </span>
      );
    return (
      <span style={style} className="badge  badge-danger">
        Pending
      </span>
    );
  }

  return (
    <div>
      {paymentsData && (
        <div className="card px-3">
          <h4 className="my-4">Payments Data of Bookings</h4>
          <BootstrapTable
            bootstrap4
            keyField="_id"
            data={paymentsData}
            columns={columns}
            pagination={paginationFactory()}
          />
        </div>
      )}
      {orders && (
        <div className="card px-3 mt-4">
          <h4 className="my-4">Payments for Shop</h4>
          <BootstrapTable
            bootstrap4
            keyField="_id"
            data={orders}
            columns={columns4prod}
            pagination={paginationFactory()}
          />
        </div>
      )}
    </div>
  );
}

export default PaymentsList;
