export default {
  path: '/cinema',
  component: () => import('@/views/Cinema'),
  children:[
    {
      path:'brand',
      component:()=>import('@/components/Cinema/Brand')
    },
    {
      path:'city',
      component:()=>import('@/components/Cinema/City')
    },
    {
      path:'feature',
      component:()=>import('@/components/Cinema/Feature')
    },
    {
      path:'',
      redirect:'brand'
    }
  ]
}