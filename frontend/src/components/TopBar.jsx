import { Button, Dropdown } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import roles from '../common/roles';
import routes from '../common/routes';
import { selectOrderItems } from '../store/basketSlice';
import { selectProducts } from '../store/inventorySlice';
import {
  logoutUser,
  selectUserEmail,
  selectUserIsLogged,
  selectUserName,
  selectUserPhoneNumber,
  selectUserRole,
} from '../store/userSlice';

const TopBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isLogged = useSelector(selectUserIsLogged);
  const name = useSelector(selectUserName);
  const email = useSelector(selectUserEmail);
  const phoneNumber = useSelector(selectUserPhoneNumber);
  const orderItems = useSelector(selectOrderItems);
  const products = useSelector(selectProducts);
  const role = useSelector(selectUserRole);

  let itemsCount = 0;
  orderItems.forEach(({ quantity }) => {
    itemsCount += quantity;
  });

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="w-full bg-white shadow-lg">
      <div className="m-auto flex h-16 max-w-screen-xl items-center justify-between">
        <Link to={routes.home}>
          <span className="text-lg font-semibold text-blue-500">
            Sklepik z elektroniką
          </span>
        </Link>
        {isLogged && (
          <div className="flex items-center gap-6">
            {role === roles.admin && (
              <Link to={routes.orders}>
                <Button size="sm" color="gray">
                  Zamówienia
                </Button>
              </Link>
            )}
            <Dropdown
              arrowIcon
              inline
              label={
                <span className="text-sm font-semibold text-slate-500">
                  Koszyk
                </span>
              }
            >
              <Dropdown.Header className="flex flex-col gap-1">
                <span className="block truncate text-xs font-medium text-slate-500">
                  Liczba produktów
                </span>
                <span className="block text-sm font-semibold">
                  {itemsCount}
                </span>
              </Dropdown.Header>
              {orderItems.length > 0 ? (
                orderItems.map(({ productId, quantity }) => {
                  const product = products.find(({ id }) => id === productId);

                  return (
                    <Dropdown.Item
                      key={productId}
                      className="flex max-w-xs items-center gap-6"
                    >
                      <span className="truncate text-xs font-semibold">
                        {product?.name}
                      </span>
                      <span className="text-xs font-bold text-blue-500">
                        {quantity}
                      </span>
                    </Dropdown.Item>
                  );
                })
              ) : (
                <Dropdown.Item>Koszyk pusty 🙁</Dropdown.Item>
              )}
              {orderItems.length > 0 && (
                <>
                  <Dropdown.Divider />
                  <Link to={routes.basket}>
                    <Dropdown.Item>Przejdź do koszyka</Dropdown.Item>
                  </Link>
                </>
              )}
            </Dropdown>
            <Dropdown
              arrowIcon
              inline
              label={
                <span className="text-sm font-semibold text-slate-500">
                  Mój profil
                </span>
              }
            >
              <Dropdown.Header className="flex flex-col gap-1">
                <span className="block text-sm font-semibold">{name}</span>
                <span className="block truncate text-xs font-medium text-slate-500">
                  {email}
                </span>
                <span className="block truncate text-xs font-medium text-slate-500">
                  {phoneNumber}
                </span>
              </Dropdown.Header>
              <Dropdown.Item className="text-red-500" onClick={handleLogout}>
                Wyloguj się
              </Dropdown.Item>
            </Dropdown>
          </div>
        )}
        {location.pathname !== routes.login && !isLogged && (
          <Link to={routes.login}>
            <Button>Zaloguj się</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopBar;
