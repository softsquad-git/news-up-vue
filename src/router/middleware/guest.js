export default function guest ({ next }){
  if(localStorage.getItem('token')){
    return next({
      name: 'IndexPage'
    })
  }

  return next();
}
