// router vue guard
// import { AdminLayout, WebsiteLayout } from "@/src/components/layouts"
import { AdminLayout, WebsiteLayout } from "@/components/layouts"


import {
  BannersPage,
  AdminCinemasPage,
  CinemasCardCinemaPage,
  CinemasCardHallPage,
  MoviesPage,
  MovieCreatePage,
  AdminNewsPage,
  AdminNewsCreatePage,
  NewsletterPage,
  PagesPage,
  StatisticsPage,
  StockPage,
  StockCreatePage,
  UsersPage,
  OneUserPage
} from '@/components/pages/admin'

import {
  MainPage,
  AuthPage,
  RegistrationPage,
  PosterPage,
  SchedulePage,
  SoonPage,
  СinemasPage,
  ProfilePage,
  PromotionsPage,
  NewsPage,
  AdvertisementPage,
  CafePage,
  ApplicationPage,
} from "@/components/pages/website"

export const routes = [
  {
    path: '/:locale?',
    name: 'main',
    component: MainPage,
    meta: {
      layout: WebsiteLayout
    },
  },
  {
    path: '/authentication/:locale?',
    name: 'authentication',
    component: AuthPage,
    meta: {
      layout: WebsiteLayout
    },
  },
  {
    path: '/registration/:locale?',
    name: 'registration',
    component: RegistrationPage,
    meta: {
      layout: WebsiteLayout
    },
  },
  {
    path: '/poster/:locale?',
    name: 'poster',
    component: PosterPage,
    meta: {
      layout: WebsiteLayout
    },
  },
  {
    path: '/schedule/:locale?',
    name: 'schedule',
    component: SchedulePage,
    meta: {
      layout: WebsiteLayout
    },
  },
  {
    path: '/soon/:locale?',
    name: 'soon',
    component: SoonPage,
    meta: {
      layout: WebsiteLayout
    },
  },
  {
    path: '/cinemas/:locale?',
    name: 'cinemas',
    component: СinemasPage,
    meta: {
      layout: WebsiteLayout
    },
  },
  {
    path: '/promotions/:locale?',
    name: 'promotions',
    component: PromotionsPage,
    meta: {
      layout: WebsiteLayout
    },
  },
  {
    path: '/news/:locale?',
    name: 'news',
    component: NewsPage,
    meta: {
      layout: WebsiteLayout
    },
  },
  {
    path: '/advertisement/:locale?',
    name: 'advertisement',
    component: AdvertisementPage,
    meta: {
      layout: WebsiteLayout
    },
  },
  {
    path: '/cafe/:locale?',
    name: 'cafe',
    component: CafePage,
    meta: {
      layout: WebsiteLayout
    },
  },
    {
    path: '/application/:locale?',
    name: 'application',
    component: ApplicationPage,
    meta: {
      layout: WebsiteLayout
    },
  },
  {
    path: '/profile/:locale?',
    name: 'profile',
    component: ProfilePage,
    meta: {
      layout: WebsiteLayout
    },
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
        path: 'admin-news',
        name: 'admin-news',
        component: AdminNewsPage
      },
      {
        path: 'pages',
        name: 'pages',
        component: PagesPage
      },
      {
        path: 'movies-create',
        name: 'movies-create',
        component: MovieCreatePage
      },
      {
        path: 'admin-cinemas',
        name: 'admin-cinemas',
        component: AdminCinemasPage
      },
      {
        path: 'admin-cinemas-card-cinema',
        name: 'admin-cinemas-card-cinema',
        component: CinemasCardCinemaPage
      },
      {
        path: 'admin-cinemas-card-hall',
        name: 'admin-cinemas-card-hall',
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
        path: 'user/:uid',
        name: 'user',
        component: OneUserPage
      }
    ]
  },
]