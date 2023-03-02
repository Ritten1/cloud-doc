import React, { useState, useEffect, useRef } from "react";
import { Button, Input } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import useKeyPress from "../hooks/useKeyPress";

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false); // 输入框状态
  const [value, setValue] = useState(""); // 输入框文案

  const node = useRef(null);

  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);

  const closeSearch = () => {
    setInputActive(false);
    setValue("");
  };

  useEffect(() => {
    if (!inputActive) return;

    if (enterPressed) onFileSearch(value);

    if (escPressed) closeSearch();
  });

  useEffect(() => {
    if (inputActive) node.current.focus();
  }, [inputActive]);

  return (
    <div>
      {!inputActive ? (
        <div className="fx--between-center">
          <div className="single-text-overflow">{title}</div>
          <Button
            onClick={(e) => {
              setInputActive(true);
            }}
          >
            <SearchOutlined />
          </Button>
        </div>
      ) : (
        <div className="fx--between-center">
          <Input
            className="single-text-overflow"
            placeholder="请输入你要搜索的文件名"
            bordered={false}
            value={value}
            ref={node}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Button onClick={closeSearch}>
            <CloseOutlined />
          </Button>
        </div>
      )}
    </div>
  );
};

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired,
};

FileSearch.defaultProps = {
  title: "hello world",
};

export default FileSearch;
