import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const myContext = createContext();

function Context(props) {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [isheader, setHeader] = useState(true);
  const [cart, setcart] = useState([]);

  function addcart(product) {
    setcart((old) => [...old, product]);
  }

  function removecart(productID) {
    setcart(cart.filter((c, i) => i !== productID));
  }

  useEffect(() => {
    if (auth === false) setUser(null);
    fetchuseragain();
  }, [auth]);

  const fetchuseragain = () => {
    axios
      .get('/api/user', { withCredentials: true })
      .then((u) => {
        setUser(u.data);
        setAuth(true);
      })
      .catch((err) => {
        setUser(null);
        setAuth(false);
      });
  };

  return (
    <myContext.Provider
      value={{
        user,
        auth,
        refresh: fetchuseragain,
        setAuth,
        isheader,
        setHeader,
        cart,
        setcart,
        addcart,
        removecart,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
}

export default Context;
