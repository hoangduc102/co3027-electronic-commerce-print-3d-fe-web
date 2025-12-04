declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL?: string;
  }
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
