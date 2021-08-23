import projects from './data/projects-order';

const addNewOrder = (arr) => {
  // eslint-disable-next-line array-callback-return
  arr.map((item) => {
    item.fields.newOrder = projects[item.fields.title].order;
  });
};

export default addNewOrder;
