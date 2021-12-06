import { message, Drawer, Alert } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { GetBooks_Test, borrowBooks, addExistedBooks } from '@/services/ant-design-pro/api';

const TableList: React.FC = () => {

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Book>();
//   const [selectedRowsState, setSelectedRows] = useState<API.Book[]>([]);

/** 国际化配置 */
const intl = useIntl();

const columns: ProColumns<API.Book>[] = [
    {
        title: '书号',
        dataIndex: 'bookID',
        tip: '书号是唯一的标识',
        width: 48,
    },

    {
      title: '书名',
      dataIndex: 'bookName',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },

    {
        title: '库存数',
        dataIndex: 'count',
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="link"
          onClick={() => {
            let key = record.bookID;
            let result = addExistedBooks({key});

            if(result)
                message.success("添加成功");
            else
                message.error("添加失败");
            location.reload(true);
            setCurrentRow(record);
          }}
        >添书</a>
      ],
    },

]
  return (
    <PageContainer>
      <ProTable<API.Book>
        headerTitle={intl.formatMessage({
          id: '添加已有书籍',
          defaultMessage: '添加已有书籍',
        })}

        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}

        request = {GetBooks_Test}
        columns={columns}

      />
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.bookID && (
          <ProDescriptions<API.Book>
            column={2}
            title={currentRow?.bookID}
            request={async () => ({
              data: currentRow || {},                    
            })}

            columns={columns as ProDescriptionsItemProps<API.Book>[]}
          >
            <ProDescriptions.Item label="价格" dataIndex="price"/>
            <ProDescriptions.Item label="简介" dataIndex="introduction"/>
            <ProDescriptions.Item label="入库时间" dataIndex="inTime"/>
          </ProDescriptions>
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;