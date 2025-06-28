export const db = {
  users: [
    {
      id: 1,
      email: 'user@example.com',
      password: 'password123',
      create_at: '2025-06-28T17:16:00.000Z',
      tasks: [
        {
          id: 1,
          title: 'User1 Task 1',
          description: 'First task for user1',
          priority: 'HIGH',
          user_id: 1,
        },
        {
          id: 2,
          title: 'User1 Task 2',
          description: 'Second task for user1',
          priority: 'MEDIUM',
          user_id: 1,
        },
        {
          id: 3,
          title: 'User1 Task 3',
          description: null,
          priority: 'LOW',
          user_id: 1,
        },
      ],
    },
    {
      id: 2,
      email: 'user2@example.com',
      password: 'password456',
      create_at: '2025-06-28T17:16:00.000Z',
      tasks: [
        {
          id: 4,
          title: 'User2 Task 1',
          description: 'First task for user2',
          priority: 'LOW',
          user_id: 2,
        },
        {
          id: 5,
          title: 'User2 Task 2',
          description: null,
          priority: 'HIGH',
          user_id: 2,
        },
        {
          id: 6,
          title: 'User2 Task 3',
          description: 'Third task for user2',
          priority: 'MEDIUM',
          user_id: 2,
        },
      ],
    },
  ],
};
