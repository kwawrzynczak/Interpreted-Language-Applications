import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import routes from '../common/routes';
import ProductTable from '../components/ProductTable';
import { formatPrice } from '../helpers/formatPrice';
import { createOrder, selectOrderItems } from '../store/basketSlice';
import { selectProducts } from '../store/inventorySlice';
import { selectUserIsLogged } from '../store/userSlice';

const Basket = () => {
  const dispatch = useDispatch();

  const isLogged = useSelector(selectUserIsLogged);
  const orderItems = useSelector(selectOrderItems);
  const products = useSelector(selectProducts);

  const [visible, setVisible] = useState([]);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  let itemsCount = 0;
  orderItems.forEach(({ quantity }) => {
    itemsCount += quantity;
  });

  const handleCreateOrder = async () => {
    setLoading(true);
    await dispatch(createOrder(orderItems));
    setLoading(false);
  };

  useEffect(() => {
    if (orderItems.length === 0) return;

    const newVisible = products.filter(({ id }) =>
      orderItems.some(({ productId }) => productId === id),
    );

    setVisible(newVisible);
  }, [products, orderItems]);

  useEffect(() => {
    if (visible.length === 0) return;

    let newValue = 0;

    visible.forEach(({ id, price }) => {
      const orderItem = orderItems.find(({ productId }) => productId === id);
      if (!orderItem) return;
      newValue += price * orderItem.quantity;
    });

    setValue(newValue);
  }, [visible, orderItems]);

  if (!isLogged || orderItems.length === 0) {
    return <Navigate to={routes.home} />;
  }

  return (
    <div className="flex items-start justify-center gap-6">
      {visible.length > 0 && (
        <ProductTable showDescriptions={false} products={visible} />
      )}
      <div className="flex w-96 shrink-0 flex-col gap-4 rounded-lg bg-white p-6 shadow-lg">
        <span className="text-lg font-semibold text-slate-500">
          Podsumowanie
        </span>
        <span>
          Liczba produktów:{' '}
          <span className="font-semibold text-blue-500">{itemsCount}</span>
        </span>
        <span>
          Wartość zamówienia:{' '}
          <span className="font-semibold text-blue-500">
            {formatPrice(value)}
          </span>
        </span>
        <Button onClick={handleCreateOrder}>
          {loading && <Spinner className="mr-2" size="sm" />}
          Złóż zamówienie
        </Button>
      </div>
    </div>
  );
};

export default Basket;
