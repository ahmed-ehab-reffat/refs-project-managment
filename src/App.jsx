import { useState } from "react";

import Sidebar from "./components/Sidebar.jsx";
import NoProject from "./components/NoProject.jsx";
import NewProject from "./components/NewProject.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

const initial = {
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
};

const storedState = JSON.parse(localStorage.getItem("projects")) || initial;

function App() {
  const [projectState, setProjectState] = useState(storedState);

  function handleComponent(state) {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: state,
      };
    });
  }

  function handleAddProject(projectData) {
    const projectId = Math.random();
    const newProject = {
      ...projectData,
      id: projectId,
    };
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });

    const storedState = JSON.parse(localStorage.getItem("projects")) || initial;
    const updatedState = {
      ...storedState,
      projects: [...storedState.projects, newProject],
    };
    localStorage.setItem("projects", JSON.stringify(updatedState));
  }

  function handleDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
        tasks: prevState.tasks.filter(
          (task) => task.projectId !== prevState.selectedProjectId
        ),
      };
    });

    const storedState = JSON.parse(localStorage.getItem("projects")) || initial;
    const updatedState = {
      ...storedState,
      projects: storedState.projects.filter(
        (project) => project.id !== projectState.selectedProjectId
      ),
      tasks: storedState.tasks.filter(
        (task) => task.projectId !== projectState.selectedProjectId
      ),
    };
    localStorage.setItem("projects", JSON.stringify(updatedState));
  }

  function handleAddTask(text) {
    const taskId = Math.random();
    setProjectState((prevState) => {
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });

    const storedState = JSON.parse(localStorage.getItem("projects")) || initial;
    const newTask = {
      text: text,
      projectId: projectState.selectedProjectId,
      id: taskId,
    };
    const updatedState = {
      ...storedState,
      tasks: [...storedState.tasks, newTask],
    };
    localStorage.setItem("projects", JSON.stringify(updatedState));
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });

    const storedState = JSON.parse(localStorage.getItem("projects")) || initial;
    const updatedState = {
      ...storedState,
      tasks: storedState.tasks.filter((task) => task.id !== id),
    };
    localStorage.setItem("projects", JSON.stringify(updatedState));
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content;

  if (projectState.selectedProjectId === undefined) {
    content = <NoProject onSwitch={handleComponent} />;
  } else if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onSwitch={handleComponent} />
    );
  } else {
    const projectTasks = projectState.tasks.filter(
      (task) => task.projectId === selectedProject.id
    );
    content = (
      <SelectedProject
        project={selectedProject}
        tasks={projectTasks}
        onDeleteProject={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
      />
    );
  }

  return (
    <main className="h-screen-4 my-8 flex gap-8">
      <Sidebar
        projects={projectState.projects}
        onSwitch={handleComponent}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
