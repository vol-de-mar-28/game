import React from 'react';
import { Card } from '../types';

interface ICard {
  card: Card;
  onClick?: () => void;
}

const CardComponent: React.FC<ICard> = ({ card, onClick }) => {
  return (
    <div className='card' onClick={onClick}>
      <img src={card.img} alt={''} key={card.id} width='80' />
    </div>
  );
};

export default CardComponent;
