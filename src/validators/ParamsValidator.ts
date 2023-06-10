export const kebabCaseValidator = (text: string): boolean =>  {
  /**
   * Check if a given text is in kebab-case
   * 
   * @param text (String)
   * @returns (boolean)
   */
  const kebabCasePattern: RegExp = /^(?!-)[a-z0-9]+(?:-[a-z0-9]+)*(?<!-)$/;

  return kebabCasePattern.test(text) && !text.includes("_");
};
