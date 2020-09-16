export default {
  path: '/movie',
  component: () => import('@/views/Movie'),
  children:[
    {
      path:'city',
      component:()=>import('@/components/Movie/City')
    },
    {
      path:'nowPlaying',
      component:()=>import('@/components/Movie/NowPlaying')
    },
    {
      path:'soonPlaying',
      component:()=>import('@/components/Movie/SoonPlaying')
    },
    {
      path:'search',
      component:()=>import('@/components/Movie/Search')
    },
    {
      path:'',
      redirect:'nowPlaying'
    }
  ]
}