import { Flowbite } from 'flowbite-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import TopBar from '../components/TopBar';
import {
  getCategories,
  getProducts,
  getStatuses,
} from '../store/inventorySlice';

const MainTemplate = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getStatuses());
  }, []);

  return (
    <Flowbite
      theme={{
        dark: false,
        usePreferences: false,
      }}
    >
      <div className="min-h-screen bg-slate-100 pb-24">
        <TopBar />
        <div className="m-auto mt-10 w-full max-w-screen-xl">{children}</div>
      </div>
    </Flowbite>
  );
};

export default MainTemplate;
