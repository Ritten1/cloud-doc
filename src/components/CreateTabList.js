import React, {
  FunctionComponent,
  useCallback,
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './components.css';

//连续创建的按钮组
const CreateTabList = ({ dataList, setActive, activedUniqueId }) => {
  //   /**
  //    * 切换tab到指定的uniqueId
  //    */
  const getItemClickHandler = useCallback(
    (uniqueId) => () => {
      setActive(uniqueId);
    },
    [setActive]
  );

  return (
    <div className="tab-root">
      {dataList.map((item, index) => {
        const isActive = activedUniqueId === item.uniqueId;
        return (
          <div key={item.uniqueId}>
            {isActive ? (
              <Button>{item.title}</Button>
            ) : (
              <Button onClick={getItemClickHandler(item.uniqueId)}>
                {item.title}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};
CreateTabList.propTypes = {
  dataList: PropTypes.array,
  setActive: PropTypes.func,
  activedUniqueId: PropTypes.string,
};

CreateTabList.defaultProps = {
  dataList: [],
  activedUniqueId: '',
};
export default CreateTabList;
