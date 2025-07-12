import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const navigate = useNavigate();

  const [editingEntry, setEditingEntry] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editMood, setEditMood] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3001/api/journals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setEntries(res.data))
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleAddEntry = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:3001/api/journals",
        { title, content, mood },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setEntries([...entries, res.data]);
        setTitle("");
        setContent("");
        setMood("");
      })
      .catch((err) => console.log(err));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:3001/api/journals/${editingEntry._id}`,
        {
          title: editTitle,
          content: editContent,
          mood: editMood,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setEntries((prev) =>
          prev.map((item) =>
            item._id === editingEntry._id ? res.data : item
          )
        );
        setEditingEntry(null);
        setEditTitle('');
        setEditContent('');
        setEditMood('');
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
  
    axios
      .delete(`http://localhost:3001/api/journals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setEntries(entries.filter(entry => entry._id !== id));
      })
      .catch((err) => console.log(err));
  };  

  return (
    <>
      <h2>Dashboard - Protected Route</h2>

      <form onSubmit={handleAddEntry}>
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Mood (e.g., happy, sad)"
          required
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <br />
        <button type="submit">Add Entry</button>
      </form>

      <hr />

      <h3>Your Journal Entries</h3>
      {entries.map((entry) => (
        <div key={entry._id}>
          <h4>{entry.title}</h4>
          <p>{entry.content}</p>
          <small>Mood: {entry.mood}</small>
          <br />
          <button
            onClick={() => {
              setEditingEntry(entry);
              setEditTitle(entry.title);
              setEditContent(entry.content);
              setEditMood(entry.mood);
            }}
          >
            Edit
          </button>
          <button onClick={() => handleDelete(entry._id)}>Delete</button>
          <hr />
        </div>
      ))}

      {editingEntry && (
        <>
          <h3>Editing Entry</h3>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <br />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Content"
              required
            />
            <br />
            <input
              type="text"
              value={editMood}
              onChange={(e) => setEditMood(e.target.value)}
              placeholder="Mood"
              required
            />
            <br />
            <button type="submit">Update Entry</button>
            <button type="button" onClick={() => setEditingEntry(null)}>Cancel</button>
          </form>
        </>
      )}
    </>
  );
}
