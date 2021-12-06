import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Descriptions, Button, Statistic, Space, Result } from 'antd';
import { ApiFilled, LikeOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import { getUserInf, getUsers } from '@/services/ant-design-pro/api';
import { ProColumns } from '@ant-design/pro-table';
import { Pie } from '@antv/g2plot';
import { IndentedTreeGraph } from '@ant-design/charts';

const content = (
  <ProDescriptions
      title="个人信息"
      request={async () => {
        let inf = getUserInf();

        return Promise.resolve({
          success: true,
          data: {
            id: (await inf).id,
            rName: (await inf).rName,
            birthday: (await inf).birthday,
            age: (await inf).age,
            registerTime: (await inf).registerTime,
          },
        });
      }}
    >
    <ProDescriptions.Item label="用户ID" dataIndex="id"/>
    <ProDescriptions.Item label="用户姓名" dataIndex="rName"/>
    <ProDescriptions.Item label="生日" dataIndex="birthday"/>
    <ProDescriptions.Item label="年龄" dataIndex="age"/>
    <ProDescriptions.Item label="注册时间" dataIndex="registerTime"/>
    </ProDescriptions>
);

const data = {
  id: '姓名',
  title: '姓名',
  body: '89,133,24',
  children: [
    {
      id: 'A1',
      title: 'ID号',
      body: '1',
      children: [
        { id: 'A11', title: '15~18', body: '89,133,24' },
        {
          id: 'A12',
          title: '18~21',
          body: '523,945,835',
        },
        { id: 'A13', title: '21~24', body: '89,133,24' },
      ],
    },
    {
      id: 'A2',
      title: '高收入',
      body: '623,945,835',
    },
  ],

};

const config = {
  data,
  autoFit: true,
  behaviors: [],
};

export default (): React.ReactNode => {
  
  return (
        <PageContainer
          content={content}
          tabList={[
            {
              tab: '基本信息',
              key: 'base',
            },
            {
              tab: '详细信息',
              key: 'info',
            },
          ]}

        >
          
          <div
            style={{
              height: '120vh',
            }}
          >
            
            <IndentedTreeGraph {...config}  onReady={(data) => getUserInf}/>;
          </div>
        </PageContainer>

  )
}
