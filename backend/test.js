const { completeMission, calculateLevelRequirement } = require('./services/character.service')

const character = {
  health: 100,
  mana: 50,
  exp: 0,
  level: 1,
  strength: 25,
  defense: 25,
  intelligence: 25,
  charisma: 25,
  criticalRate: 0,
  efficiency: 0,
  trustworthyness: 0
}

// Complete hard mission
const mission = {
  difficulty: 'MYTHIC',
  type: 'IRON'
}

completeMission(character, mission)

console.table(character)
