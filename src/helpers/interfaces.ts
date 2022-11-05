export type Props = {
  children: React.ReactNode;
};

export type ILink = {
  rel: string;
  uri: string;
  methods: string;
};

export interface IObjectImage {
  type: "Image";
  id: number;
  title: string;
  author: string;
  price: number;
  created_at: string;
  main_attachment: {
    big: string;
    small: string;
  };
  likes_count: number;
  liked: boolean;
  links: ILink[];
}
