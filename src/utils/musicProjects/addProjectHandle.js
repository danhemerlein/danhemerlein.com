/**
 * adds a handle property to the fields object of music projects
 * @param {array} arr
 */

const addProjectHandle = (arr) => {
  // eslint-disable-next-line array-callback-return
  arr.map((project) => {
    const projectHandle = project.fields.title
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .toLowerCase();
    project.fields.handle = projectHandle;
  });
};

export default addProjectHandle;
