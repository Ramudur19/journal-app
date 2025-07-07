import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userLoginToken");
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:3001/api/journals', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
        console.log(res.data)
      setEntries(res.data);
    })
    .catch(err => {
      console.error(err);
      navigate('/login'); // fallback in case token is invalid
    });
  }, []);

  return (
    <>
      <h2>Dashboard - Protected Route</h2>
      {entries.map(entry => (
        <p key={entry._id}>{entry.title}</p>
      ))}
    </>
  );
}
