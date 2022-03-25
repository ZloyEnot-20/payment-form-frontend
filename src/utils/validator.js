//validators

export const validator = (_, value) =>
  +value ? Promise.resolve() : Promise.reject("Please enter a valid number.");
