const ThreadRepository = require('../ThreadRepository');

describe('ThreadRepository abstract', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const threadRepository = new ThreadRepository();

    // Menguji metode addThread
    await expect(threadRepository.addThread({}))
      .rejects
      .toThrow('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    // Menguji metode isThreadExist
    await expect(threadRepository.isThreadExist('thread-id'))
      .rejects
      .toThrow('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    // Menguji metode getThreadById
    await expect(threadRepository.getThreadById('thread-id'))
      .rejects
      .toThrow('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
