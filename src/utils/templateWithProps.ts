import { isArray } from '.';

// insert props in curly brackets into template: {{prop}}
export default (template: string, props: any) => {
  const regexp = /{{(.*?)}}/g;
  const matches = template.match(regexp);

  return matches
    ? template.split(regexp).map(
      (chunk: string) => {
        if (props[chunk] != null) {
          return isArray(props[chunk]) ? props[chunk].join('') : props[chunk];
        }
        return `${chunk}`;
      },
    ).join('') : template;
};
