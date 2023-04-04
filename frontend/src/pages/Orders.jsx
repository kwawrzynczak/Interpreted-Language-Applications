import { Select, Table } from 'flowbite-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import roles from '../common/roles';
import routes from '../common/routes';
import orderStatuses from '../common/statuses';
import { selectStatuses } from '../store/inventorySlice';
import { editOrderStatus, getOrders, selectOrders } from '../store/ordersSlice';
import {
  getUsers,
  selectUserIsLogged,
  selectUserRole,
  selectUsers,
} from '../store/userSlice';

const Basket = () => {
  const dispatch = useDispatch();

  const isLogged = useSelector(selectUserIsLogged);
  const role = useSelector(selectUserRole);
  const orders = useSelector(selectOrders);
  const statuses = useSelector(selectStatuses);
  const users = useSelector(selectUsers);

  const handleStatusChange = async (orderId, orderStatusId) => {
    try {
      await dispatch(editOrderStatus({ orderId, orderStatusId })).unwrap();
      dispatch(getOrders());
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    if (!isLogged || role !== roles.admin) return;

    dispatch(getOrders());
    dispatch(getUsers());
  }, []);

  if (!isLogged || role !== roles.admin) {
    return <Navigate to={routes.home} />;
  }

  return (
    <div className="flex items-start justify-center gap-6">
      {orders.length === 0 && (
        <span className="text-center text-slate-500">
          Nie ma jeszcze żadnych zamówień 🙁
        </span>
      )}
      {orders.length > 0 && (
        <Table striped>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Złożono</Table.HeadCell>
            <Table.HeadCell>Użytkownik</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders.map(({ id, createdAt, userId, orderStatusId }) => {
              const created = new Date(createdAt);
              const user = users.find((u) => u.id === userId);
              const status = statuses.find((s) => s.id === orderStatusId);

              return (
                <Table.Row key={id}>
                  <Table.Cell>{id}</Table.Cell>
                  <Table.Cell>{created.toLocaleString()}</Table.Cell>
                  <Table.Cell>{user?.email}</Table.Cell>
                  <Table.Cell>
                    <Select
                      size="sm"
                      disabled={status?.status === orderStatuses.canceled}
                      className="min-w-[300px]"
                      onChange={({ target }) =>
                        handleStatusChange(id, +target.value)
                      }
                      defaultValue={orderStatusId}
                    >
                      {statuses.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.status}
                        </option>
                      ))}
                    </Select>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default Basket;
