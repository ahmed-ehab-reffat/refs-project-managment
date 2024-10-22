import Button from "./Button.jsx";

export default function Sidebar({ projects, onSwitch, selectedProjectId }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl overflow-y-auto">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your projects
      </h2>
      <div>
        <Button
          onClick={() => onSwitch(null)}
          disabled={selectedProjectId === null}
        >
          + Add Project
        </Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          let classes =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 disabled:bg-stone-800 disabled:text-stone-600 disabled:pointer-events-none";
          if (project.id === selectedProjectId) {
            classes += " bg-stone-800 text-stone-200";
          } else {
            classes += " text-stone-400";
          }
          return (
            <li key={project.id}>
              <button
                onClick={() => onSwitch(project.id)}
                className={classes}
                disabled={selectedProjectId === null}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
