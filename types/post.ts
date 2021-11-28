export interface Post {
  id: string;
  title: string;
  username: string;
  content: string;
  votes: number;
  type: "Text" | "Image";
  image: string | null | undefined;
}
