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
    meta: {
      layout: WebsiteLayout
    },
    children: [
      {
        path: '',
        name: 'main',
        component: MainPage
      },
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
      {
        path: 'poster',
        name: 'poster',
        component: PosterPage
      },
      {
        path: 'schedule',
        name: 'schedule',
        component: SchedulePage
      },
      {
        path: 'soon',
        name: 'soon',
        component: SoonPage
      },
      {
        path: 'cinemas',
        name: 'cinemas',
        component: СinemasPage
      },
      {
        path: 'promotions',
        name: 'promotions',
        component: PromotionsPage
      },
      {
        path: 'news',
        name: 'news',
        component: NewsPage
      },
      {
        path: 'advertisement',
        name: 'advertisement',
        component: AdvertisementPage
      },
      {
        path: 'cafe',
        name: 'cafe',
        component: CafePage
      },
      {
        path: 'application',
        name: 'application',
        component: ApplicationPage
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfilePage
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