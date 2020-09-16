export default {
  path: '/movie',
  component: () => import('@/views/Movie'),
  children:[
    {
      path:'city',
      component:()=>import('@/components/Cinema/City')
    },
    {
      path:'nowPlaying',
      component:()=>import('@/components/Cinema/NowPlaying')
    },
    {
      path:'soonPlaying',
      component:()=>import('@/components/Cinema/SoonPlaying')
    },
    {
      path:'search',
      component:()=>import('@/components/Cinema/Search')
    },
    {
      path:'',
      redirect:'nowPlaying'
    }
  ]
}