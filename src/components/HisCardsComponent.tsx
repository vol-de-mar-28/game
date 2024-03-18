import React from 'react';
import { Card } from '../types';
import CardComponent from './CardComponent';

interface IHisCards {
  cards: Card[];
}

const HisCardsComponent: React.FC<IHisCards> = ({ cards }) => {
  return (
    <div className='playerCards'>
      {cards.map((card) => (
        <CardComponent card={card} key={card.id} />
      ))}
    </div>
  );
};

export default HisCardsComponent;
