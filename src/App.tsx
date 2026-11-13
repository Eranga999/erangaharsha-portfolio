import { useEffect, useState } from "react";
import { projects, colors, skills, base } from "./data";
import { initializeEffects } from "./effects";
import HeroArtwork from "./HeroArtwork";
const categories = [
  ["All", "All projects"],
  ["Web", "Web development"],
  ["Mobile", "Mobile apps"],
  ["Design", "UI/UX design"],
];

function Hero() {
  return (
    <header className="hero" id="home">
      <HeroArtwork />
      <div className="chrome-stage" aria-hidden="true">
        <div className="chrome-fallback">
          <i></i>
          <i></i>
        </div>
      </div>
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="dot"></span> Available for opportunities
        </div>
        <h1>
          Ideas into
          <br />
          <em>digital reality.</em>
        </h1>
        <p className="intro">
          I'm <strong style={{ color: "#f0edf7" }}>Eranga Harsha.</strong> A
          full-stack developer & UI/UX designer building thoughtful experiences
          for the web and beyond.
        </p>
        <div className="actions">
          <a className="button" href="#work">
            Explore my work <span>↘</span>
          </a>
          <a
            className="textlink"
            href="https://eranga999.github.io/My-portfolio/images/ERANGA-HARSHA_FullStack_Developer.pdf"
            target="_blank"
            rel="noopener"
          >
            View CV ↗
          </a>
        </div>
      </div>
      <div className="scene" aria-label="Interactive 3D laptop illustration">
        <div className="orbit"></div>
        <div className="orbit o2"></div>
        <div className="laptop">
          <div className="screen">
            <div className="screenbar">
              <i></i>
              <i></i>
              <i></i>
              <span>eranga / create.tsx</span>
            </div>
            <div className="code">
              <div>
                <b>const</b> developer = &#123;
              </div>
              <div className="indent">
                name: <strong>"Eranga Harsha"</strong>,
              </div>
              <div className="indent">
                focus: [<strong>"code"</strong>, <strong>"design"</strong>],
              </div>
              <div className="indent">
                passion: <strong>"build something meaningful"</strong>
              </div>
              <div>&#125;;</div>
              <br />
              <div>
                <b>function</b> bringIdeasToLife() &#123;
              </div>
              <div className="indent">
                <b>return</b> &lt;<strong>GreatExperiences</strong> /&gt;;
              </div>
              <div>&#125;</div>
            </div>
          </div>
          <div className="base">
            <div className="keys"></div>
            <div className="pad"></div>
          </div>
        </div>
        <div className="float-tag tag1">&lt;/&gt; Built with curiosity</div>
        <div className="float-tag tag2">✦ Design meets development</div>
      </div>
      <div className="hero-foot">
        <a href="#work">↓ Scroll to discover</a>
        <span>Code. Design. Create.</span>
        <span>Based in Sri Lanka ↗</span>
      </div>
    </header>
  );
}

function Expertise() {
  return (
    <section
      className="scroll-showcase"
      id="experience"
      aria-label="Scroll through my expertise"
    >
      <div className="showcase-pin">
        <div className="showcase-title">
          <div>
            <div className="label">Creative thinking. Technical craft.</div>
            <h2>Built to move you.</h2>
          </div>
          <span className="chapter-count">
            <span id="chapter">01</span> / 03 ↓
          </span>
        </div>
        <div className="card-stack">
          <article className="story-card">
            <div className="story-copy">
              <div className="label">01 / Full-stack development</div>
              <h3>
                Ideas.
                <br />
                Made real.
              </h3>
              <p>
                From responsive interfaces to the APIs behind them. Explore
                applications that solve everyday problems.
              </p>
              <div className="tags">
                React · Next.js · Node.js · Spring Boot
              </div>
              <a className="button story-link" data-category="Web" href="#work">
                Explore web projects ↗
              </a>
            </div>
            <div className="story-visual">
              <div className="device">
                <img
                  src="assets/portfolio6-optimized.webp"
                  alt="Easy Fix project visual"
                />
              </div>
            </div>
            <span className="story-number" aria-hidden="true">
              01
            </span>
          </article>
          <article className="story-card">
            <div className="story-copy">
              <div className="label">02 / Mobile development</div>
              <h3>
                Small screen.
                <br />
                Big possibilities.
              </h3>
              <p>
                Useful experiences in your pocket. From managing daily tasks to
                keeping a business moving.
              </p>
              <div className="tags">Flutter · Dart · Kotlin · Firebase</div>
              <a
                className="button story-link"
                data-category="Mobile"
                href="#work"
              >
                Explore mobile apps ↗
              </a>
            </div>
            <div className="story-visual">
              <div className="device phone">
                <img
                  src="assets/portfolio7-optimized.webp"
                  alt="Mobile project visual"
                />
              </div>
            </div>
            <span className="story-number" aria-hidden="true">
              02
            </span>
          </article>
          <article className="story-card">
            <div className="story-copy">
              <div className="label">03 / UI/UX design</div>
              <h3>
                Looks right.
                <br />
                Feels effortless.
              </h3>
              <p>
                Thoughtful layouts, clear interactions, and prototypes that turn
                an idea into an experience.
              </p>
              <div className="tags">Figma · Wireframing · Prototyping</div>
              <a
                className="button story-link"
                data-category="Design"
                href="#work"
              >
                Explore design work ↗
              </a>
            </div>
            <div className="story-visual">
              <div className="device design">
                <img
                  src="assets/portfolio12.webp"
                  alt="HCI interface design project visual"
                />
              </div>
            </div>
            <span className="story-number" aria-hidden="true">
              03
            </span>
          </article>
        </div>
        <div className="showcase-track" aria-hidden="true">
          <span className="active"></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="portrait reveal">
        <div className="portrait-orbits" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
        </div>
        <img
          src="assets/eranga-outdoor-portrait-optimized.webp"
          alt="Eranga Harsha"
          loading="lazy"
          decoding="async"
        />
        <div className="caption">
          <span>Eranga Harsha</span>
          <span>Developer & designer ↗</span>
        </div>
      </div>
      <div className="reveal">
        <div className="label">02 / A little about me</div>
        <h2>
          Curious mind.
          <br />
          Hands-on builder.
        </h2>
        <p>
          I'm an IT undergraduate and full-stack developer with practical
          experience building web, mobile, and UI/UX-based digital solutions.
        </p>
        <p>
          I enjoy turning complex problems into clean, responsive, and
          user-friendly applications. From the first wireframe to the final line
          of code, I care about how things work — and how they feel.
        </p>
        <div className="stats">
          <div>
            <strong>10+</strong>
            <span>Projects completed</span>
          </div>
          <div>
            <strong>20+</strong>
            <span>Technical skills</span>
          </div>
          <div>
            <strong>5+</strong>
            <span>UI/UX & dev projects</span>
          </div>
        </div>
        <a
          className="textlink"
          href="https://www.linkedin.com/in/erangaharsha/"
          target="_blank"
          rel="noopener"
        >
          More about me on LinkedIn ↗
        </a>
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="skills" id="skills">
      <div className="sectionhead reveal">
        <div>
          <div className="label">03 / My toolkit</div>
          <h2>From pixels to platforms.</h2>
        </div>
        <div className="toolkit-sculpture" aria-hidden="true">
          <div className="toolkit-cube">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
        <p>The technologies and tools I use to bring an idea to life.</p>
      </div>
      <div id="skillrows">
        {skills.map(([name, tools], i) => (
          <div className="skillrow reveal" key={name}>
            <span className="num">0{i + 1}</span>
            <h3>{name}</h3>
            <p>{tools}</p>
          </div>
        ))}
      </div>
      <div className="services reveal">
        <div>
          <span className="symbol">&lt;/&gt;</span>
          <h3>Web development</h3>
          <p>
            Responsive, user-friendly full-stack applications built around real
            user needs.
          </p>
        </div>
        <div>
          <span className="symbol">▣</span>
          <h3>Mobile development</h3>
          <p>
            Engaging mobile experiences using Kotlin and modern cross-platform
            frameworks.
          </p>
        </div>
        <div>
          <span className="symbol">✳</span>
          <h3>UI/UX design</h3>
          <p>
            Intuitive wireframes and Figma prototypes with a focus on clarity
            and ease of use.
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-orbit" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div className="label">04 / What's next?</div>
      <h2>
        Have an idea?
        <br />
        <span>Let's make it happen.</span>
      </h2>
      <p>Open to new projects, creative collaborations, and opportunities.</p>
      <a
        className="button"
        href="https://www.linkedin.com/in/erangaharsha/"
        target="_blank"
        rel="noopener"
        style={{ marginTop: "20px" }}
      >
        Connect on LinkedIn ↗
      </a>
      <div className="contact-grid">
        <div className="contact-note">
          <div className="mail-object" aria-hidden="true">
            <span>↗</span>
            <i></i>
            <i></i>
          </div>
          <h3>
            Good things start
            <br />
            with a conversation.
          </h3>
          <p>
            Tell me about your project, an opportunity, or something you'd like
            to build together.
          </p>
          <a className="email-link" href="mailto:erangaharsha739@gmail.com">
            erangaharsha739@gmail.com ↗
          </a>
        </div>
        <div className="contact-form-card">
          <form
            action="https://formsubmit.co/erangaharsha739@gmail.com"
            method="POST"
            id="contact-form"
          >
            <input
              type="hidden"
              name="_subject"
              value="New enquiry — Eranga Harsha Portfolio"
            />
            <input type="hidden" name="_template" value="table" />
            <input
              type="text"
              name="_honey"
              className="form-trap"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="form-fields">
              <div>
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="How should I call you?"
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email">Email address</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  maxLength={254}
                  required
                />
              </div>
            </div>
            <label htmlFor="contact-topic">What do you have in mind?</label>
            <select defaultValue="" id="contact-topic" name="topic" required>
              <option value="" disabled>
                Select a topic
              </option>
              <option>Website or web application</option>
              <option>Mobile application</option>
              <option>UI/UX design</option>
              <option>Job opportunity</option>
              <option>Something else</option>
            </select>
            <label htmlFor="contact-message">Your message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="A little about your idea, goals, and timeline…"
              minLength={10}
              maxLength={5000}
              required
            ></textarea>
            <button className="button send-button" type="submit">
              Send message <span>↗</span>
            </button>
            <p
              id="form-status"
              className="form-status"
              role="status"
              aria-live="polite"
              aria-atomic="true"
              tabIndex={-1}
              hidden
            ></p>
            <p className="form-note">
              Your details are used to reply to your enquiry.{" "}
              <a href="mailto:erangaharsha739@gmail.com">Prefer email?</a>
            </p>
          </form>
        </div>
      </div>
      <div className="socials">
        <a href="https://github.com/Eranga999" target="_blank" rel="noopener">
          GitHub ↗
        </a>
        <a
          href="https://www.instagram.com/_eranga_harsha_?igsh=eWpkeGxrdzA2Zjh2"
          target="_blank"
          rel="noopener"
        >
          Instagram ↗
        </a>
        <a
          href="https://www.facebook.com/share/1AuyiyxSNK/"
          target="_blank"
          rel="noopener"
        >
          Facebook ↗
        </a>
      </div>
    </section>
  );
}

function Work() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    window.dispatchEvent(new Event("portfolio:filter"));
  }, [filter, expanded]);
  return (
    <section id="work">
      <div className="sectionhead reveal">
        <div>
          <div className="label">01 / Selected work</div>
          <h2 className="work-title" aria-label="Made with purpose.">
            <span aria-hidden="true">Made with</span>
            <span aria-hidden="true">
              purpose<span className="work-star">✳</span>.
            </span>
          </h2>
        </div>
        <p>
          A collection of web applications, mobile experiences, and interface
          explorations.
        </p>
      </div>
      <div className="filters" aria-label="Filter projects">
        {categories.map(([value, label]) => (
          <button
            key={value}
            className={filter === value ? "active" : ""}
            data-filter={value}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="projects" id="projects">
        {projects.map((p, i) => (
          <article
            key={p[0]}
            className="project reveal"
            data-type={p[1]}
            hidden={filter === "All" ? !expanded && i > 5 : p[1] !== filter}
          >
            <a
              href={p[5]}
              target="_blank"
              rel="noopener"
              aria-label={
                "Explore " +
                p[0] +
                " on " +
                (p[1] === "Design" ? "Figma" : "GitHub")
              }
            >
              <div className="project-kicker">
                <span>PROJECT / {String(i + 1).padStart(2, "0")}</span>
                <span className="project-open">VIEW PROJECT ↗</span>
              </div>
              <div
                className="art"
                style={{ background: colors[i % colors.length] }}
              >
                <img
                  src={base + p[4]}
                  alt={p[0] + " visual from original portfolio"}
                  loading="lazy"
                  decoding="async"
                />
                <span className="art-title">{p[0]}</span>
              </div>
              <div className="project-title">
                <h3>{p[0]}</h3>
                <small>{p[1]} ↗</small>
              </div>
            </a>
            <p>{p[2]}</p>
            <div className="tags">{p[3]}</div>
          </article>
        ))}
      </div>
      <button
        className="more"
        id="more"
        hidden={filter !== "All"}
        onClick={() => {
          setExpanded(!expanded);
          if (expanded)
            document
              .querySelector("#work")
              ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {expanded ? "Show selected projects ↑" : "View all 12 projects ↓"}
      </button>
    </section>
  );
}
export default function App() {
  useEffect(initializeEffects, []);
  return (
    <>
      <a className="skip" href="#work">
        Skip to projects
      </a>
      <div className="progress" aria-hidden="true"></div>
      <nav>
        <a className="logo" href="#home">
          eranga<span>.dev</span>
        </a>
        <div className="links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a className="optional" href="#experience">
            Expertise
          </a>
          <a className="navcontact" href="#contact">
            Let's talk ↗
          </a>
        </div>
      </nav>
      <main>
        <div className="wrap">
          <Hero />
        </div>
        <div className="ribbon">
          <div className="wrap">
            <div className="ribbon-group">
              <span>React</span>
              <b>✳</b>
              <span>Next.js</span>
              <b>✳</b>
              <span>Node.js</span>
              <b>✳</b>
              <span>Flutter</span>
              <b>✳</b>
              <span>Spring Boot</span>
              <b>✳</b>
              <span>Figma</span>
            </div>
            <div className="ribbon-group" aria-hidden="true">
              <span>React</span>
              <b>✳</b>
              <span>Next.js</span>
              <b>✳</b>
              <span>Node.js</span>
              <b>✳</b>
              <span>Flutter</span>
              <b>✳</b>
              <span>Spring Boot</span>
              <b>✳</b>
              <span>Figma</span>
            </div>
          </div>
        </div>
        <div className="wrap">
          <Expertise />
          <Work />
          <About />
          <Toolkit />
          <Contact />
          <footer>
            <span>
              © <span id="year"></span> Eranga Harsha
            </span>
            <span>Crafted with intention.</span>
            <a href="#home">Back to top ↑</a>
          </footer>
        </div>
      </main>
    </>
  );
}
