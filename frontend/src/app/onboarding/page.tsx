'use client'

import { useState } from 'react'

const questions = [
  {
    label: 'How do you feel more comfortable?',
    options: [
      { label: 'Drinking beers with my homies in a tavern', value: 'BARD' },
      { label: 'Killing orcs to accumulate experience', value: 'ASSASSIN' },
      { label: 'Checking the equipment for the next quest', value: 'PALADIN' },
      { label: 'Coming up with new ways to offend traditional religions', value: 'MAGE' }
    ]
  },
  {
    label: 'What do you enjoy more in a quest?',
    options: [
      { label: 'Involving myself in the story and the narrative', value: 'MAGE' },
      { label: 'Talking to the different characters in the game', value: 'BARD' },
      { label: 'A challenging fight', value: 'ASSASSIN' },
      { label: 'Leading my team into success', value: 'PALADIN' }
    ]
  },
  {
    label: 'What would you like to be known for?',
    options: [
      { label: 'My power', value: 'ASSASSIN' },
      { label: 'My sense of humor', value: 'BARD' },
      { label: 'My knowledge', value: 'MAGE' },
      { label: 'My team', value: 'PALADIN' }
    ]
  },
  {
    label: 'You find out someone is plotting your death, what would you do?',
    options: [
      { label: "I'll ambush him in an unkwown place", value: 'MAGE' },
      { label: "I'll go and kill him right now", value: 'ASSASSIN' },
      { label: "I'll pay him to work with me", value: 'PALADIN' },
      { label: "I'll gather my team to fight him together", value: 'BARD' }
    ]
  },
  {
    label: 'A monster is chasing you, what would you do?',
    options: [
      { label: 'Make that the last thing it does in its wretched life', value: 'ASSASSIN' },
      { label: "I'll think about the risk-reward", value: 'PALADIN' },
      { label: "I'll hide and study its behavior", value: 'MAGE' },
      { label: "I'll run away and call reinforcements", value: 'BARD' }
    ]
  }
]

const Onboarding = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})

  const handleChange = (index: number, value: string) => {
    setAnswers({
      ...answers,
      [index]: value
    })
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const answerValues: string[] = Object.values(answers)

    // Count ocurrences of each value
    const countMap: { [key: string]: number } = {}
    answerValues.forEach((answer: string) => {
      countMap[answer] = (countMap[answer] || 0) + 1
    })

    // Find the value with the highest count
    let mostRepeated = null
    let maxCount = 0
    for (const [value, count] of Object.entries(countMap)) {
      if (count > maxCount) {
        maxCount = count
        mostRepeated = value
      }
    }

    console.log({ class: mostRepeated, countMap })
  }

  return (
    <div className='flex flex-col justify-center px-6 py-12 lg:px-8'>
      <h2 className='mb-16 text-center text-5xl text-balance font-light leading-9 tracking-tight text-gray-900'>
        Tell us more about yourself
      </h2>

      <form onSubmit={onSubmit}>
        {questions.map((question, questionIndex) => (
          <div className='mb-4' key={questionIndex}>
            <label className='block text-md font-medium leading-6 text-gray-900'>{question.label}</label>
            {question.options.map((option, optionIndex) => (
              <div className='flex flex-row gap-2 mb-2' key={optionIndex}>
                <input
                  type='radio'
                  name={`question-${questionIndex}`}
                  value={option.value}
                  checked={answers[questionIndex] === option.value}
                  onChange={() => handleChange(questionIndex, option.value)}
                />
                <label>{option.label}</label>
              </div>
            ))}
          </div>
        ))}

        <button
          type='submit'
          className='mt-8 mb-6 flex w-full justify-center rounded-md bg-[#5bc592] text-[#f7f8fa] px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-[#7bdcad] hover:text-white transition-colors duration-200 ease-in-out'
        >
          Done
        </button>
      </form>
    </div>
  )
}

export default Onboarding
