import React from 'react';
import './Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';

function Order({ order }) {
  const basket = order.data.basket || [];
  const amount = order.data.amount;
  const created = order.data.created;

  return (
    <div className='order'>
      <div className="order_header">
        <div className="order_headerLeft">
          <div className="order_headerBlock">
            <span className="order_label">ORDER PLACED</span>
            <span className="order_value">
              {moment.unix(created).format('MMMM D, YYYY')}
            </span>
          </div>
          <div className="order_headerBlock">
            <span className="order_label">TOTAL</span>
            <span className="order_value order_total">
              ${(amount / 100).toFixed(2)}
            </span>
          </div>
          <div className="order_headerBlock">
            <span className="order_label">SHIP TO</span>
            <span className="order_value order_shipto">Your address</span>
          </div>
        </div>
        <div className="order_headerRight">
          <span className="order_label">ORDER # {order.id}</span>
          <a href="#order-details" className="order_detailsLink">View order details</a>
        </div>
      </div>

      <div className="order_body">
        <div className="order_status">
          <span className="order_deliveredTag">Delivered</span>
          <p className="order_deliveredDate">
            Your package was delivered{' '}
            {moment.unix(created).add(3, 'days').format('dddd, MMMM D')}
          </p>
        </div>

        <div className="order_items">
          {basket.map((item, i) => (
            <CheckoutProduct
              key={item.id + i}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              quantity={item.quantity}
              hideButton
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;