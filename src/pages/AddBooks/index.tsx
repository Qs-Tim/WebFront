import React from 'react';
import { message } from 'antd';
import ProForm, { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
import { AddBooks } from '@/services/ant-design-pro/api';

export default () => {
  return (
    <ProForm<{
      bookName: String;
      price?: number;
      introduction?: String;
      count?: number;
    }>
      onFinish={async (values) => {
        // console.log(values);
        let result = AddBooks(values);
        if(result)
          message.success('添加成功');
        else
          message.warn("添加失败！");
      }}
    >
      {/* <ProForm.Group> */}
        <ProFormText
          width="md"
          name="bookName"
          label="书名"
          // tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText width="md" name="price" label="价格" placeholder="请输入价格" />
        <ProFormText width="lg" name="introduction" label="简介" placeholder="请输入简介" />
        <ProFormText width="sm" name="count" label="数量" placeholder="请输入数量"/>
      
    </ProForm>
  );
};