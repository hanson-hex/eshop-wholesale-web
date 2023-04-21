import router from './router';
//import { ElMessage } from 'element-plus';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import { isHttp } from '@/utils/validate';
import { isRelogin } from '@/utils/request';
import useUserStore from '@/store/modules/user';
import useSettingsStore from '@/store/modules/settings';
import usePermissionStore from '@/store/modules/permission';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/register'];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    to.meta.title && useSettingsStore().setTitle((<any>to).meta.title);
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      const topbarRoutersInited = usePermissionStore().isInited;
      if (!topbarRoutersInited) {
        usePermissionStore()
          .generateRoutes()
          .then((accessRoutes: any) => {
            let homePath = '';
            if (accessRoutes && accessRoutes.length > 0) {
              // 根据roles权限生成可访问的路由表
              accessRoutes.forEach((route: any) => {
                if (!isHttp(route.path)) {
                  router.addRoute(route); // 动态添加可访问路由表
                }
              });
              const routes = accessRoutes;
              const firstRoute = routes[0];
              homePath =
                firstRoute.redirect && firstRoute.redirect !== 'noRedirect'
                  ? firstRoute.redirect
                  : firstRoute.children[0].path.indexOf('/') == 0
                  ? firstRoute.children[0].path
                  : firstRoute.path + '/' + firstRoute.children[0].path;
            }
            if (to.path == '/index' || to.path === '/') {
              next({ path: homePath, replace: true });
            } else {
              next({ ...to, replace: true });
            }
          });
      } else {
        next();
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
