import React from "react";
import { Button, Space } from "antd";
import { PlusSquareOutlined, ImportOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const LeftMenuBtn = ({ onNewFile, onImportFile }) => {
  return (
    <Space.Compact block>
      <Button className="flex-1" onClick={onNewFile}>
        <PlusSquareOutlined />
        新建
      </Button>
      <Button className="flex-1" onClick={onImportFile}>
        <ImportOutlined />
        导入
      </Button>
    </Space.Compact>
  );
};

LeftMenuBtn.propTypes = {
  onNewFile: PropTypes.func,
  onImportFile: PropTypes.func,
};

export default LeftMenuBtn;
