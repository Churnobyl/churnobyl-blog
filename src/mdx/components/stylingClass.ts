export const styling = (annotations: any) => {
  return {
    "font-bold": annotations.bold,
    italic: annotations.italic,
    "line-through": annotations.strikethrough,
    "font-semibold shadow-inset-main-blue dark:shadow-inset-sub-blue":
      annotations.underline,
    "text-highlight-red dark:text-highlight-red-lighter":
      annotations.bold || annotations.code,
    "text-main-text-black dark:text-white-dark": !(
      annotations.bold || annotations.code
    ),
    "bg-gray-light": annotations.code,
    "rounded-md": annotations.code,
    "py-0": annotations.code,
    "px-1": annotations.code,
    "mx-1": annotations.code,
    "font-mono": annotations.code,
    "text-[15px]": annotations.code,
    [`text-${annotations.color}`]:
      annotations.color !== "default" && !annotations.code,
    "break-all xl:break-keep": true,
    "text-sm xl:text-base": true,
  };
};
