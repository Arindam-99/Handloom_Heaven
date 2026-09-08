import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import SplashScreen from './components/ui/SplashScreen';
import PageLoader from './components/ui/PageLoader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/products/Shop';
import ProductDetail from './pages/products/ProductDetail';
import Cart from './pages/cart/Cart';
import Wishlist from './pages/misc/Wishlist';
import Checkout from './pages/cart/Checkout';
import DemoPayment from './pages/payment/DemoPayment';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Account from './pages/misc/Account';
import Orders from './pages/misc/Orders';
import OrderDetail from './pages/misc/OrderDetail';
import About from './pages/misc/About';
import Settings from './pages/misc/Settings';
import SectionPage from './pages/sections/SectionPage';
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerProducts from './pages/seller/SellerProducts';
import SellerAddProduct from './pages/seller/SellerAddProduct';
import SellerOrders from './pages/seller/SellerOrders';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';
import ProtectedRoute from './components/ui/ProtectedRoute';
import { getMe } from './store/slices/authSlice';
import { fetchCart } from './store/slices/cartSlice';

// Route change loader
function RouteLoader() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  return loading ? <PageLoader text="Loading page..." /> : null;
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const dispatch = useDispatch();
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    setTimeout(() => setAppReady(true), 100);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getMe());
      dispatch(fetchCart());
    }
  }, [dispatch]);

  // Show splash screen on first visit
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <Router>
      <ScrollToTop />
      <RouteLoader />
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col">
        <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/seller" element={<ProtectedRoute allowedRoles={['seller', 'admin']}><SellerDashboard /></ProtectedRoute>} />
          <Route path="/seller/products" element={<ProtectedRoute allowedRoles={['seller', 'admin']}><SellerProducts /></ProtectedRoute>} />
          <Route path="/seller/products/add" element={<ProtectedRoute allowedRoles={['seller', 'admin']}><SellerAddProduct /></ProtectedRoute>} />
          <Route path="/seller/orders" element={<ProtectedRoute allowedRoles={['seller', 'admin']}><SellerOrders /></ProtectedRoute>} />

          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute allowedRoles={['admin']}><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute allowedRoles={['admin']}><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute allowedRoles={['admin']}><AdminCategories /></ProtectedRoute>} />

          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/shop" element={<><Navbar /><Shop /><Footer /></>} />
          <Route path="/shop/:categorySlug" element={<><Navbar /><Shop /><Footer /></>} />
          <Route path="/handloom" element={<><Navbar /><SectionPage sectionKey="handloom" /><Footer /></>} />
          <Route path="/jewellery" element={<><Navbar /><SectionPage sectionKey="jewellery" /><Footer /></>} />
          <Route path="/handicrafts" element={<><Navbar /><SectionPage sectionKey="handicrafts" /><Footer /></>} />
          <Route path="/collections" element={<><Navbar /><SectionPage sectionKey="collections" /><Footer /></>} />
          <Route path="/product/:slug" element={<><Navbar /><ProductDetail /><Footer /></>} />
          <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />
          <Route path="/wishlist" element={<><Navbar /><Wishlist /><Footer /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/account" element={<ProtectedRoute><><Navbar /><Account /><Footer /></></ProtectedRoute>} />
          <Route path="/account/orders" element={<ProtectedRoute><><Navbar /><Orders /><Footer /></></ProtectedRoute>} />
          <Route path="/account/orders/:id" element={<ProtectedRoute><><Navbar /><OrderDetail /><Footer /></></ProtectedRoute>} />
          <Route path="/account/settings" element={<ProtectedRoute><><Navbar /><Settings /><Footer /></></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><><Navbar /><Checkout /><Footer /></></ProtectedRoute>} />
          <Route path="/payment" element={<DemoPayment />} />
        </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
