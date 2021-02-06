import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const myContext = createContext();

function Context(props) {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [isheader, setHeader] = useState(true);

  useEffect(() => {
    if (auth === false) setUser(null);
    axios.get('/api/user', { withCredentials: true }).then((u) => {
      setUser(u.data);
      setAuth(true);
    });
  }, [auth]);

  return (
    <myContext.Provider value={{ user, auth, setAuth, isheader, setHeader }}>
      {props.children}
    </myContext.Provider>
  );
}

export default Context;
