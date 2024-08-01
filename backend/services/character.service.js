const { difficultyRewards, levelRequiremens } = require('../constants')

const completeMission = (character, mission) => {
  const newExp = difficultyRewards[mission.difficulty]
  levelUp(character, newExp)

  if (mission.type === 'WORKOUT') {
    character.strength += 5
  }

  if (mission.type === 'STUDY') {
    character.intelligence += 5
  }

  if (mission.type === 'SOCIAL') {
    character.charisma += 5
  }

  if (mission.type === 'HEALTH') {
    character.health += 5
  }
}

const levelUp = (character, newExp) => {
  const nextLevelRequirement = calculateLevelRequirement(character.level + 1)
  const totalExp = (character.exp += newExp)

  if (totalExp >= nextLevelRequirement) {
    const remainder = totalExp - nextLevelRequirement
    character.level += 1
    character.exp = remainder
  }

  character.exp = totalExp
}

const calculateLevelRequirement = (level) => {
  return 250 * (level * level) - 250 * level
}

module.exports = {
  completeMission,
  levelUp,
  calculateLevelRequirement
}
