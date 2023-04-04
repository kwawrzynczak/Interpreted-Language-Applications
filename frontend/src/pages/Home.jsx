import { Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ProductTable from '../components/ProductTable';
import { selectCategories, selectProducts } from '../store/inventorySlice';

const Home = () => {
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);

  const [visible, setVisible] = useState(products);
  const [category, setCategory] = useState();
  const [filterName, setFilterName] = useState('');

  const handleNameChange = ({ target }) => {
    setFilterName(target.value);
  };

  const handleCategoryChange = ({ target }) => {
    setCategory(target.value);
  };

  useEffect(() => {
    let newVisible = products;

    if (filterName !== '') {
      newVisible = newVisible.filter((product) =>
        product.name.toLowerCase().includes(filterName.toLowerCase()),
      );
    }

    if (category && category !== 'default') {
      newVisible = newVisible.filter(
        ({ categoryId }) => categoryId === +category,
      );
    }

    setVisible(newVisible);
  }, [products, filterName, category]);

  return (
    <div className="flex flex-col gap-6">
      <span className="text-xl font-semibold text-slate-500">Filtrowanie</span>
      <div className="flex gap-3">
        <TextInput
          className="w-full"
          type="text"
          placeholder="Wyszukaj po nazwie..."
          value={filterName}
          onChange={handleNameChange}
        />
        {categories && (
          <Select className="min-w-[300px]" onChange={handleCategoryChange}>
            <option value="default">Wybierz kategorię</option>
            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
        )}
      </div>
      <span className="text-xl font-semibold text-slate-500">Produkty</span>
      {visible.length > 0 ? (
        <ProductTable products={visible} />
      ) : (
        <span className="text-slate-500">Brak produktów 🙁</span>
      )}
    </div>
  );
};

export default Home;
