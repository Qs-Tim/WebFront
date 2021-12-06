// @ts-ignore
/* eslint-disable */

declare namespace API {
  type RegisterParams = {
    name?: String;
    ID?: String;
    birthday?: Date;
    userType?: String;
    password?: String;
  }

  type ChangePassParams = {
    ID?: String;
    userType?: String;
    password?: String;
  }
  
  type BookListItem = {
    key: String;
    name: String;
    containers: number;
  }
  
  type Test = {
    data?: TableListItem[];
  }

  type Result = {
    result?: boolean;
  }
  
  type BorrrwGoal = {
    key?: String;
  }

  type Book = {
    bookID?: String;
    bookName?: String;
    introduction?: String;
    count?: int;
    inTime?: Date;
    price?: int;
  }

  type BookList = {
    data?: Book[];
    /** 图书的总数 */
    total?: number;
    success?: boolean;
  }
  
  type History_BookList = {
    data?: History_Book[];
    /** 图书的总数 */
    total?: number;
    success?: boolean;
  }

  type UserInf = {
    id?: String;
    rName?: String;
    age?: Int;
    registerTime: String;
    birthday: String;
  }

  type CurrentUser = {
    name?: string;
    // avatar?: string;
    userid?: string;
    // email?: string;
    // signature?: string;
    // title?: string;
    // group?: string;
    // tags?: { key?: string; label?: string }[];
    // notifyCount?: number;
    // unreadCount?: number;
    // country?: string;
    access?: string;
  //   geographic?: {
  //     province?: { label?: string; key?: string };
  //     city?: { label?: string; key?: string };
  //   };
  //   address?: string;
  //   phone?: string;
  };

  type LoginResult = {
    status?: string;
    // type?: string;
    currentAuthority?: string;
    token?: String
    username?: String
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    isAdmin?: boolean;
    // type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
