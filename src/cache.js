import incstr from "incstr";
const cacheObj = new Map(),
  generate = incstr.idGenerator({
    // Removed "d" letter to avoid accidental "ad" construct.
    // @see https://medium.com/@mbrevda/just-make-sure-ad-isnt-being-used-as-a-class-name-prefix-or-you-might-suffer-the-wrath-of-the-558d65502793
    // NOTE: allow "d" letter due to combination of UPPERCASES-lowercases
    alphabet: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    prefix: "_",
  });
const cache = {
  get(key, context) {
    if (key[0] === "_") {
      console.log(`${context}: existing ${key}`);
      return [key];
    }
    if (typeof cacheObj.get(key) === "undefined") {
      cacheObj.set(key, generate());
    }
    console.log(`${context}:`, key, cacheObj.get(key));
    return [cacheObj.get(key), true];
  },
};

export default cache;
