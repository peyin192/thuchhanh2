import { useState, useRef, useEffect } from "react";

function CourseDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("React.js");
  const ref = useRef(null);

  const options = [
    "React.js",
    "Node.js",
    "Web Frontend Fundamental",
  ];

  // đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="course-dropdown" ref={ref}>
      <button
        type="button"
        className="course-trigger"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="course-trigger-text">{selected}</span>
        <span className="course-caret">▾</span>
      </button>

      {open && (
        <div className="course-menu">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={
                "course-option" + (opt === selected ? " active" : "")
              }
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseDropdown;
