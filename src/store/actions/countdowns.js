export const addCountdown = (payload) => {
  return {
    type: 'ADD_COUNTDOWN',
    payload
  }
}

export const removeCountdown = (payload) => {
  return {
    type: 'REMOVE_COUNTDOWN',
    payload
  }
}
