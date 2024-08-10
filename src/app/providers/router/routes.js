// router vue guard
import { AdminLayout, WebsiteLayout } from "@/components/templates/layouts"


import {
  BannersPage,
  CinemasPage,
  CinemasCardCinemaPage,
  CinemasCardHallPage,
  MoviesPage,
  MovieCreatePage,
  NewsCreatePage,
  NewsletterPage,
  StatisticsPage,
  StockPage,
  StockCreatePage,
  UsersPage,
  OneUserPage
} from '@/components/pages/admin'

import {
  MainPage,
  AuthPage,
  RegistrationPage
} from "@/components/pages/website"


export const routes = [
  { 
    path: '/',
    name: 'main',
    component: MainPage,
    meta: {
      layout: WebsiteLayout
    }, 
    children: [
      {
        path: 'authentication',
        name: 'authentication',
        component: AuthPage
      },
      {
        path: 'registration',
        name: 'registration',
        component: RegistrationPage
      },
    ]
  },
  { 
    path: '/admin',
    meta: {
      layout: AdminLayout
    }, 
    children: [
      {
        path: 'statistics',
        name: 'statistics',
        component: StatisticsPage
      },
      {
        path: 'banners',
        name: 'banners',
        component: BannersPage
      },
      {
        path: 'movies',
        name: 'movies',
        component: MoviesPage
      },
      {
        path: 'movies-create',
        name: 'movies-create',
        component: MovieCreatePage
      },
      {
        path: 'cinemas',
        name: 'cinemas',
        component: CinemasPage
      },
      {
        path: 'cinemas-card-cinema',
        name: 'cinemas-card-cinema',
        component: CinemasCardCinemaPage
      },
      {
        path: 'cinemas-card-hall',
        name: 'cinemas-card-hall',
        component: CinemasCardHallPage
      },
      {
        path: 'newsletter',
        name: 'newsletter',
        component: NewsletterPage
      },
      {
        path: 'stock',
        name: 'stock',
        component: StockPage
      },
      {
        path: 'stock-create',
        name: 'stock-create',
        component: StockCreatePage
      },
      {
        path: 'users',
        name: 'users',
        component: UsersPage
      },
      {
        path: 'user/:id',
        name: 'user',
        component: OneUserPage
      }
    ]
  },
]


// export const routes = [
//   {
//     path: '/',
//     name: 'main',
//     component: () => import('@/pages/website/MainPage.vue'),
//     // meta: {
//     //   layout: WebsiteLayout
//     // }
//   },
//   {
//     path: '/auth',
//     name: 'auth',
//     component: AuthPage,
//     // meta: {
//     //   layout: WebsiteLayout
//     // }
//   },
//   {
//     path: '/registration',
//     name: 'registration',
//     component: RegistrationPage,
//     // meta: {
//     //   layout: WebsiteLayout
//     // }
//   },
//   {
//     path: '/admin',
//     // meta: {
//     //   layout: AdminLayout
//     // },
//     children: [
//       {
//         path: 'statistics',
//         name: 'statistics',
//         component: StatisticsPage
//       },
//       {
//         path: 'pages',
//         name: 'pages',
//         component: PagesPage
//       },
//       {
//         path: 'pages/home-page',
//         name: 'home-page',
//         component: HomePage
//       },
//       {
//         path: 'pages/about-cinema-page',
//         name: 'about-cinema-page',
//         component: AboutCinemaPage
//       },
//       {
//         path: 'pages/cafe-bar',
//         name: 'cafe-bar',
//         component: CafeBar
//       },
//       {
//         path: 'pages/vip-hall',
//         name: 'vip-hall',
//         component: VipHall
//       },
//       {
//         path: 'pages/advertising',
//         name: 'advertising',
//         component: Adverticing
//       },
//       {
//         path: 'pages/children-room',
//         name: 'children-room',
//         component: ChildrenRoom
//       },
//       {
//         path: 'banners',
//         name: 'banners',
//         component: BannersPage
//       },
//       {
//         path: 'news',
//         name: 'news',
//         component: NewsPage
//       },
//       {
//         path: 'news-create',
//         name: 'news-create',
//         component: NewsCreate
//       },
//       {
//         path: 'movies',
//         name: 'movies',
//         component: MoviesPage
//       },
//       {
//         path: 'movies-create',
//         name: 'movies-create',
//         component: MovieCreate
//       },
//       {
//         path: 'cinemas',
//         name: 'cinemas',
//         component: CinemasPage
//       },
//       {
//         path: 'cinemas-card-cinema',
//         name: 'cinemas-card-cinema',
//         component: CinemasCardCinema
//       },
//       {
//         path: 'cinemas-card-hall',
//         name: 'cinemas-card-hall',
//         component: CinemasCardHall
//       },
//       {
//         path: 'newsletter',
//         name: 'newsletter',
//         component: NewsletterPage
//       },
//       {
//         path: 'stock',
//         name: 'stock',
//         component: StockPage
//       },
//       {
//         path: 'stock-create',
//         name: 'stock-create',
//         component: StockCreate
//       },
//       {
//         path: 'users',
//         name: 'users',
//         component: UsersPage
//       },
//       {
//         path: 'user/:id',
//         name: 'user',
//         component: OneUser
//       }
//     ]
//   }
// ]
