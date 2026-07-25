"use client";

import { useMemo, useState } from "react";

const categories = ["All", "Books", "Comics", "Audiobooks", "Movies", "Games", "Bibles"];

const items = [
  { title: "The Midnight Library", author: "Matt Haig", type: "Books", tag: "Popular", color: "#592c82", price: "$14.99", rent: "$3.99", art: "ML" },
  { title: "New Kid", author: "Jerry Craft", type: "Comics", tag: "Graphic novel", color: "#f06143", price: "$12.50", rent: "$2.99", art: "NK" },
  { title: "Atomic Habits", author: "James Clear", type: "Audiobooks", tag: "5h 35m", color: "#77a87b", price: "$18.00", rent: "$4.50", art: "AH" },
  { title: "Dune", author: "Frank Herbert", type: "Movies", tag: "Book + film", color: "#c58238", price: "$19.99", rent: "$5.99", art: "DU" },
  { title: "The Storyteller", author: "Dave Grohl", type: "Audiobooks", tag: "Staff pick", color: "#255d71", price: "$16.99", rent: "$3.99", art: "TS" },
  { title: "NIV Study Bible", author: "Zondervan", type: "Bibles", tag: "NIV", color: "#212121", price: "$24.99", rent: "$4.99", art: "NIV" },
  { title: "Lorebound", author: "Bookbee Studio", type: "Games", tag: "Adventure", color: "#ae3f55", price: "$9.99", rent: "$2.50", art: "LB" },
  { title: "The Wild Robot", author: "Peter Brown", type: "Books", tag: "For all ages", color: "#367d8b", price: "$11.99", rent: "$2.99", art: "WR" },
];

const challenges = [
  { icon: "🌍", title: "Around the world", detail: "Read 5 books from 5 countries", progress: 60, reward: 500 },
  { icon: "🎨", title: "Graphic novel sprint", detail: "Finish 3 graphic novels this month", progress: 33, reward: 250 },
  { icon: "🎧", title: "Listen up!", detail: "Complete 10 hours of audiobooks", progress: 72, reward: 350 },
];

function BookCard({ item, onAction }: { item: typeof items[number]; onAction: (message: string) => void }) {
  return (
    <article className="book-card">
      <div className="cover-wrap">
        <div className="book-cover" style={{ background: item.color }}>
          <span className="cover-mark">{item.art}</span>
          <span className="cover-title">{item.title}</span>
          <span className="cover-author">{item.author}</span>
        </div>
        <button className="heart" aria-label={`Save ${item.title}`} onClick={() => onAction(`${item.title} saved to your wishlist`)}>
          ♡
        </button>
      </div>
      <div className="book-meta">
        <span className="tiny-tag">{item.tag}</span>
        <h3>{item.title}</h3>
        <p>{item.author}</p>
        <div className="price-row">
          <span>Buy {item.price}</span>
          <span>Rent {item.rent}</span>
        </div>
        <div className="card-actions">
          <button onClick={() => onAction(`${item.title} added to your basket`)}>Buy</button>
          <button className="outline" onClick={() => onAction(`${item.title} rental selected`)}>Rent</button>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [points, setPoints] = useState(1240);
  const [joined, setJoined] = useState(false);

  const filtered = useMemo(() => items.filter((item) =>
    (active === "All" || item.type === active) &&
    `${item.title} ${item.author}`.toLowerCase().includes(query.toLowerCase())
  ), [active, query]);

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  return (
    <main>
      {notice && <div className="toast" role="status">{notice}<span>✓</span></div>}
      <div className="top-strip">FREE SHIPPING ON ORDERS OVER $40 <span>•</span> JOIN BOOKBEE+ AND EARN DOUBLE POINTS</div>
      <header>
        <a className="logo" href="#top" aria-label="Bookbee home">
          <span className="logo-bee">B</span> bookbee<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#discover">Discover</a>
          <a href="#challenges">Challenges</a>
          <a href="#clubs">Book clubs</a>
          <a href="#membership">Membership</a>
        </nav>
        <div className="header-actions">
          <button aria-label="Notifications" onClick={() => notify("You have 3 new reading updates")}>♢<i>3</i></button>
          <button aria-label="Shopping bag" onClick={() => notify("Your basket is ready for books")}>Bag <b>0</b></button>
          <button className="avatar" aria-label="Account">K</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">YOUR NEXT STORY IS BUZZING</p>
          <h1>Read it.<br />Hear it.<br /><em>Live it.</em></h1>
          <p className="hero-text">One joyful home for books, comics, audiobooks, screen stories, games and Bibles—ready to borrow, rent or keep forever.</p>
          <form className="search" onSubmit={(e) => { e.preventDefault(); document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" }); }}>
            <span>⌕</span>
            <input aria-label="Search the Bookbee collection" placeholder="Search by title, author or ISBN..." value={query} onChange={(e) => setQuery(e.target.value)} />
            <button>Search</button>
          </form>
          <div className="hero-stats">
            <div><strong>80K+</strong><span>stories</span></div>
            <div><strong>12K+</strong><span>members</span></div>
            <div><strong>140+</strong><span>book clubs</span></div>
          </div>
        </div>
        <div className="hero-art" aria-label="A lively stack of colourful books">
          <div className="sunburst"></div>
          <div className="float-badge badge-one">NEW<br /><b>WEEKLY</b></div>
          <div className="float-badge badge-two">READ<br />MORE</div>
          <div className="book-stack">
            <div className="stack-book book-a">COMICS <span>✦</span></div>
            <div className="stack-book book-b">STORIES</div>
            <div className="stack-book book-c">BOOKBEE ORIGINALS</div>
            <div className="stack-book book-d">WORLDS AWAIT</div>
          </div>
          <div className="bee">✦<span></span></div>
        </div>
      </section>

      <section className="ticker" aria-label="Bookbee features">
        <span>BOOKS</span> ◆ <span>GRAPHIC NOVELS</span> ◆ <span>AUDIOBOOKS</span> ◆ <span>MOVIES</span> ◆ <span>GAMES</span> ◆ <span>BIBLES</span>
      </section>

      <section className="section collection" id="discover">
        <div className="section-heading">
          <div><p className="eyebrow">BROWSE THE HIVE</p><h2>Find your next favourite.</h2></div>
          <a href="#discover">See all <span>→</span></a>
        </div>
        <div className="filters" role="group" aria-label="Filter the collection">
          {categories.map((category) => <button key={category} className={active === category ? "active" : ""} onClick={() => setActive(category)}>{category}</button>)}
        </div>
        <div className="book-grid">
          {filtered.slice(0, 4).map((item) => <BookCard key={item.title} item={item} onAction={notify} />)}
        </div>
        {filtered.length === 0 && <p className="empty">No stories found. Try another search.</p>}
      </section>

      <section className="challenge-section" id="challenges">
        <div className="section-heading light">
          <div><p className="eyebrow">READ. PLAY. EARN.</p><h2>Challenges that reward you.</h2></div>
          <div className="points"><span>YOUR BALANCE</span><strong>⬡ {points.toLocaleString()} points</strong></div>
        </div>
        <div className="challenge-grid">
          {challenges.map((challenge) => (
            <article className="challenge-card" key={challenge.title}>
              <div className="challenge-icon">{challenge.icon}</div>
              <div className="challenge-info">
                <span>{challenge.progress}% complete</span>
                <h3>{challenge.title}</h3>
                <p>{challenge.detail}</p>
                <div className="progress"><i style={{ width: `${challenge.progress}%` }}></i></div>
                <button onClick={() => { setPoints(points + 25); notify("Challenge joined — 25 welcome points earned!"); }}>Join challenge <span>+{challenge.reward} pts</span></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section club-section" id="clubs">
        <div className="club-visual">
          <div className="club-circle">BOOK<br /><b>CLUB</b><span>’26</span></div>
          <span className="doodle d1">✦</span><span className="doodle d2">⌁</span><span className="doodle d3">●</span>
        </div>
        <div className="club-copy">
          <p className="eyebrow">BETTER TOGETHER</p>
          <h2>Join a club.<br />Find your people.</h2>
          <p>From fantasy obsessives to thoughtful faith readers, there’s a buzzing community waiting to meet you.</p>
          <div className="club-list">
            <span>🔥 Plot Twist Society</span><span>1.8k readers</span>
            <span>✝ The Good Book Club</span><span>980 readers</span>
            <span>🎬 Read It, Watch It</span><span>2.4k readers</span>
          </div>
          <button className="primary" onClick={() => { setJoined(!joined); notify(joined ? "Club membership paused" : "Welcome to the Bookbee club community!"); }}>{joined ? "Club joined ✓" : "Explore book clubs"} <span>→</span></button>
        </div>
      </section>

      <section className="membership" id="membership">
        <div>
          <p className="eyebrow">MORE BOOKS. MORE PERKS.</p>
          <h2>Bookbee<span>+</span></h2>
          <p>Borrow up to 10 titles. Get 2× points, member-only prices and one free audiobook every month.</p>
          <button onClick={() => notify("Your 30-day Bookbee+ trial is ready!")} className="dark-button">Start your free trial →</button>
        </div>
        <div className="member-price"><span>FROM</span><strong>$9<sup>99</sup></strong><p>/ month</p><i>Cancel anytime</i></div>
      </section>

      <section className="section newsletter">
        <span className="mail-icon">✉</span>
        <div><p className="eyebrow">THE WEEKLY BUZZ</p><h2>Good stories, straight to your inbox.</h2></div>
        <form onSubmit={(e) => { e.preventDefault(); notify("You’re on the list — welcome to the hive!"); }}>
          <input type="email" required placeholder="Your email address" aria-label="Email address" />
          <button>Join the hive</button>
        </form>
      </section>

      <footer>
        <div className="footer-brand"><a className="logo" href="#top"><span className="logo-bee">B</span> bookbee<span>.</span></a><p>Every story has a place in the hive.</p></div>
        <div><h3>Explore</h3><a href="#discover">Books & more</a><a href="#challenges">Challenges</a><a href="#clubs">Book clubs</a></div>
        <div><h3>Bookbee</h3><a href="#membership">Membership</a><a href="#top">How it works</a><a href="#top">Gift cards</a></div>
        <div><h3>Help</h3><a href="#top">Contact us</a><a href="#top">FAQs</a><a href="#top">Accessibility</a></div>
        <div className="footer-bottom">
          <span>© 2026 Bookbee. Made with curiosity.</span>
          <span>Created by Araola, Shallom A, Darasimi, Tyler &amp; Daniel</span>
        </div>
      </footer>
    </main>
  );
}
