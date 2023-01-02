import { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let foodCategoryRes = await axios.get(
      "http://localhost:5000/food/allCategory"
    );
    let foodItemRes = await axios.get("http://localhost:5000/food/allFood");
    setFoodCat(foodCategoryRes.data);
    setFoodItem(foodItemRes.data);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: 10 }}>
              <div class="d-flex justify-content-center">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button
                  class="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?icecream"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.map((foodCat) => (
          <div className="row mb-3">
            <div key={foodCat._id} className="fs-3 m-3">
              {foodCat.CategoryName}
            </div>
            <hr />
            {foodItem
              .filter(
                (food) =>
                  food.CategoryName === foodCat.CategoryName &&
                  food.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((food) => (
                <div key={food._id} className="col-12 col-md-6 col-lg-3">
                  <Card foodItem={food} options={food.options[0]} />
                </div>
              ))}
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
