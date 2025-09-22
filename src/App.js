import React, { useEffect, useState } from "react";
import supabase from "./Supabase";
import "./style.css";
import logo from "./logo.png";
function App() {
  const [showForm, setShowForm] = useState(false);
  const [doses, setDoses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  useEffect(
    function () {
      async function getDoses() {
        setIsLoading(true);

        let query = supabase.from("Dose").select("*");
        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: Dose, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        setDoses(Dose);
        if (!error) setDoses(Dose);
        else alert("There was a problem getting data");
        setIsLoading(false);
      }
      getDoses();
    },
    [currentCategory]
  );
  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewDoseForm setDoses={setDoses} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <DoseList doses={doses} setDoses={setDoses} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = "DailyDose";
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} className="pic" alt="Logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large share-btn"
        id="share"
        //3.update state variable
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share a Dose"}
      </button>
    </header>
  );
}
const CATEGORIES = [
  { name: "Java", color: "#3b82f6" },
  { name: "C", color: "#3b82f6" },
  { name: "Python", color: "#3b82f6" },
  { name: "Aptitude", color: "#def4444" },
  { name: "Interview Questions", color: "#def4444" },
  { name: "Pattern", color: "#def4444" },
];

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewDoseForm({ setDoses, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;
  const [isUploading, setIsUploading] = useState(false);
  async function handleSubmit(e) {
    //1.Prevent browser reload
    e.preventDefault();
    console.log(text, source, category);
    //2.Check if data is valid.If true ,create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 1000) {
      //3.Upload fact tom supabase
      setIsUploading(true);
      const { data: newDose, error } = await supabase
        .from("Dose")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);
      //4.Add the new fact to the UI:add the UI to the state
      if (!error) setDoses((doses) => [newDose[0], ...doses]);
      //5.Resett input fields
      setText("");
      setSource("");
      setCategory("");
      setShowForm(false);
    }
  }
  return (
    <form className="Dose-Form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your dose"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{1000 - textLength}</span>
      <input
        type="text"
        placeholder="Enter a valid URL"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose a Category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul className="DoseCat">
        <li>
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="snippet-category">
            <button
              className="btn btn-category"
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function DoseList({ doses, setDoses }) {
  return (
    <section>
      <ul className="Dose-List">
        {doses.map((dose) => (
          <Dose key={dose.id} dose={dose} setDoses={setDoses} />
        ))}
      </ul>
      <p>There are {doses.length} doses in the database.Add your own</p>
    </section>
  );
}

function Dose({ dose, setDoses }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    dose.votesInteresting + dose.votesMindBlowing < dose.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedDose, error } = await supabase
      .from("Dose")
      .update({ [columnName]: dose[columnName] + 1 })
      .eq("id", dose.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setDoses((Dose) =>
        Dose.map((d) => (d.id === dose.id ? updatedDose[0] : d))
      );
  }

  return (
    <li className="dose-content">
      <p>
        {" "}
        {isDisputed ? <span className="disputed">[⛔DISPUTED]</span> : null}
        <pre>{dose.text}</pre>
      </p>
      <a className="source" href={dose.source}>
        (Source)
      </a>
      <span
        className="tag"
        style={{
          backgroundColor: "#2390d9",
        }}
      >
        {dose.category}
      </span>
      <div className="vote">
        <button
          className="reactions"
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          💖{dose.votesInteresting}
        </button>
        <button
          className="reactions"
          onClick={() => handleVote("votesMindBlowing")}
          disabled={isUpdating}
        >
          🤯{dose.votesMindBlowing}
        </button>
        <button
          className="reactions"
          onClick={() => handleVote("votesFalse")}
          disabled={isUpdating}
        >
          👎{dose.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
