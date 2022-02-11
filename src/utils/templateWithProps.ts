// insert props in curly brackets into template: {{prop}}
export default (template: string, props: any) => {
  const regexp = /{{(.*?)}}/g;
  const matches = template.match(regexp);

  return matches
    ? template.split(regexp).map(
      (chunk: string) => (props[chunk] != null ? props[chunk] : `${chunk}`),
    ).join('') : template;
};
