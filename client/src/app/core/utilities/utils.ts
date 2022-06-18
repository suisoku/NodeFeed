/**
 * A short library of useful JS functions relevant to all the project
 */
export class Utils {
  /** Omit properties and return a new object */
  static omit<T>(keysToOmit: string[], obj: T): T {
    return Object.keys(obj)
      .filter(key => !keysToOmit.includes(key))
      .reduce((cleanedObject, key) => {
        cleanedObject[key as keyof T] = obj[key as keyof T];
        return cleanedObject;
      }, {} as T);
  }
}
