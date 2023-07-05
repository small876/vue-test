import axios from 'axios'
const BASEURL = "http://127.0.0.1:3000/"

const VisitorRequest = axios.create(
  {
    baseURL: BASEURL
  }
)

const adminlogin = axios.create(
  {
    baseURL: BASEURL + "admin/"
  }
)

const UserRequest = axios.create(
  {
    baseURL: BASEURL + "user/"
  }
)

const AdminRequest = axios.create(
  {
    baseURL: BASEURL + "admin/"
  }
)


// ########################################################### visitor ##########################################################

export const GetItemList = () => {
  return VisitorRequest.get("/products")
}

export const GetItemDetail = (id) => {
  return VisitorRequest.get(`/productsdetail/${id}`)
}

export const UserLogin = (data) => {
  return VisitorRequest.post("/user/login", data)
}

VisitorRequest.interceptors.response.use((response) => {
  if (response.data['authTokenAccess']) {
    console.log(response.data['authTokenAccess'])
    localStorage.setItem("authTokenAccess", response.data['authTokenAccess'])
  } else
    return response;
},
  function (error) {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          alert('密碼錯誤')
          break
        case 401:
          alert('請重新登入')
          break
        case 500:
          alert('伺服器錯誤 請稍後再試!')
          break
        default:
          console.log(error.message)
      }
    }
    else if (!error.response) {
      alert("Error:Network Error");
      return;
    }
    return Promise.reject(error);
  }
);

// ################################# user #######################################################################

export const UserPurchase = (data) => {
  return UserRequest.post("/purchase", data)
}

export const UserUpdate = (data) => {
  return UserRequest.post("/update", data)
}

export const UserInfo = () => {
  return UserRequest.get("/userinfo")
}

export const UserRegister = (data) => {
  return UserRequest.post("/register", data)
}

UserRequest.interceptors.request.use((config) => {
  let token = localStorage.getItem("authTokenAccess")
  config.headers.Authorization = "Bearer " + token
  return config;
});

UserRequest.interceptors.response.use(function (response) {
  return response;
},
  function (error) {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          alert('密碼錯誤')
          break
        case 401:
          alert('請重新登入')
          break
        case 500:
          alert('伺服器錯誤 請稍後再試!')
          break
        default:
          console.log(error.message)
      }
    }
    else if (!error.response) {
      alert("Error:Network Error");
      return;
    }
    return Promise.reject(error);
  }
)

// ############################################### admin ################################################################

export const AdminLogin = (data) => {
  return adminlogin.post("/login", data)
}

adminlogin.interceptors.response.use((response) => {
  if (response.data['adminTokenAccess']) {
    localStorage.setItem("adminTokenAccess", response.data['adminTokenAccess'])
  } else
    return;
},
  function (error) {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          alert('密碼錯誤')
          break
        case 401:
          alert('請重新登入')
          break
        case 500:
          alert('伺服器錯誤 請稍後再試!')
          break
        default:
          console.log(error.message)
      }
    }
    else if (!error.response) {
      alert("Error:Network Error");
      return;
    }
    return Promise.reject(error);
  }
)

export const ItemLaunch = (data) => {
  return AdminRequest.post("/lunched", data)
}

export const OrderList = () => {
  return AdminRequest.get("/orderlist")
}

export const OrderFilter = (date) => {
  return AdminRequest.get(`/orderlist/${date}`)
}

export const OrderDetail = (id) => {
  return AdminRequest.get(`/orderdetail/${id}`)
}

export const OrderStatusModified = (id, data) => {
  return AdminRequest.post(`/modified/${id}`, data)
}

AdminRequest.interceptors.request.use((config) => {
  let token = localStorage.getItem("adminTokenAccess")
  config.headers.Authorization = "Bearer " + token
  return config;
})

AdminRequest.interceptors.response.use(function (response) {
  return response;
},
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          alert('請先登入')
          break
        case 403:
          alert('沒有權限')
          break
        case 500:
          alert('伺服器錯誤 請稍後再試!')
          break
        default:
          console.log(error.message)
      }
    }
    else if (!error.response) {
      alert("Error:Network Error");
      return;
    }
    return Promise.reject(error);
  }
)