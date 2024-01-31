const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve('new-thread-id')); // Contoh ID yang dihasilkan

    const useCasePayload = {
      title: 'A Thread',
      body: 'Content of the thread',
      owner: 'user-123',
    };
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThreadId = await addThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedThreadId).toEqual('new-thread-id');
    expect(mockThreadRepository.addThread).toBeCalledWith(expect.anything());
  });
});
