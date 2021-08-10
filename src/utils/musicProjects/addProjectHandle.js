const addProjectHandle = (arr) => {
  arr.map((project) => {
    var projectHandle = project.fields.title
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/ /g, "-")
      .toLowerCase();
    project.fields.handle = projectHandle;
  });
};

export default addProjectHandle;
