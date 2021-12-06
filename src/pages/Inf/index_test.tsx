import React, { useRef, useState } from 'react';
import { Button, Tooltip, Tag } from 'antd';
import { DownOutlined, QuestionCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getHistory, getUserInf, getUsers } from '@/services/ant-design-pro/api';

export type TableListItem = {
  id: String;
  rName: String;
  birthday: String;
  age: number;
  registerTime: String;
};

const columns: ProColumns<TableListItem>[] = [
  {
        title: 'ID',
        dataIndex: 'id',
        tip: 'id是唯一的标识',
        width: 48,
    },

    {
      title: '姓名',
      dataIndex: 'rName',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
            //   setCurrentRow(entity);
            //   setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },

    {
        title: '生日',
        dataIndex: 'birthday',
    },

    {
      title: '年龄',
      dataIndex: 'age',
    },

    {
      title: '注册时间',
      dataIndex: 'registerTime',
    },
];

const expandedRowRender = () => {

  return (
    <ProTable
      request = {getHistory}
      columns={[
        {
            title: '书号',
            dataIndex: 'bookID',
            tip: '书号是唯一的标识',
            width: 48,
        },
    
        {
          title: '书名',
          dataIndex: 'bookName',
        },
    
        {
            title: '借阅数',
            dataIndex: 'count',
        },
      ]}
      headerTitle={false}
      search={false}
      options={false}
      pagination={false}
    />
  );
};

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request = {getUsers}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      expandable={{ expandedRowRender }}
      search={false}
      dateFormatter="string"
      headerTitle="嵌套表格"
      options={false}

    />
  );
};
