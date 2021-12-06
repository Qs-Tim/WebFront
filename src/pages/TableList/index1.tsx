import { message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { GetBooks_Test, borrowBooks } from '@/services/ant-design-pro/api';

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
            let result = borrowBooks({key});

            if(result)
                message.success("借阅成功");
            else
                message.error("借阅失败");
            location.reload(true);
            setCurrentRow(record);
          }}
        >借阅</a>
      ],
    },

]
  return (
    <PageContainer>
      <ProTable<API.Book>
        headerTitle={intl.formatMessage({
          id: '找书',
          defaultMessage: '找书',
        })}

        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}

        // request={rule}
        request = {GetBooks_Test}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
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
            // params={{
            //   id: currentRow?.bookID,
            // }}
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