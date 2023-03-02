import React, { useState, useEffect, useRef } from "react";
import { List, Input, Button } from "antd";
import {
  MediumOutlined,
  DeleteFilled,
  EditFilled,
  CloseOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import useKeyPress from "../hooks/useKeyPress";

const FileList = ({ files, onFileClick, onFileDelete, onSaveEdit }) => {
  const [editStatus, setEditStatus] = useState(false); // 为编辑状态文件的id
  const [value, setValue] = useState(""); // 编辑时input的内容

  const node = useRef(null);

  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);

  const closeInput = () => {
    setEditStatus(false);
    setValue("");
  };
  useEffect(() => {
    if (!editStatus) return;

    if (enterPressed) {
      onSaveEdit(editStatus, value);
      closeInput();
    }

    if (escPressed) closeInput();
  });

  useEffect(() => {
    if (editStatus) node.current.focus();
  }, [editStatus]);
  return (
    <div className="flex-1">
      <List
        dataSource={files}
        renderItem={(item) => (
          <List.Item>
            <div className="fy--center w100">
              {item.id !== editStatus ? (
                <>
                  <MediumOutlined className="mr-small" />
                  <span
                    className="flex-1 single-text-overflow "
                    onClick={() => onFileClick(item.id)}
                  >
                    {item.title}
                  </span>
                  <div>
                    <EditFilled
                      className="mx-small"
                      onClick={() => {
                        setEditStatus(item.id);
                        setValue(item.title);
                      }}
                    />
                    <DeleteFilled onClick={() => onFileDelete(item.id)} />
                  </div>
                </>
              ) : (
                <div className="flex flex-1">
                  <Input
                    className="flex-1 single-text-overflow"
                    placeholder="请输入你要搜索的文件名"
                    bordered={false}
                    value={value}
                    ref={node}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                  <Button onClick={closeInput}>
                    <CloseOutlined />
                  </Button>
                </div>
              )}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func,
};

export default FileList;
