/**
 * Creates a frozen keyMirror object. A keyMirror is an object whose
 * keys and values are the same. (Based on an internal react util).
 * Similar to a ENUM.
 * @param {Object} rawKeys - Object whose keys will be used to create the keymirror, object values are ignored
 */
export default function keyMirror(rawKeys) {
  // Creates object in shape {KEY: 'KEY'}'
  const mirror = Object.keys(rawKeys).reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {});
  return Object.freeze(mirror);
}
