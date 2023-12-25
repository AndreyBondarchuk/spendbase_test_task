import React, { useState, useEffect, ChangeEvent } from "react";
import TreeNode from "../TreeNode";
import { TextField } from "@mui/material";
import Skeleton from "../Skeleton";
import searchBy from "../../util/seatchBy/searchBy";
import { getFakeData } from "../../fake_api";
import { DataApi } from "../../types";
import "./App.css";

const TreeView = () => {
  // This block should be perceived as a replacement for the global structure
  // At the moment when I started adding the redux, I realized that I should stopping
  const [data, setData] = useState<DataApi | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const getData = async () => {
    try {
      const data: DataApi = await getFakeData() as DataApi;
      setData(data);
      setSearchResult(data);
      setLoading(false);
    } catch (e) {
      console.log("fake api error", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  // end block

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<DataApi | null >(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if(data) setSearchResult(searchBy(data, event.target.value));
  };

  return (
    <div className="app_container">
      {loading ? (
        <Skeleton />
      ) : (
        <React.Fragment>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleChange}
          />
          <TreeNode node={searchResult} searchTerm={searchTerm} />
        </React.Fragment>
      )}
    </div>
  );
};

export default TreeView;
