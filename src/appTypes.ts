import { ObjectId } from 'mongodb';

export type paginationCriteriaType = {
  searchLoginTerm : string | null;
  bodySearchTerm : string | null;
  searchEmailTerm : string | null;
  searchNameTerm: string | null;
  pageNumber: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  pageSize: number;
  banStatus : "all" | "banned" | "notBanned"
};
export enum sortDirectionEnum {
  asc = 'asc',
  desc = 'desc',
}
export type APIErrorResultType = {
  errorsMessages: FieldErrorType[];
};
export type FieldErrorType = {
  message: string | null; // Message with error explanation for certain field
  field: string | null; // What field/property of input model has error
};
export type sortDirectionType = 1 | -1;
export type usersPaginationCriteriaType = {
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
  searchLoginTerm: string | null;
  searchEmailTerm: string | null;
};
export type userViewModelPaginationType = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: userViewModel[];
};
export type userViewModel = {
  _id: ObjectId;
  accountData: {
    login: string;
    email: string;
    createdAt: Date;
  };
  accountConfirmationData:
    | {
        isConfirmed: true;
        code: null;
        codeDateOfExpiary: null;
      }
    | {
        isConfirmed: false;
        code: string;
        codeDateOfExpiary: Date;
      };
};
export type userInputModel = {
  accountData: {
    login: string;
    email: string;
    createdAt: Date;
    password: string;
  };
  accountConfirmationData:
    | {
        isConfirmed: true;
        code: null;
        codeDateOfExpiary: null;
      }
    | {
        isConfirmed: false;
        code: string;
        codeDateOfExpiary: Date;
      };
};
export type LoginInputModel = {
  loginOrEmail: string;
  password: string;
};
export enum parentModel {
  comment = 'comment',
  post = 'post',
}
export type DeviceViewModel = {
  ip: string; // string IP address of device during signing in
  title: string; // string Device name: for example Chrome 105 (received by parsing http header "user-agent"
  lastActiveDate: string; // string Date of the last generating of refresh/access tokens
  deviceId: ObjectId; // string Id of connected device session
};
export type DeviceInputModel = {
  ip: string; // string IP address of device during signing in
  title: string; // string Device name: for example Chrome 105 (received by parsing http header "user-agent"
  lastActiveDate: string; // string Date of the last generating of refresh/access tokens
};
export type SessionsViewModel = {
  _id: ObjectId;
  userId: ObjectId;
  device: DeviceViewModel;
  refreshToken: string;
};
export type SessionsInputModel = {
  userId: ObjectId;
  device: DeviceViewModel;
  refreshToken: string;
};
export type RequestsDBModel = {
  ip: string;
  device: string;
  lastActiveDate: Date;
  baseUrl: string;
};
