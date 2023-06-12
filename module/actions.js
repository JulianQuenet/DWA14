import { State } from "./state.js";
/**
 * @typedef {Object} Increment
 * @prop {"INCREMENT_COUNT"} type
 * @prop {State}
 */

/**
 * @typedef {Object} Decrement
 * @prop {"DECREMENT_COUNT"} type
 * @prop {State}
 */

/**
 * @typedef {Object} Reset
 * @prop {"RESET_COUNT"} type
 * @prop {State}
 */

/**
 * @typedef {Increment | Decrement | Reset} Action
 */

/**
 * @param {object} State
 * @param {number} State.value
 * @returns {Increment}
 */
export const increment = () => {
  State.value += 1;
  return {
    type: "INCREMENT_COUNT",
  };
};

/**
 * @param {object} State
 * @param {number} State.value
 * @returns {Decrement}
 */
export const decrement = () => {
  State.value -= 1;
  return {
    type: "Decrement_COUNT",
  };
};

/**
 * @param {object} State
 * @param {number} State.value
 * @returns {Decrement}
 */
export const reset = () => {
  State.value = 0;
  return {
    type: "RESET_COUNT",
  };
};

/**
 * @param {Action} action
 */
export const dispatch = (action) => {
  return reducer(State, action);
};

/**
 * @param {State} state
 * @param {Action} action
 * @return {State}
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT_COUNT": {
      state.value;
    }
    case "DECREMENT_COUNT": {
      state.value;
    }
    case "RESET_COUNT": {
      state.value;
    }
    default:
      return state;
  }
};
