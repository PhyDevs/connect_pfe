import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from './providers/ThemeContext';

const Home = React.lazy(() => import('./pages/HomePage'));
const Login = React.lazy(() => import('./pages/LoginPage'));
const SignUp = React.lazy(() => import('./pages/SignUpPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/:departmentId",
		element: <Home />,
	},
	{
		path: "/:departmentId/:courseId",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
	{
		path: "/",
		element: <NotFound />,
	},
]);

const App = () => (
	<ThemeProvider>
		<React.Suspense fallback={<div className="loading-con" />}>
			<RouterProvider router={router} />
		</React.Suspense>
	</ThemeProvider>
);

export default App;
