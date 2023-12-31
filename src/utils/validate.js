// 手機號碼
  export const reg_phoneType = (val) => {
    const validate = /\d{4}\d{3}\d{3}/
    return validate.test(val)
  }
  
  // 帳號是否合法 (字母開頭，允許下底線，6~16碼)
  
  export const reg_account = (val) => {
    const validate = /^[a-zA-Z][a-zA-Z0-9_]{5,16}$/
    return validate.test(val)
  }
  
  // 中低強度的密碼，只能包含數字、字母、下底線，6~18碼
  
  export const reg_pwdCommon = (val) => {
    const validate = /^[a-zA-Z][a-zA-Z0-9_]{5,16}$/
    return validate.test(val)
  }
  
  // 高強度密碼，包含特殊字元，需含有大小寫和數字，8~18碼
  
  export const reg_pwdStrong = (val) => {
    const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,18}$/
    return validate.test(val)
  }
  
  // Email

  export const reg_email = (val) => {
    // eslint-disable-next-line 
    const validate = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    return validate.test(val)
  }
  