import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { rule, addRule, updateRule, removeRule, getBooks, GetBooks_Test, borrowBooks, getUsers} from '@/services/ant-design-pro/api';

const TableList: React.FC = () => {

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserInf>();

/** 国际化配置 */
const intl = useIntl();

const columns: ProColumns<API.UserInf>[] = [
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


]
  return (
    <PageContainer>
      <ProTable<API.UserInf>
        headerTitle={intl.formatMessage({
          id: '用户信息',
          defaultMessage: '用户信息',
        })}

        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}

        // request={rule}
        request = {getUsers}
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
        {currentRow?.id && (
          <ProDescriptions<API.UserInf>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},                    
            })}
            // params={{
            //   id: currentRow?.bookID,
            // }}
            columns={columns as ProDescriptionsItemProps<API.UserInf>[]}
          >
          </ProDescriptions>
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
