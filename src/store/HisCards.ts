import { makeObservable, observable } from 'mobx';
import { Card } from '../types';
import PlayerCards from './PlayerCards';
import game from './Game';

class HisCards extends PlayerCards {

  cards: Card[] = [];

  constructor() {
    super()
    makeObservable(this, {
      cards: observable
    })
  }

  defineCardForAction(battleFieldCards: Card[]) {
    if(game.isMyAttack) {
      return this.defineCardForDefense(game.attackCard, battleFieldCards)
    }
    return this.defineCardForAttack(battleFieldCards)
  }

  defineCardForDefense(attackCard: Card | null, battleFieldCards: Card[]) {
    if(attackCard) {
      const higherCard = this.cards.filter(card => card.type === attackCard?.type && card.rank > attackCard?.rank)
      const trumpCards = this.cards.filter(card => card.type === game.trumpCard)
      if (higherCard.length) {
        return this.defineJuniorCard(higherCard)
      }
      if (attackCard.type !== game.trumpCard && trumpCards.length) {
        return this.defineJuniorCard(trumpCards)
      }
      this.addCards(battleFieldCards)
      game.toggleStep()
      game.setIsGetCard(true)
    }
  }

  defineCardForAttack = (battleFieldCards: Card[]) => {
    if (this.cards.length) {
      let cardForAttack = null
      if (!battleFieldCards.length) {
        const trumpCards = this.cards.filter(card => card.type === game.trumpCard)
        const notTrumpCards = this.cards.filter(card => card.type !== game.trumpCard)

        if (notTrumpCards.length) {
          cardForAttack = this.defineJuniorCard(notTrumpCards)
        } else {
          cardForAttack = this.defineJuniorCard(trumpCards)
        }
        game.setAttackCard(cardForAttack)
        return cardForAttack
      }

      cardForAttack = this.defineJuniorExistCard(battleFieldCards)
      if (cardForAttack) {
        game.setAttackCard(cardForAttack)
      }
      return cardForAttack
    }

  }

  defineJuniorExistCard(battleFieldCards: Card[]) {
    const existRankCards = this.cards.filter(card => battleFieldCards.find(c => c.rank === card.rank))
    return existRankCards.length ? this.defineJuniorCard(existRankCards): null
  }

  defineJuniorCard(cards: Card[]): Card {
    const juniorCard = cards.reduce((acc, curCard) => acc.rank < curCard.rank ? acc : curCard)
    if (juniorCard) {
      this.reduceCard(juniorCard.id)
    }
    return juniorCard
  }

}

const hisCards = new HisCards()

export default hisCards;