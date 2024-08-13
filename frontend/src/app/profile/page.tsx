'use client'

import { useState } from 'react'

const Profile = () => {
  const [attributes, setAttributes] = useState({
    health: 100,
    mana: 25,
    exp: 0,
    level: 1,
    gold: 0,
    strength: 25,
    defense: 25,
    intelligence: 25,
    charisma: 25
  })
  const [task, setTask] = useState({
    type: 'WORKOUT',
    difficulty: 'CASUAL'
  })

  const attributeMap = {
    WORKOUT: 'strength',
    STUDY: 'intelligence',
    SOCIAL: 'charisma',
    HEALTH: 'health'
  }

  const taskRewards = {
    CASUAL: {
      exp: 25,
      gold: 10
    },
    HEROIC: {
      exp: 50,
      gold: 20
    },
    LEGENDARY: {
      exp: 75,
      gold: 30
    }
  }

  const nextLevelRequiredExp = (level: number): number => {
    return 50 * (level + 1)
  }

  const completeTask = () => {
    // @ts-expect-error
    const attribute = attributeMap[task.type]

    // @ts-expect-error
    const rewards = taskRewards[task.difficulty]
    const totalExp = attributes.exp + rewards.exp
    const requiredExp = nextLevelRequiredExp(attributes.level + 1)

    if (totalExp >= requiredExp) {
      setAttributes({
        ...attributes,
        [attribute]: Math.min(attributes[attribute] + 1, 100),
        exp: totalExp - requiredExp,
        level: attributes.level + 1,
        gold: attributes.gold + rewards.gold
      })
    } else {
      setAttributes({
        ...attributes,
        [attribute]: Math.min(attributes[attribute] + 1, 100),
        exp: totalExp,
        gold: attributes.gold + rewards.gold
      })
    }
  }

  return (
    <div className='flex flex-row gap-5'>
      <table className='text-left text-lg border  border-black'>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='px-4 py-2'>Health</td>
            <td className='px-4 py-2'>{attributes.health}</td>
          </tr>
          <tr>
            <td className='px-4 py-2'>Mana</td>
            <td className='px-4 py-2'>{attributes.mana}</td>
          </tr>
          <tr>
            <td className='px-4 py-2'>Experience</td>
            <td className='px-4 py-2'>{attributes.exp}</td>
          </tr>
          <tr>
            <td className='px-4 py-2'>Level</td>
            <td className='px-4 py-2'>{attributes.level}</td>
          </tr>
          <tr>
            <td className='px-4 py-2'>Gold</td>
            <td className='px-4 py-2'>{attributes.gold}</td>
          </tr>
          <tr>
            <td className='px-4 py-2'>Strength</td>
            <td className='px-4 py-2'>{attributes.strength}</td>
          </tr>
          <tr>
            <td className='px-4 py-2'>Defense</td>
            <td className='px-4 py-2'>{attributes.defense}</td>
          </tr>
          <tr>
            <td className='px-4 py-2'>Intelligence</td>
            <td className='px-4 py-2'>{attributes.intelligence}</td>
          </tr>
          <tr>
            <td className='px-4 py-2'>Charisma</td>
            <td className='px-4 py-2'>{attributes.charisma}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <form className='text-xl'>
          <div className='flex flex-col gap-2'>
            <label>Difficulty</label>
            <select
              defaultValue='CASUAL'
              onChange={(e) => {
                setTask({
                  ...task,
                  difficulty: e.target.value
                })
              }}
            >
              <option value='CASUAL'>Casual</option>
              <option value='HEROIC'>Heroic</option>
              <option value='LEGENDARY'>Legendary</option>
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Task Type</label>
            <select
              defaultValue='WORKOUT'
              onChange={(e) => {
                setTask({
                  ...task,
                  type: e.target.value
                })
              }}
            >
              <option value='WORKOUT'>Workout</option>
              <option value='STUDY'>Study</option>
              <option value='SOCIAL'>Social</option>
              <option value='HEALTH'>Health</option>
            </select>
          </div>
        </form>
        <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' onClick={completeTask}>
          Complete Task
        </button>
      </div>
    </div>
  )
}

export default Profile
