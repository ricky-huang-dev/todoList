export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('todo').del()
  await knex('todo').insert([
    {
      id: 1,
      task: 'gamming',
      status: 'done',
      deadline: '12/11/2023',
      description: 'I will be playing FIFA 24 with my friends',
    },
    {
      id: 2,
      task: 'personal project',
      status: 'progress',
      deadline: '21/11/2023',
      description: 'project must be in react and other technology',
    },
    {
      id: 3,
      task: 'meeting doctor',
      status: 'not yet',
      deadline: '25/12/2023',
      description:
        'I have problem of left ear and I have to meet doctor for check up',
    },
  ])
}
