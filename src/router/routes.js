import auth from './middleware/auth'
import guest from './middleware/guest'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', name: 'IndexPage', component: () => import('pages/Index.vue'), meta: {
          title: 'News Up',
          description: 'Serwis dla ludzi których pasją jest dzielenia się informacjami, problemami' +
            ' a także pomysłami. Twórz artykuły i posty grupowe na tematy które są Ci bliskie'
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('components/auth/Login.vue'),
        meta: {
          title: 'Zaloguj się',
          description: 'Zaloguj się do swojego konta',
          middleware: [guest]
        }
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('components/auth/ForgotPassword.vue'),
        meta: {
          title: 'Przypomnij hasło',
          description: '',
          middleware: [guest]
        }
      },
      {
        path: 'new-password',
        name: 'NewPassword',
        component: () => import('components/auth/NewPasswordComponent.vue'),
        meta: {
          title: 'Utwórz nowe hasło',
          description: '',
          middleware: [guest]
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('components/auth/Register.vue'),
        meta: {
          title: 'Zarejestruj się',
          description: 'Załóż konto aby móc w pełni korzystać z serwisu',
          middleware: [guest]
        }
      },
      {
        path: 'activate',
        name: 'Activate',
        component: () => import('components/auth/Activate'),
        meta: {
          title: 'Aktywuj konto',
          description: 'Aktywuj konto aby mieć pełną kontrolę nad swoim kontem',
          middleware: [auth]
        }
      },
      {
        path: 'articles/:category/:location',
        name: 'Articles',
        component: () => import('components/front/articles/ListComponent.vue'),
        meta: {
          title: 'Artykuły',
          meta: 'Artykuły z małych miast jak i ze świata. Znajdziesz tu wszystko od opowiadań po artykuły które poruszają poważne problemy'
        }
      },
      {
        path: 'article/:id/:title',
        name: 'Article',
        component: () => import('components/front/articles/ArticleComponent.vue'),
      },
      {
        path: 'user/:id',
        name: 'ProfilePage',
        component: () => import('components/front/profile/ProfilePage.vue'),
        meta: {
          middleware: [
            auth
          ]
        },
        children: [
          //
        ]
      },
      {
        path: 'peoples',
        name: 'Peoples',
        meta: {
          title: 'Społeczność',
          description: 'To wy jesteście siłą tego portalu. Znajdź ludzi którzy lubią dzielić się informacjami tak jak Ty'
        },
        component: () => import('components/front/friends/PeoplesComponent.vue')
      }
    ]
  },
  {
    path: '/profile',
    meta: {
      title: 'Twoje konto'
    },
    component: () => import('layouts/UserLayout'),
    children: [
      {
        path: '',
        name: 'Profile',
        component: () => import('pages/Profile.vue'),
        meta: {middleware: [auth]},
        title: 'Twoje konto'
      },
      {
        path: 'article/list',
        name: 'ArticlesListUser',
        component: () => import('components/user/articles/ArticlesListUser.vue'),
        meta: {
          title: 'Dodane artykuły',
          description: 'Artykuły którymi dzielisz się z innymi',
          middleware: [
            auth
          ]
        }
      },
      {
        path: 'article/create',
        name: 'AddArticleUser',
        component: () => import('components/user/articles/AddArticleUser.vue'),
        meta: {
          title: 'Dodaj artykuł',
          description: 'Jeśli chcesz się z kimś podzielić ciekawymi (nudnymi też) informacjami jesteś we właściwym miejscu',
          middleware: [
            auth
          ]
        }
      },
      {
        path: 'article/edit/:id',
        name: 'EditArticleUser',
        component: () => import('components/user/articles/EditArticleUser.vue'),
        meta: {
          title: 'Edit Article',
          middleware: [
            auth
          ]
        }
      },
      {
        path: 'settings',
        name: 'SettingsUser',
        component: () => import('components/user/settings/SettingsUserComponent.vue'),
        meta: {
          title: 'Ustawienia',
          description: 'Zmień ustawienia swojego konta',
          middleware: [
            auth
          ]
        }
      },
      {
        path: 'photos',
        name: 'PhotosUser',
        component: () => import('components/user/photos/PhotosUserComponent.vue'),
        meta: {
          title: 'Dodane zdjęcia',
          description: 'Zdjęcia którymi dzilisz się z innymi',
          middleware: [
            auth
          ]
        }
      },
      {
        path: 'friends',
        name: 'CurrentFriends',
        component: () => import('components/user/friends/CurrentFriendsComponent'),
        meta: {
          title: 'Znajomi',
          description: 'Lista Twoich znajomych',
          middleware: [
            auth
          ]
        }
      },
      {
        path: 'groups',
        name: 'GroupsUser',
        component: () => import('components/user/groups/GroupsComponent.vue'),
        meta: {
          middleware: [
            auth
          ],
          title: 'Grupy',
          description: 'Grupy do których należysz'
        }
      },
      {
        path: 'groups/create',
        name: 'CreateGroup',
        component: () => import('components/user/groups/AddGroupComponent.vue'),
        meta: {
          middleware: [
            auth
          ],
          title: 'Utwórz grópę',
          description: 'Utwórz grupę i udostępniaj informację określonej społeczności'
        }
      },
      {
        path: 'groups/edit/:id',
        name: 'EditGroup',
        component: () => import('components/user/groups/EditGroupComponent.vue'),
        meta: {
          middleware: [
            auth
          ]
        }
      },
      {
        path: 'groups/preview/:id/:name',
        name: 'PreviewGroup',
        component: () => import('components/user/groups/PreviewGroupComponent.vue'),
        meta: {
          middleware: [
            auth
          ]
        }
      },
      {
        path: 'logout',
        name: 'LogoutUser',
        component: () => import('components/user/LogoutUser.vue'),
        meta: {
          title: 'Logout',
          middleware: [
            auth
          ]
        }
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}
export default routes
