import { Tasks } from './tasks';

describe('Tasks', () => {
  it('should be defined as a type', () => {
    const exampleTask: Tasks = {
      taskName: 'Sample Task',
      description: 'This is a sample task',
      status: 'ToDo'
    };
    expect(exampleTask).toBeDefined();
    expect(exampleTask.taskName).toBe('Sample Task');
  });
});
