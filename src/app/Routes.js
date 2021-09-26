import React, {Suspense, useEffect} from "react";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {ContentRoute, Layout, LayoutSplashScreen} from "../_metronic/layout";
import ErrorsPage from "./pages/ErrorsPages/ErrorsPage";
import {useIntl} from "react-intl";
import {SITE_NAME} from "../_ae/helpers/UIHelper";
import {matchPath} from "react-router";
import {AuthLayout, ForgotPassword, Login, Logout, Registration, ResetPassword} from "./modules/Auth";
import {fetchRoutesForApp, useRoutesForAppState} from "../redux/routes";
import {ICONS} from "../_ae/components/svg";
import {EditPassword, EditProfile} from "./modules/Profile";
import {UsersDelete, UsersEdit, UsersList} from "./modules/Users";
import {LocationsDelete, LocationsEdit, LocationsList} from "./modules/Areas";
import {RolesDelete, RolesEdit, RolesList} from "./modules/Roles";
import {MODULES, VIEWS} from "../_ae/helpers/RoutingHelpers";
import {CategoriesList, CategoryDelete, CategoryEdit} from "./modules/Categories";
import {PostDelete, PostEdit, PostsList} from "./modules/Posts";
import {AttributeDelete, AttributeEdit, AttributesList} from "./modules/Attributes";
import {ProductDelete, ProductDetail, ProductEdit, ProductsList} from "./modules/Products";
import {VariantDelete, VariantEdit} from "./modules/Variants";
import {VendorDelete, VendorEdit, VendorsList} from "./modules/Vendors";
import {StockOrdersDetail, StockOrdersEdit, StockOrdersList} from "./modules/StockOrders";
import {BannerDelete, BannerEdit, BannersList} from "./modules/Banners";
import {SaleDelete, SaleEdit, SalesList} from "./modules/Sales";
import {PacksDelete, PacksEdit, PacksList} from "./modules/Packs";
import {OrdersDetail, OrdersEdit, OrdersList} from "./modules/Orders";


export const ROUTES = [
  {
    routeKey: 'AUTH.LOGIN',
    path: `/auth/login`,
    component: Login,
    context: 'auth',
    views: []
  },
  {
    routeKey: 'AUTH.REGISTER',
    path: `/auth/registration`,
    component: Registration,
    context: 'auth',
    views: []
  },
  {
    routeKey: 'AUTH.FORGOT',
    path: `/auth/password/forgot`,
    component: ForgotPassword,
    context: 'auth',
    views: []
  },
  {
    routeKey: 'AUTH.RESET',
    path: `/auth/password/reset/:token`,
    component: ResetPassword,
    context: 'auth',
    views: []
  },
  // Profile
  {
    routeKey: 'USER.PROFILE.EDIT',
    path: `/${MODULES.PROFILE}/edit`,
    svg: ICONS.EDIT,
    component: EditProfile,
    context: MODULES.PROFILE,
    views: []
  },
  {
    routeKey: 'USER.PASSWORD.EDIT',
    path: `/${MODULES.PROFILE}/password/edit`,
    svg: ICONS.EDIT,
    component: EditPassword,
    context: MODULES.PROFILE,
    views: []
  },
  // users
  {
    routeKey: 'USERS.NEW',
    path: `/${MODULES.USERS}/new`,
    svg: ICONS.ADD_USER,
    component: UsersEdit,
    context: MODULES.USERS,
    views: [VIEWS.ACTION]
  },
  {
    routeKey: 'USERS.EDIT',
    path: `/${MODULES.USERS}/:id/edit`,
    svg: ICONS.EDIT,
    component: UsersEdit,
    context: MODULES.USERS,
    views: []
  },
  {
    routeKey: 'USERS.DELETE',
    path: `/${MODULES.USERS}/:id/delete`,
    svg: ICONS.USERS_DELETE,
    component: UsersDelete,
    context: MODULES.USERS,
    views: [VIEWS.DIALOG]
  },
  {
    routeKey: 'USERS.LIST',
    path: `/${MODULES.USERS}/list`,
    svg: ICONS.USERS,
    component: UsersList,
    context: MODULES.USERS,
    views: [VIEWS.MENU, VIEWS.ACTION]
  },
  // locations
  {
    routeKey: 'AREAS.NEW',
    path: `/${MODULES.AREAS}/new`,
    svg: ICONS.PLUS,
    component: LocationsEdit,
    context: MODULES.AREAS,
    views: [VIEWS.ACTION]
  },
  {
    routeKey: 'AREAS.EDIT',
    path: `/${MODULES.AREAS}/:id/edit`,
    svg: ICONS.EDIT,
    component: LocationsEdit,
    context: MODULES.AREAS,
    views: []
  },
  {
    routeKey: 'AREAS.DELETE',
    path: `/${MODULES.AREAS}/:id/delete`,
    svg: ICONS.DELETE,
    component: LocationsDelete,
    context: MODULES.AREAS,
    views: [VIEWS.DIALOG]
  },
  {
    routeKey: 'AREAS.LIST',
    path: `/${MODULES.AREAS}/list`,
    svg: ICONS.AREA,
    component: LocationsList,
    context: MODULES.AREAS,
    views: [VIEWS.MENU, VIEWS.ACTION]
  },
  // Roles
  {
    routeKey: 'ROLES.NEW',
    path: `/${MODULES.ROLES}/new`,
    svg: ICONS.PLUS,
    component: RolesEdit,
    context: MODULES.ROLES,
    views: [VIEWS.ACTION]
  },
  {
    routeKey: 'ROLES.EDIT',
    path: `/${MODULES.ROLES}/:id/edit`,
    svg: ICONS.EDIT,
    component: RolesEdit,
    context: MODULES.ROLES,
    views: []
  },
  {
    routeKey: 'ROLES.DELETE',
    path: `/${MODULES.ROLES}/:id/delete`,
    svg: ICONS.DELETE,
    component: RolesDelete,
    context: MODULES.ROLES,
    views: [VIEWS.DIALOG]
  },
  {
    routeKey: 'ROLES.LIST',
    path: `/${MODULES.ROLES}/list`,
    svg: ICONS.ROLES,
    component: RolesList,
    context: MODULES.ROLES,
    views: [VIEWS.MENU, VIEWS.ACTION]
  },
  // Categories
  {
    routeKey: 'CATEGORIES.NEW',
    path: `/${MODULES.CATEGORIES}/new`,
    svg: ICONS.PLUS,
    component: CategoryEdit,
    context: MODULES.CATEGORIES,
    views: [VIEWS.ACTION]
  },
  {
    routeKey: 'CATEGORIES.EDIT',
    path: `/${MODULES.CATEGORIES}/:id/edit`,
    svg: ICONS.EDIT,
    component: CategoryEdit,
    context: MODULES.CATEGORIES,
    views: []
  },
  {
    routeKey: 'CATEGORIES.DELETE',
    path: `/${MODULES.CATEGORIES}/:id/delete`,
    svg: ICONS.DELETE,
    component: CategoryDelete,
    context: MODULES.CATEGORIES,
    views: [VIEWS.DIALOG]
  },
  {
    routeKey: 'CATEGORIES.LIST',
    path: `/${MODULES.CATEGORIES}/list`,
    svg: ICONS.CATEGORIES,
    component: CategoriesList,
    context: MODULES.CATEGORIES,
    views: [VIEWS.MENU, VIEWS.ACTION]
  },
  // Posts
  {
    routeKey: 'POSTS.NEW',
    path: `/${MODULES.POSTS}/new`,
    svg: ICONS.PLUS,
    component: PostEdit,
    context: MODULES.POSTS,
    views: [VIEWS.ACTION]
  },
  {
    routeKey: 'POSTS.EDIT',
    path: `/${MODULES.POSTS}/:id/edit`,
    svg: ICONS.EDIT,
    component: PostEdit,
    context: MODULES.POSTS,
    views: []
  },
  {
    routeKey: 'POSTS.DELETE',
    path: `/${MODULES.POSTS}/:id/delete`,
    svg: ICONS.DELETE,
    component: PostDelete,
    context: MODULES.POSTS,
    views: [VIEWS.DIALOG]
  },
  {
    routeKey: 'POSTS.LIST',
    path: `/${MODULES.POSTS}/list`,
    svg: ICONS.POSTS,
    component: PostsList,
    context: MODULES.POSTS,
    views: [VIEWS.MENU, VIEWS.ACTION]
  },
  // Attributes
  {
    routeKey: 'ATTRIBUTES.NEW',
    path: `/${MODULES.ATTRIBUTES}/new`,
    svg: ICONS.PLUS,
    component: AttributeEdit,
    context: MODULES.ATTRIBUTES,
    views: [VIEWS.ACTION]
  },
  {
    routeKey: 'ATTRIBUTES.EDIT',
    path: `/${MODULES.ATTRIBUTES}/:id/edit`,
    svg: ICONS.EDIT,
    component: AttributeEdit,
    context: MODULES.ATTRIBUTES,
    views: []
  },
  {
    routeKey: 'ATTRIBUTES.DELETE',
    path: `/${MODULES.ATTRIBUTES}/:id/delete`,
    svg: ICONS.DELETE,
    component: AttributeDelete,
    context: MODULES.ATTRIBUTES,
    views: [VIEWS.DIALOG]
  },
  {
    routeKey: 'ATTRIBUTES.LIST',
    path: `/${MODULES.ATTRIBUTES}/list`,
    svg: ICONS.ATTRIBUTES,
    component: AttributesList,
    context: MODULES.ATTRIBUTES,
    views: [VIEWS.MENU, VIEWS.ACTION]
  },
  // Vendors
  {
    routeKey: 'VENDORS.NEW',
    path: `/${MODULES.VENDORS}/new`,
    svg: ICONS.PLUS,
    component: VendorEdit,
    context: MODULES.VENDORS,
    views: [VIEWS.ACTION]
  },
  {
    routeKey: 'VENDORS.EDIT',
    path: `/${MODULES.VENDORS}/:id/edit`,
    svg: ICONS.EDIT,
    component: VendorEdit,
    context: MODULES.VENDORS,
    views: []
  },
  {
    routeKey: 'VENDORS.DELETE',
    path: `/${MODULES.VENDORS}/:id/delete`,
    svg: ICONS.DELETE,
    component: VendorDelete,
    context: MODULES.VENDORS,
    views: [VIEWS.DIALOG]
  },
  {
    routeKey: 'VENDORS.LIST',
    path: `/${MODULES.VENDORS}/list`,
    svg: ICONS.VENDORS,
    component: VendorsList,
    context: MODULES.VENDORS,
    views: [VIEWS.MENU, VIEWS.ACTION]
  },
  // Stock Order
  {
    routeKey: 'STOCK_ORDERS.NEW',
    path: `/${MODULES.STOCK_ORDERS}/new`,
    svg: ICONS.PLUS,
    component: StockOrdersEdit,
    context: MODULES.STOCK_ORDERS,
    views: [VIEWS.ACTION]
  },
  {
    routeKey: 'STOCK_ORDERS.EDIT',
    path: `/${MODULES.STOCK_ORDERS}/:id/edit`,
    svg: ICONS.EDIT,
    component: StockOrdersEdit,
    context: MODULES.STOCK_ORDERS,
    views: []
  },
  {
    routeKey: 'STOCK_ORDERS.DETAIL',
    path: `/${MODULES.STOCK_ORDERS}/:id/detail`,
    svg: ICONS.DETAIL,
    component: StockOrdersDetail,
    context: MODULES.STOCK_ORDERS,
    views: [VIEWS.DIALOG]
  },
  {
    routeKey: 'STOCK_ORDERS.LIST',
    path: `/${MODULES.STOCK_ORDERS}/list`,
    svg: ICONS.STOCK_ORDERS,
    component: StockOrdersList,
    context: MODULES.STOCK_ORDERS,
    views: [VIEWS.MENU, VIEWS.ACTION]
  },
  // Product
  {
    routeKey: 'PRODUCTS.NEW',
    path: `/${MODULES.PRODUCTS}/new`,
    svg: ICONS.PLUS,
    component: ProductEdit,
    context: MODULES.PRODUCTS,
    views: [VIEWS.ACTION]
  },
  {
    routeKey: 'PRODUCTS.EDIT',
    path: `/${MODULES.PRODUCTS}/:id/edit`,
    svg: ICONS.EDIT,
    component: ProductEdit,
    context: MODULES.PRODUCTS,
    views: []
  },
  {
    routeKey: 'PRODUCTS.DELETE',
    path: `/${MODULES.PRODUCTS}/:id/delete`,
    svg: ICONS.DELETE,
    component: ProductDelete,
    context: MODULES.PRODUCTS,
    views: [VIEWS.DIALOG]
  },
  {
    routeKey: 'PRODUCTS.LIST',
    path: `/${MODULES.PRODUCTS}/list`,
    svg: ICONS.PRODUCTS,
    component: ProductsList,
    context: MODULES.PRODUCTS,
    views: [VIEWS.MENU, VIEWS.ACTION]
  },
  {
    routeKey: 'PRODUCTS.DETAIL',
    path: `/${MODULES.PRODUCTS}/:id/detail`,
    svg: ICONS.VARIANTS,
    component: ProductDetail,
    context: MODULES.PRODUCTS,
    views: []
  },
  //Banners
  {
    routeKey: 'BANNERS.NEW',
    path: `/${MODULES.BANNERS}/new`,
    svg: ICONS.PLUS,
    component: BannerEdit,
    context: MODULES.BANNERS,
    views: [VIEWS.ACTION]
  },
  {
    routeKey: 'BANNERS.EDIT',
    path: `/${MODULES.BANNERS}/:id/edit`,
    svg: ICONS.EDIT,
    component: BannerEdit,
    context: MODULES.BANNERS,
    views: []
  },
  {
    routeKey: 'BANNERS.DELETE',
    path: `/${MODULES.BANNERS}/:id/delete`,
    svg: ICONS.DELETE,
    component: BannerDelete,
    context: MODULES.BANNERS,
    views: [VIEWS.DIALOG]
  },
  {
    routeKey: 'BANNERS.LIST',
    path: `/${MODULES.BANNERS}/list`,
    svg: ICONS.BANNERS,
    component: BannersList,
    context: MODULES.BANNERS,
    views: [VIEWS.MENU, VIEWS.ACTION]
  },
  // Sales
  {
    routeKey: 'SALES.NEW',
    path: `/${MODULES.SALES}/new`,
    svg: ICONS.PLUS,
    component: SaleEdit,
    context: MODULES.SALES,
    views: [VIEWS.ACTION]
  },
  {
    routeKey: 'SALES.EDIT',
    path: `/${MODULES.SALES}/:id/edit`,
    svg: ICONS.EDIT,
    component: SaleEdit,
    context: MODULES.SALES,
    views: []
  },
  {
    routeKey: 'SALES.DELETE',
    path: `/${MODULES.SALES}/:id/delete`,
    svg: ICONS.DELETE,
    component: SaleDelete,
    context: MODULES.SALES,
    views: [VIEWS.DIALOG]
  },
  {
    routeKey: 'SALES.LIST',
    path: `/${MODULES.SALES}/list`,
    svg: ICONS.SALES,
    component: SalesList,
    context: MODULES.SALES,
    views: [VIEWS.MENU, VIEWS.ACTION]
  },
  // Packs
  {
    routeKey: 'PACKS.NEW',
    path: `/${MODULES.PACKS}/new`,
    svg: ICONS.PLUS,
    component: PacksEdit,
    context: MODULES.PACKS,
    views: [VIEWS.ACTION]
  },
  {
    routeKey: 'PACKS.EDIT',
    path: `/${MODULES.PACKS}/:id/edit`,
    svg: ICONS.EDIT,
    component: PacksEdit,
    context: MODULES.PACKS,
    views: []
  },
  {
    routeKey: 'PACKS.DELETE',
    path: `/${MODULES.PACKS}/:id/delete`,
    svg: ICONS.DELETE,
    component: PacksDelete,
    context: MODULES.PACKS,
    views: [VIEWS.DIALOG]
  },
  {
    routeKey: 'PACKS.LIST',
    path: `/${MODULES.PACKS}/list`,
    svg: ICONS.PACKS,
    component: PacksList,
    context: MODULES.PACKS,
    views: [VIEWS.MENU, VIEWS.ACTION]
  },
  // Orders
  {
    routeKey: 'ORDERS.EDIT',
    path: `/${MODULES.ORDERS}/:id/edit`,
    svg: ICONS.EDIT,
    component: OrdersEdit,
    context: MODULES.ORDERS,
    views: []
  },
  {
    routeKey: 'ORDERS.DETAIL',
    path: `/${MODULES.ORDERS}/:id/detail`,
    svg: ICONS.DETAIL,
    component: OrdersDetail,
    context: MODULES.ORDERS,
    views: [VIEWS.DIALOG]
  },
  {
    routeKey: 'ORDERS.LIST',
    path: `/${MODULES.ORDERS}/list`,
    svg: ICONS.ORDERS,
    component: OrdersList,
    context: MODULES.ORDERS,
    views: [VIEWS.MENU, VIEWS.ACTION]
  },
  {
    routeKey: 'VARIANTS.NEW',
    path: `/${MODULES.VARIANTS}/new/${MODULES.PRODUCTS}/:productId`,
    svg: ICONS.PLUS,
    component: VariantEdit,
    context: MODULES.VARIANTS,
    views: []
  },
  {
    routeKey: 'VARIANTS.EDIT',
    path: `/${MODULES.VARIANTS}/:id/edit`,
    svg: ICONS.EDIT,
    component: VariantEdit,
    context: MODULES.VARIANTS,
    views: []
  },
  {
    routeKey: 'VARIANTS.DELETE',
    path: `/${MODULES.VARIANTS}/:id/delete`,
    svg: ICONS.DELETE,
    component: VariantDelete,
    context: MODULES.VARIANTS,
    views: [VIEWS.DIALOG]
  },
  // {
  //   routeKey: 'VARIANTS.LIST',
  //   path: `/${MODULES.VARIANTS}/list`,
  //   svg: ICONS.VARIANTS,
  //   component: VariantsList,
  //   context: MODULES.VARIANTS,
  //   views: [VIEWS.MENU, VIEWS.ACTION]
  // },
]

export function Routes() {
  const dispatch = useDispatch();
  const {isAuthorized, authUser} = useSelector( ({auth}) => ({ authUser: auth.user, isAuthorized: auth.user != null, }), shallowEqual );
  const {data: routes, isLoading} = useRoutesForAppState();
  const {formatMessage} = useIntl();
  const location = useLocation();
  useEffect(()=>{
      const currentRoute = routes.find(r=>matchPath(location.pathname, {path: r.path}))
      let title = SITE_NAME;
      if(currentRoute) {
        title += ` | ${formatMessage({id: currentRoute.routeKey})}`
      }

      document.title = title;
    },[routes, location.pathname])

  useEffect(()=>{
    if (authUser && location.pathname !== '/logout') {
      dispatch(fetchRoutesForApp())
    }
  },[authUser])

  //todo
  if ((isLoading || routes.length === 0) && !!authUser && location.pathname !== '/logout') {
    return <LayoutSplashScreen />
  }

  // console.log(routes, location.pathname)

  const defaultRoute = routes.find(route=>route.routeKey.includes('LIST'));

  return (
    <>
      <Switch>

        <Route path="/error" component={ErrorsPage}/>
        <Route path="/logout" component={Logout}/>

        {
          ! isAuthorized ?
            <AuthLayout >
              <Suspense fallback={<LayoutSplashScreen/>}>
                <Switch>
                  {/*FIX ME*/}
                  <Redirect exact from="/" to="/auth"/>
                  <Redirect exact from="/auth" to="/auth/login"/>
                  {
                    ROUTES
                      .filter(route=>route.context === MODULES.AUTH)
                      .map(route=>(
                        <ContentRoute
                          key={route.routeKey}
                          {...route}
                        />
                      ))
                  }
                </Switch>
              </Suspense>
            </AuthLayout> :
            <Layout>
              <Suspense fallback={<LayoutSplashScreen/>}>
                <Switch>
                  <Redirect exact from="/auth/login" to="/"/>
                  {
                    routes.length > 0 &&
                    <Redirect exact from="/" to={defaultRoute ? defaultRoute.path : routes[0].path}/>
                  }

                  {
                    Object
                      .values(MODULES)
                      .filter(key=>![MODULES.PROFILE].includes(key))
                      .map(moduleName=>(
                        <Redirect
                          key={moduleName}
                          exact
                          from={`/${moduleName}`}
                          to={`/${moduleName}/list`}
                        />
                    ))
                  }

                  {
                    routes
                      .map((route, i)=> {
                        return (
                          <ContentRoute
                            key={route.routeKey}
                            {...route}
                          />
                        )
                      })
                  }
                  <Redirect to="/error"/>
                </Switch>
              </Suspense>
            </Layout>

        }
      </Switch>
    </>
  );
}
