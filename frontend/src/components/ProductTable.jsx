/* eslint-disable tailwindcss/no-custom-classname */
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Button, Table } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';

import { formatPrice } from '../helpers/formatPrice';
import {
  addQuantity,
  removeQuantity,
  selectOrderItems,
} from '../store/basketSlice';
import { selectCategories } from '../store/inventorySlice';
import { selectUserIsLogged } from '../store/userSlice';

const ProductTable = ({ products, showDescriptions = true }) => {
  const dispatch = useDispatch();

  const isLogged = useSelector(selectUserIsLogged);
  const categories = useSelector(selectCategories);
  const orderItems = useSelector(selectOrderItems);

  const handleRemove = (productId) => {
    dispatch(removeQuantity(productId));
  };

  const handleAdd = (productId) => {
    dispatch(addQuantity(productId));
  };

  return (
    <Table striped>
      <Table.Head>
        <Table.HeadCell>Nazwa produktu</Table.HeadCell>
        {showDescriptions && <Table.HeadCell>Opis</Table.HeadCell>}
        <Table.HeadCell>Kategoria</Table.HeadCell>
        <Table.HeadCell>Waga</Table.HeadCell>
        <Table.HeadCell>Cena</Table.HeadCell>
        {isLogged && <Table.HeadCell>Dodawanie</Table.HeadCell>}
      </Table.Head>
      <Table.Body className="divide-y">
        {products.map(
          ({ id, name, description, price, weight, categoryId }) => {
            const category = categories.find((c) => c.id === categoryId);
            const orderItem = orderItems.find(
              ({ productId }) => productId === id,
            );
            const quantity = orderItem?.quantity || 0;

            return (
              <Table.Row key={id}>
                <Table.Cell className="font-medium text-gray-900">
                  {name}
                </Table.Cell>
                {showDescriptions && <Table.Cell>{description}</Table.Cell>}
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {category?.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {weight} g
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-semibold text-blue-500">
                  {formatPrice(price)}
                </Table.Cell>
                {isLogged && (
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Button
                        className="w-10"
                        size="sm"
                        color="gray"
                        onClick={() => handleRemove(id)}
                      >
                        <MinusIcon className="h-5 w-5" />
                      </Button>
                      <span className="w-6 text-center text-lg font-semibold">
                        {quantity}
                      </span>
                      <Button
                        className="w-10"
                        size="sm"
                        color="gray"
                        onClick={() => handleAdd(id)}
                      >
                        <PlusIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </Table.Cell>
                )}
              </Table.Row>
            );
          },
        )}
      </Table.Body>
    </Table>
  );
};

export default ProductTable;
