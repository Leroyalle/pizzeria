import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { endpoints } from '../api/endpoints';

const PageItem: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({
    imageUrl: '',
    title: '',
    price: 0,
  });

  React.useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios(`${endpoints.pizzas}/${id}`);
        setItem(data);
      } catch (error) {
        alert('Ошибка при получении данных');
        navigate('/');
      }
    };
    fetchItem();
  }, []);

  if (Object.keys(item).length < 1) {
    return <>Загрузка</>;
  }

  return (
    <>
      <div className="container">
        <img src={item.imageUrl} alt="" />
        <h2>{item.title}</h2>
        <p>{item.price}</p>
      </div>
    </>
  );
};

export default PageItem;
