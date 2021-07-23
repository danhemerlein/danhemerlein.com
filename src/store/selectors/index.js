export const filterProjects = (filters, projects) => {
  if (!filters.length) return projects;

  return projects.filter((project) => {
    for (const filter of filters) {
      if (project.fields[filter]) {
        return project;
      }
    }
  });
};
