import { useState } from "react";
import { projects } from "../config/projects";
import { assetUrl } from "../config/media";
import ProjectMedia from "./ProjectMedia";
import ProjectDialog from "./ProjectDialog";
export default function Projects() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <section
        id="projects"
        className="section projects shell"
        aria-labelledby="projects-title"
      >
        <div className="featured-heading">
          <h2 id="projects-title" className="section-heading reveal">
            FEATURED.
          </h2>
          <span className="eyebrow">[ SELECTED WORK / 04 ]</span>
        </div>
        <div className="featured-stack">
          {projects.map((project, index) => (
            <article
              id={`work-${project.id}`}
              key={project.id}
              className="featured-project"
              data-preview={assetUrl(`work/${project.preview}`)}
            >
              <button
                className="featured-image"
                onClick={() => setSelected(project)}
                aria-label={`View ${project.name} project`}
              >
                <ProjectMedia project={project} />
                <span className="image-cta">View project ↗</span>
              </button>
              <div className="featured-info">
                <span className="featured-number">{index + 1}</span>
                <h3>
                  <button
                    className="project-title-button"
                    onClick={() => setSelected(project)}
                  >
                    {project.title}
                  </button>
                </h3>
                <div className="featured-bottom">
                  <div>
                    <p>{project.type}</p>
                    <span>{project.stack}</span>
                  </div>
                  <a
                    href={
                      index < projects.length - 1
                        ? `#work-${projects[index + 1].id}`
                        : "#approach"
                    }
                  >
                    {index < projects.length - 1
                      ? "Next project"
                      : "The approach"}{" "}
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
