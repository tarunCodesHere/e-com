import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsFromDB,
  productSelector,
} from "../redux/reducers/productsReducer";
import { Products } from "../components/ProductComp.js";
import { authSelector } from "../redux/reducers/authReducer.js";

export const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector(productSelector);
  const { isLoggedIn } = useSelector(authSelector);
  useEffect(() => {
    dispatch(getProductsFromDB());
  }, [dispatch]);
  return isLoading ? (
    <h2>Loading Products... </h2>
  ) : (
    <div className="homePage" style={styles.homePage}>
      {!isLoggedIn ? <h3>Login to Add products into your cart</h3> : <></>}
      <div style={styles.homePageProductPart}>
        {products.map((currProd, index) => {
          return <Products currProd={currProd} key={index} />;
        })}
      </div>
    </div>
  );
};
const styles = {
  homePage: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  homePageProductPart: {
    display: "flex",

    flexWrap: "wrap",
    justifyContent: "space-between",
  },
};
