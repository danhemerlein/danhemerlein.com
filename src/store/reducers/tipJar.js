const initState = {
  tipJarOpen: false,
};

const TipJar = (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_TIP_JAR':
      return {
        ...state,
        tipJarOpen: action.payload,
      };
    default:
      return state;
  }
};

export default TipJar;
