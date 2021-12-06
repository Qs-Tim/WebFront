import {
    // AlipayCircleOutlined,
    LockOutlined,
  // PlusOutlined,
    // MobileOutlined,
    // TaobaoCircleOutlined,
    UserOutlined,
    // WeiboCircleOutlined,
  } from '@ant-design/icons';
  import { Alert, Button, message, Tabs } from 'antd';
  import React, { useState } from 'react';
//   import 'whatwg-fetch';
  import ProForm, { ModalForm, ProFormCheckbox, ProFormDatePicker, ProFormDateRangePicker, ProFormSelect, ProFormText } from '@ant-design/pro-form';
  import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
  import { changePass, login, register } from '@/services/ant-design-pro/api';
  // import { getFakeCaptcha } from '@/services/ant-design-pro/login';
  
  import styles from './index.less';
// import { request } from '@/app';
  
// function getCookie(cname)
// {
//   var name = cname + "=";
//   var ca = document.cookie.split(';');
//   for(var i=0; i<ca.length; i++) 
//   {
//     var c = ca[i].trim();
//     if (c.indexOf(name)==0) return c.substring(name.length,c.length);
//   }
//   return "";
// }

  const LoginMessage: React.FC<{
    content: string;
  }> = ({ content }) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
  
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const goto = () => {
    if (!history) return;
    setTimeout(() => {
      const { query } = history.location;
      const { redirect } = query as { redirect: string };
      history.push(redirect || '/');
    }, 10);
  };
  
  const Login: React.FC = () => {
    const [submitting, setSubmitting] = useState(false);
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');
    const { initialState, setInitialState } = useModel('@@initialState');
  
    const intl = useIntl();
  
    const fetchUserInfo = async () => {
      const userInfo = await initialState?.fetchUserInfo?.();
      if (userInfo) {
        setInitialState({
          ...initialState,
          currentUser: userInfo,
        });
      }
    };
  
    const handleSubmit = async (values: API.LoginParams) => {
      setSubmitting(true);
      try {
        // 登录(接受参数)
        const msg = await login({ ...values});
        if (msg.status === 'ok') {
          const defaultloginSuccessMessage = intl.formatMessage({
            id: 'pages.login.success',
            defaultMessage: '登录成功！',
          });
          message.success(defaultloginSuccessMessage);
          document.cookie = "token="+msg.token;
          document.cookie = "username="+msg.username;
          document.cookie = "access="+msg.currentAuthority;
          await fetchUserInfo();

          // window.alert(getCookie("token"));

          goto();
          return;
        }
        // 如果失败去设置用户错误信息
        setUserLoginState(msg);
      } catch (error) {
        const defaultloginFailureMessage = intl.formatMessage({
          id: 'pages.login.failure',
          defaultMessage: '登录失败，请重试！',
        });
  
        message.error(defaultloginFailureMessage);
      }
      setSubmitting(false);
    };
    const { status } = userLoginState;
  
    return (
      <div className={styles.container}>
        <div className={styles.lang}>{SelectLang && <SelectLang />}</div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src="/logo.svg" />
                <span className={styles.title}>图书管理系统</span>
              </Link>
            </div>
            <div className={styles.desc}>
              {intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
            </div>
          </div>
  
          <div className={styles.main}>
            <ProForm
              initialValues={{
                autoLogin: true,
              }}
              submitter={{
                searchConfig: {
                  submitText: intl.formatMessage({
                    id: 'pages.login.submit',
                    defaultMessage: '登录',
                  }),
                },
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                  loading: submitting,
                  size: 'large',
                  style: {
                    width: '100%',
                  },
                },
              }}
            //   传参
              onFinish={async (values) => {
                handleSubmit(values as API.LoginParams);
              }}
            >

              <Tabs activeKey={type} onChange={setType}>
                <Tabs.TabPane
                  key="account"
                  tab={intl.formatMessage({
                    id: 'pages.login.accountLogin.tab',
                    defaultMessage: '账户密码登录',
                  })}
                />

              </Tabs>
  
              {status === 'error' && (
                <LoginMessage
                  content={intl.formatMessage({
                    id: 'pages.login.accountLogin.errorMessage',
                    defaultMessage: '账户或密码错误（admin/ant.design)',
                  })}
                />
              )}
              {type === 'account' && (
                <>
                  <ProFormText
                    name="username"
                    fieldProps={{
                      size: 'large',
                      prefix: <UserOutlined className={styles.prefixIcon} />,
                    }}
                    placeholder={intl.formatMessage({
                      id: 'pages.login.username.placeholder',
                      defaultMessage: '用户名: admin or user',
                    })}
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="pages.login.username.required"
                            defaultMessage="请输入用户名!"
                          />
                        ),
                      },
                    ]}
                  />
                  <ProFormText.Password
                    name="password"
                    fieldProps={{
                      size: 'large',
                      prefix: <LockOutlined className={styles.prefixIcon} />,
                    }}
                    placeholder={intl.formatMessage({
                      id: 'pages.login.password.placeholder',
                      defaultMessage: '密码: ant.design',
                    })}
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="pages.login.password.required"
                            defaultMessage="请输入密码！"
                          />
                        ),
                      },
                    ]}
                  />
                </>
              )}
              <div
                style={{
                  marginBottom: 24,
                }}
              >
          
                <ProFormCheckbox noStyle name="isAdmin">
                  <FormattedMessage id="pages.login.judgeAdmin" defaultMessage="是否管理员" />
                </ProFormCheckbox>
                <a
                  style={{
                    float: 'right',
                  }}
                >
      
      <ModalForm<{
      name: String;
      ID: String;
      birthday: Date;
      userType: String;
      password: String;
    }>
      title="注册"
      trigger={
        <Button type="link">
          注册
        </Button>
      }
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onFinish={async (values) => {
        // await waitTime(2000);
        // console.log(values.name);
        register(values as API.RegisterParams);
        // message.success('提交成功');
        
        return true;
      }}
    >
      {/* <ProForm.Group> */}
        
      <ProFormText 
          width="md" 
          name="ID" 
          label="ID号" 
          placeholder="请输入ID"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="ID是必填项"
                  defaultMessage="请输入ID!"
                />
              ),
            },
          ]} />

      <ProFormText.Password
          width="md" 
          name="password" 
          label="密码" 
          placeholder="请输入密码"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="密码是必填项"
                  defaultMessage="请输入密码!"
                />
              ),
            },
          ]} />

        <ProFormText
          width="sm"
          name="name"
          label="姓名"
          tooltip="最长为 4 位"
          placeholder="请输入姓名"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="姓名是必填项"
                  defaultMessage="请输入姓名!"
                />
              ),
            },
          ]}
        />

        <ProFormDatePicker 
        name="birthday" 
        label="出生日期"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="生日是必填项"
                defaultMessage="请输入生日!"
              />
            ),
          },
        ]} />
      {/* </ProForm.Group> */}
      {/* <ProForm.Group> */}
        <ProFormSelect
          options={[
            {
              value: 'user',
              label: '普通用户',
            },

            {
              value: 'admin',
              label: '管理员',
            },
          ]}
          width="xs"
          name="userType"
          label="用户类别"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="用户类别是必填项"
                  defaultMessage="请输入用户类别!"
                />
              ),
            },
          ]}
        />
    </ModalForm>

    <ModalForm<{
      ID: String;
      userType: String;
      password: String;
    }>
      title="忘记密码"
      trigger={
        <Button type="link">
          忘记密码
        </Button>
      }
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onFinish={async (values) => {
        changePass(values as API.RegisterParams);
        
        return true;
      }}
    >
        
      <ProFormText 
          width="md" 
          name="ID" 
          label="ID号" 
          placeholder="请输入ID"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="ID是必填项"
                  defaultMessage="请输入ID!"
                />
              ),
            },
          ]} />

      <ProFormText.Password
          width="md" 
          name="password" 
          label="新密码" 
          placeholder="请输入新的密码"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="密码是必填项"
                  defaultMessage="请输入密码!"
                />
              ),
            },
          ]} />

        <ProFormSelect
          options={[
            {
              value: 'user',
              label: '普通用户',
            },

            {
              value: 'admin',
              label: '管理员',
            },
          ]}
          width="xs"
          name="userType"
          label="用户类别"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="用户类别是必填项"
                  defaultMessage="请输入用户类别!"
                />
              ),
            },
          ]}
        />
    </ModalForm>
                </a>
              </div>
              
            </ProForm>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  