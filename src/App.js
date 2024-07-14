import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavigationBar from './components/Navbar'
import ProductList from './pages/ProductList';
import CartList from './pages/CartList'
import NotFound from './components/NotFound';
import { Provider } from 'react-redux';
import { store } from './store'
import AddProduct from './pages/AddProduct';

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <NavigationBar/>,
      errorElement: <NotFound/>,
      children: [
        {
          path: '', element: <ProductList/>,
        },
        {
          path: '/cart', element: <CartList/>
        },
        {
          path: '/addProduct', element: <AddProduct/>
        }
      ]
    }
  ])
  return (
    <Provider store={store}>
      <RouterProvider router={browserRouter}/>
    </Provider>
  );
}

export default App;
