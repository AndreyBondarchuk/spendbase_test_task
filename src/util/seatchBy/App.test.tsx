import filterBy from "./searchBy";
import { DataApi } from "../../types";

describe("filterBy function", () => {
  const rootFolder: DataApi = {
    name: "Root",
    type: "folder",
    uuid: "6",
    children: [
      {
        name: "Folder1",
        type: "folder",
        uuid: "5",
        children: [
          { name: "File1.txt", type: "file", uuid: "1" },
          { name: "File2.txt", type: "file", uuid: "2" },
        ],
      },
      {
        name: "Folder2",
        type: "folder",
        uuid: "7",
        children: [
          { name: "File3.txt", type: "file", uuid: "3" },
          { name: "File4.txt", type: "file", uuid: "4" },
        ],
      },
    ],
  };

  it("should return a shallow copy of the object when query is empty", () => {
    const result = filterBy(rootFolder, "");
    expect(result).toEqual(rootFolder);
    expect(result).not.toBe(rootFolder);
  });

  it("should filter the object based on the query", () => {
    const result = filterBy(rootFolder, "File1");
    expect(result).toEqual({
      name: "Root",
      type: "folder",
      uuid: "6",
      children: [
        {
          name: "Folder1",
          type: "folder",
          uuid: "5",
          children: [{ name: "File1.txt", type: "file", uuid: "1" }],
        },
      ],
    });
  });

  it("should return null when no match is found", () => {
    const result = filterBy(rootFolder, "NonExistentFile");
    expect(result).toBeNull();
  });

  it("should handle case-insensitive queries", () => {
    const result = filterBy(rootFolder, "folder2");
    expect(result).toEqual({
      children: [
        {
          children: [
            { name: "File3.txt", type: "file", uuid: "3" },
            { name: "File4.txt", type: "file", uuid: "4" },
          ],
          name: "Folder2",
          type: "folder",
          uuid: "7",
        },
      ],
      name: "Root",
      type: "folder",
      uuid: "6",
    });
  });

  it("should handle nested queries", () => {
    const result = filterBy(rootFolder, "file");
    expect(result).toEqual({
      name: "Root",
      type: "folder",
      uuid: "6",
      children: [
        {
          name: "Folder1",
          type: "folder",
          uuid: "5",
          children: [
            { name: "File1.txt", type: "file", uuid: "1" },
            { name: "File2.txt", type: "file", uuid: "2" },
          ],
        },
        {
          name: "Folder2",
          type: "folder",
          uuid: "7",
          children: [
            { name: "File3.txt", type: "file", uuid: "3" },
            { name: "File4.txt", type: "file", uuid: "4" },
          ],
        },
      ],
    });
  });

  it("should return null when the root object does not match the query", () => {
    const result = filterBy(rootFolder, "NonExistentFolder");
    expect(result).toBeNull();
  });

  it("should handle undefined or null name property in the objects", () => {
    // @ts-ignore for invalid data
    const objWithNullName: IRootFolder = { name: null, children: [] };
    const result = filterBy(objWithNullName, "query");
    expect(result).toBeNull();
  });
});
