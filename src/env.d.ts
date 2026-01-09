declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL?: string;
    NEXT_PUBLIC_BASE_URL?: string;
    GEMINI_API_KEY?: string;
  }
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
