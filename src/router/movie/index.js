export default {
  path: '/movie',
  component: () => import('@/views/Movie'),
  children: [
    {
      path: 'city',
      component: () => import('@/components/Movie/City')
    },
    {
      path: 'nowPlaying',
      component: () => import('@/components/Movie/NowPlaying')
    },
    {
      path: 'soonPlaying',
      component: () => import('@/components/Movie/SoonPlaying')
    },
    {
      path: 'search',
      component: () => import('@/components/Movie/Search')
    },
    {
      path: 'detail/1/:movieId',
      components: {
        default: () => import('@/components/Movie/NowPlaying'),
        detail: () => import('@/views/Movie/detail')
      },
      props: {
        detail: true
      }
    },
    {
      path: 'detail/2/:movieId',
      components: {
        default: () => import('@/components/Movie/SoonPlaying'),
        detail: () => import('@/views/Movie/detail')
      },
      props: {
        detail: true
      }
    },
    {
      path: '',
      redirect: 'nowPlaying'
    }
  ]
}