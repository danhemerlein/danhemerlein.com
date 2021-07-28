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

export const sortProjects = (sortBy, projects) => {
  switch (sortBy) {
    case "default":
      const sorted = projects.sort((a, b) => {
        return a.fields.order - b.fields.order;
      });
      return sorted;
    case "most-recent":
      const sortedRecently = projects.sort((a, b) => {
        return b.fields.releaseDateFormat - a.fields.releaseDateFormat;
      });
      return sortedRecently;
    case "oldest":
      const sortedOldest = projects.sort((a, b) => {
        return a.fields.releaseDateFormat - b.fields.releaseDateFormat;
      });
      return sortedOldest;
    default:
  }
};

export const filterMusicArtists = (filter, projects) => {};
