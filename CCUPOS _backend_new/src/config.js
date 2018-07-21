// EXAMPLE ONLY! THIS FILE IS USUALLY NOT PART OF GIT TRACKING
// .gitignore skips this at the project level, but it is added for example here

export const firebase = {
  apiKey: 'AIzaSyDHmPGR9Lo0ZNC8EuNWmCx-Jp4vDM3jt6I',
  authDomain: 'cloudcoffee-e23cb.firebaseapp.com',
  databaseURL: 'https://cloudcoffee-e23cb.firebaseio.com',
  projectId: 'cloudcoffee-e23cb',
  storageBucket: 'cloudcoffee-e23cb.appspot.com',
  messagingSenderId: '595361514123'
}

// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: false, // enable/disable Firebase Database Logging
  updateProfileOnLogin: true, // enable/disable updating of profile on login
  //enableRedirectHandling: false
//  profileParamsToPopulate: [
//   'orders:orders'
// ]
  //profileDecorator: (userData) => ({  displayName : userData.displayName  , email: userData.email , providerData : userData.providerData  , data:userData.data ?"0":"1" })
  //profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}

export const env = 'development'

export default { firebase, reduxFirebase, env }
