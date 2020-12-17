// import {FC, useEffect} from "react";
// // import {RouteProps} from 'react-router';
// // import {Route, Redirect} from 'react-router-dom';
// import {fetchProfile} from "../../redux/store/profile/actions";
// import {setAuthStatus} from "../../redux/store/auth/actions";
// import {useDispatch, useSelector} from "react-redux";
// import {profileDataSelector} from "../../redux/store/profile/selectors";
// import {isLoginCheckedSelector, isLoginedSelector} from "../../redux/store/auth/selectors";
//
// type PrivateRouteProps = {}
//
// const PrivateRoute: FC<PrivateRouteProps> = ({children, ...rest}) => {
//   const authChecked = useSelector(isLoginCheckedSelector);
//   const isLogined = useSelector(isLoginedSelector);
//   const dispatch = useDispatch();
//   const profileData = useSelector(profileDataSelector);
//
//   useEffect(() => {
//     if (!profileData) {
//       dispatch(fetchProfile());
//     }
//   }, [dispatch, profileData]);
//
//   useEffect(() => {
//     if (profileData) {
//       dispatch(setAuthStatus({isLogined: true}));
//     }
//   }, [dispatch, profileData]);
//
//   const component = () => {
//     if (!authChecked) {
//       return <p>Спинер при проверке авторизации...</p>
//     }
//     if (isLogined) {
//       return children;
//     } else {
//       return (
//         <Redirect
//           to={{
//             pathname: ROUTES.LOGIN_PATH
//           }}
//         />)
//     }
//   };
//
//   return (
//     <Route
//       {...rest}
//       render={ component }
//     />
//   )
// };
//
// export default PrivateRoute;
