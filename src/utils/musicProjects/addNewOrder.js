import projects from "./data/projects-order";

function addNewOrder(arr) {
  arr.map((item) => {
    item.fields.newOrder = projects[item.fields.title].order;
  });
}

export default addNewOrder;
