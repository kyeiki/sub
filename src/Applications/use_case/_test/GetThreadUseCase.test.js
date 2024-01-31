const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const GetThreadUseCase = require('../GetThreadUseCase');
const Thread = require('../../../Domains/threads/entities/Thread');
const Comment = require('../../../Domains/comments/entities/Comment');

describe('GetThreadUseCase', () => {
  it('should throw error when thread is not found', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve(null));
    const mockCommentRepository = new CommentRepository();
    const useCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });
    const expectedError = new Error('GET_THREAD_USE_CASE.THREAD_NOT_FOUND');

    // Action & Assert
    await expect(useCase.execute('thread-123')).rejects.toThrowError(expectedError);
  });

  it('should orchestrating the get thread action correctly', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockThread = new Thread({
      id: 'thread-999',
      title: 'Test Thread Title',
      body: 'Test Thread Body',
      date: new Date().toISOString(),
      username: 'user_test',
    });
    const mockComments = [
      new Comment({
        id: 'comment-999',
        username: 'commenter_test',
        date: new Date().toISOString(),
        content: 'Test Comment Body',
        isDelete: false,
      }),
    ];

    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve(mockThread));
    mockCommentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(mockComments));

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const thread = await getThreadUseCase.execute('thread-999');
    // Assert
    expect(thread.id).toEqual('thread-999');
    expect(thread.title).toEqual('Test Thread Title');
    expect(thread.body).toEqual('Test Thread Body');
    expect(thread.date).toBeDefined();
    expect(thread.username).toEqual('user_test');
    expect(thread.comments).toHaveLength(1);
    expect(thread.comments[0].id).toEqual('comment-999');
    expect(thread.comments[0].username).toEqual('commenter_test');
    expect(thread.comments[0].content).toEqual('Test Comment Body');

    expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-999');
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith('thread-999');
  });
});
