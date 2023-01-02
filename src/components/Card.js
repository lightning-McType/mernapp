import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, update } from "../store/cartSlice";

function Card({ foodItem, options }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const finalPriceRef = useRef();
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]);
  const handleAddToCart = () => {
    foodItem = { ...foodItem, price: finalPriceRef.current, qty, size };
    if (cart.find((food) => food._id === foodItem._id)) {
      dispatch(
        update({
          id: foodItem._id,
          price: finalPriceRef.current,
          qty,
          size,
          options,
        })
      );
    } else {
      dispatch(add(foodItem));
    }
  };
  finalPriceRef.current = qty * parseInt(options[size]);
  return (
    <div>
      {" "}
      <div>
        <div className="card mt-3" style={{ width: "18rem", maxHeight: 360 }}>
          <img
            src={foodItem.img}
            className="card-img-top food-img"
            alt={foodItem.name}
          />
          <div className="card-body">
            <h5 className="card-title">{foodItem.name}</h5>
            <div className="container w-100">
              <select
                className="m-2 h-100 bg-success rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100 bg-success rounded"
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              <div className="d-inline h-100 fs-5">
                ${finalPriceRef.current}
              </div>
            </div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
