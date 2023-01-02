import { useDispatch, useSelector } from "react-redux";
import { drop, remove } from "../store/cartSlice";
import axios from "axios";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  if (!cart.length) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">Cart is empty!</div>
      </div>
    );
  }
  const handleCheckout = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const res = await axios.post("https://friggy-node.onrender.com/order", {
      foodOrder: cart,
      email: userEmail,
      orderDate: new Date().toLocaleDateString(),
    });
    if (res.status === 200) {        
      dispatch(drop());
    }
  };
  const totalPrice = cart.reduce((acc, food) => acc + food.price, 0);
  const removeHandler = (foodId) => {
    dispatch(remove(foodId));
  };
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md table-responsive-lg">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    className="btn p-0 bg-white text-danger"
                    onClick={() => removeHandler(food._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Cart total: ${totalPrice}</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckout}>
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
