import Closed from './Closed';
import Garden from './Garden';

const now = new Date();
const hours = now.getHours();
const showGarden = hours < 21 && hours > 7;

const CountdownGarden = () => {
  return showGarden ? <Garden /> : <Closed />;
};

export default CountdownGarden;
