export type Item = IFile | IFolder | null;

interface IFile {
  name: string;
  type: "file";
  uuid: string;
  children?: Item[];
}

interface IFolder {
  name: string;
  type: "folder";
  uuid: string;
  children?: Item[];
}

export interface DataApi {
  name: string;
  type: "file" | "folder";
  uuid: string;
  children?: Item[];
}