export class GlobalConstants{
  // Message
  public static genericError = 'Something went wrong. PLease try again later!';
  public static unathorized = 'You are not authorized person to access this page!';
  // Regex
  public static nameRegex = '[a-zA-Z0-9 ]*';
  public static emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  public static contactNumberRegex = '^[e0-9]{10,10}$';
  // Variable
  public static error = 'error';
}

export const ADD = 'add';
export const UPDATE = 'update';

export const ITEM_TYPES =[{name:'type 0', value:0},{name:'type 1', value:1}]
export const ITEM_CREATE_UPDATE_ROUTE = 'invoice-app/item-add-update'
