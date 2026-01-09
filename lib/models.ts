export type Project = {
  id: string;
  title: string;
  description: string;
  timeline: string;
  highlights: string[];
  stack: string[];
  urls: {
    blogPost: string;
    github: string;
    landingPage: string;
  };
};

export type Content = {
  id: string;
  label: string;
  url: string;
};
