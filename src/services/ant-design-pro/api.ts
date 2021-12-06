// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** test */
// export async function Post_Test(body: TableListItem[], options?: { [key: string]: any }) {
//   // return request<API.CurrentUser>('/api/currentUser', {
//     return request('/api/test', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }
/**注册 */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
    return request('/api/registeruser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  // return request<API.CurrentUser>('/api/currentUser', {
    return request<API.CurrentUser>('/api/getCurrentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加书籍 */
export async function AddBooks(body: API.Book, options?: { [key: string]: any }){
  // return request<API.Result>('api/addBooks', {
    return request<API.Result>('api/addBooks', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取所有书籍 */
export async function getBooks(
  params: {
    // query
    // /** 当前的页码 */
    // current?: number;
    // /** 页面的容量 */
    // pageSize?: number;
    keyword?: string; 

  },
  options?: { [key: string]: any },
) {
  return request<API.BookList>('/api/getBooks', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**借书 */
export async function borrowBooks(
  body: {
    key?: String;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result>('api/borrowBooks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**添加已有书籍 */
export async function addExistedBooks(
  body: {
    key?: String;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result>('api/addExistedBooks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**还书 */
export async function returnBooks(
  body: {
    key?: String;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result>('api/returnBooks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getHistory(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 查询内容 */
    keyword?: String;
  },
  options?: { [key: string]: any },
) {
  return request<API.History_BookList>('api/getHistory', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getUsers(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 查询内容 */
    keyword?: String;
  },
  options?: { [key: string]: any },
) {
  return request<API.UserInf>('api/getUsers', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getUserInf(
  // params: {
    // query
    // /** 当前的页码 */
    // current?: number;
    // /** 页面的容量 */
    // pageSize?: number;
    // /** 查询内容 */
    // keyword?: String;
  // },
  // options?: { [key: string]: any },
) {
  return request<API.UserInf>('api/getUserInf', {
    method: 'GET',
    // params: {
    //   ...params,
    // },
    // ...(options || {}),
  });
}

/** 登出接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  // return request<Record<string, any>>('/api/login/outLogin', {
    return request<Record<string, any>>('/api/login/outLogin_test', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/Testlogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**修改密码 */
export async function changePass(body: API.ChangePassParams, options?: { [key: string]: any }) {
  return request<API.Result>('/api/changePass', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  data: body,
  ...(options || {}),
});
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**获取书籍列表 */
export async function GetBooks_Test(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;

    keyword?: String;
  },
  options?: { [key: string]: any },
) {
  return request<API.BookList>('/api/getBooks_Test', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
