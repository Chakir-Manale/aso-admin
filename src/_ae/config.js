export const CONFIG = {
  ROLES: {
    SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
    ADMIN: 'ROLE_ADMIN',
    SHIPPER: "ROLE_SHIPPER",
    CUSTOMER: "ROLE_CUSTOMER"
  },
  auth: {
    login: {
      google: false
    },
    register: {
      enabled: false
    },
  }
}

//fixme: duplicated
export const ROLES = CONFIG.ROLES;


