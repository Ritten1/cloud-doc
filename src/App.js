import React, { useCallback, useEffect, useState } from 'react';
import './styles.less';
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import CreateTabList from './components/CreateTabList';
import LeftMenuBtn from './components/LeftMenuBtn';
import { cloneDeep, uniqueId } from 'lodash-es';

const mockData = [
  {
    id: '1',
    title: 'first post',
    body: 'should be aware of this',
    createTime: 1677004129000,
    uniqueId: 'file_11',
  },
  {
    id: '2',
    title: 'second post',
    body: '## this is the title',
    createTime: 1677004129000,
    uniqueId: 'file_12',
  },
  {
    id: '3',
    title: 'wow~syukinmei No.1 fighting!!!',
    body: '## this is the title',
    createTime: 1677004129000,
    uniqueId: 'file_13',
  },
];

function App() {
  const dragControllerDiv = function () {
    console.log('dragControllerDiv方法挂载');
    const resize = document.getElementsByClassName('resize')[0];
    const left = document.getElementsByClassName('left-menu')[0];
    // 给拖动块添加事件
    // 鼠标点击 - 记录各种坐标
    resize.onmousedown = function (e) {
      resize.style.background = '#818181'; // 颜色改变提醒
      const startX = e.clientX; // 记录起始坐标
      const leftLeft = left.offsetWidth;
      // 鼠标拖动 - 计算活动距离
      document.onmousemove = function (e) {
        const endX = e.clientX; // 实时记录当前位置
        // endX - startX = 拖动距离。自身宽度 + 拖动距离 = 左侧域最终宽度
        let finalWidth;

        finalWidth = leftLeft + (endX - startX);

        if (finalWidth < 200) finalWidth = 200; // 设置最小宽度

        if (finalWidth > 400) finalWidth = 400; // 设置最大宽度
        left.style.width = finalWidth + 'px';
      };

      // 鼠标松开 - 删除事件
      document.onmouseup = function (e) {
        resize.style.background = '#d6d6d6';
        document.onmousemove = null;
        document.onmouseup = null;
        resize.releaseCapture && resize.releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
      };
      resize.setCapture && resize.setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
    };
  };
  useEffect(() => {
    dragControllerDiv();
  }, []);

  //====================================================
  //1.初始化一个file，将初始化的内容塞入filesList

  const getDefaultFile = () => {
    return {
      title: '',
      body: '',
      uniqueId: uniqueId('file_'),
      isNew: true,
    };
  };

  const [filesList, setFilesList] = useState([]); //所有文件
  const [activeFileBak, setactiveFileBak] = useState({}); //当前处于工作区的上一次的备份
  const [activeFile, setactiveFile] = useState({}); //当前用于编辑的内容

  const __getIndexOfUniqueId = (uniqueId, fileList) => {
    return fileList.findIndex((i) => {
      return i.uniqueId === uniqueId;
    });
  };

  useEffect(() => {
    setFilesList(mockData);
    console.log(activeFileBak, filesList, activeFile, '');
  }, [filesList, activeFile, activeFileBak, mockData]);

  /**
   * 将上一次的 activeFile 整理到filesList中 并返回新的 list
   */
  const __getAssembledFilesList = (activeFile, filesList) => {
    let fixedFilesList = cloneDeep(filesList);
    const _activedFile = cloneDeep(activeFile);
    /**
     * 根据uniqueId 找到filesList中对应的index
     *  使用splice将其替换成activeFile
     */
    /**每次整理前 都将_isNew置为false */
    const _index = __getIndexOfUniqueId(_activedFile.uniqueId, fixedFilesList);
    if (_index > -1) {
      _activedFile._isNew = false;
      fixedFilesList[_index] = _activedFile;
    }
    return fixedFilesList;
  };

  //将最新的file赋给activeFileBak、activeFile 使组件恢复到初始状态
  const _reInitFileListOfOld = useCallback(
    (newFile, activeFile, fileList) => {
      const _fileList = cloneDeep(
        __getAssembledFilesList(activeFile, fileList)
      );

      setFilesList(_fileList);
      setactiveFileBak(newFile);
      setactiveFile(cloneDeep(newFile));
    },
    [__getAssembledFilesList]
  );

  //相当于初始化，重组最新的fileList
  const initNewFile = useCallback(() => {
    const _defaultFile = getDefaultFile();
    _reInitFileListOfOld(_defaultFile, activeFile, [
      ...filesList,
      _defaultFile,
    ]);
  }, [activeFile, filesList, _reInitFileListOfOld]);

  //切换tab
  const changeActivedUniqueId = useCallback(
    (uniqueId) => {
      const _currentFile = filesList.find((i) => i.uniqueId === uniqueId);
      if (_currentFile) {
        _reInitFileListOfOld(_currentFile, activeFile, filesList);
      }
    },
    [filesList, activeFile, _reInitFileListOfOld]
  );

  const addNewFile = useCallback(() => {
    initNewFile();
  }, [initNewFile]);

  return (
    <div className="app-container vh100 flex">
      <div className="left-menu fd--c pa-little">
        <FileSearch
          title="hello! cloud-doc"
          onFileSearch={(value) => {
            console.log(value);
          }}
        />
        <FileList
          files={mockData}
          onFileClick={(id) => console.log('onFileClick', id)}
          onFileDelete={(id) => console.log('delete', id)}
          onSaveEdit={(id, newValue) => {
            console.log('onSaveEdit', { id, newValue });
          }}
        />
        <LeftMenuBtn
          onNewFile={() => addNewFile()}
          onImportFile={() => console.log('onImportFile')}
        />
      </div>
      <div className="resize fxy--center" title="收缩侧边栏">
        ⋮
      </div>
      <div className="right-main">
        <CreateTabList
          dataList={mockData}
          setActive={changeActivedUniqueId}
          activedUniqueId={activeFileBak.uniqueId}
        />
        <div>{activeFileBak.title}</div>
      </div>
    </div>
  );
}

export default App;
