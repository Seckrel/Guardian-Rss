export const kebabCaseValidator = (text: string) => {
  const kebabCasePattern: RegExp = /^(?!-)[a-z0-9]+(?:-[a-z0-9]+)*(?<!-)$/;

  return kebabCasePattern.test(text) && !text.includes("_");
};
