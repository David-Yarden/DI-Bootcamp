import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import {
  getAllStories,
  getStoriesByAuthor,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
  isUserAuthor,
  isUserAuthorOrContributor
} from '../models/storyModel';
import { getContributorsByStory } from '../models/contributorModel';
import { validateStoryTitle, validateStoryContent } from '../helpers/validation';

export const getStories = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { filter } = req.query;
    let stories;

    if (filter === 'mine' && req.user) {
      stories = await getStoriesByAuthor(req.user.userId);
    } else {
      stories = await getAllStories();
    }

    // Get contributors for each story
    const storiesWithContributors = await Promise.all(
      stories.map(async (story) => {
        const contributors = await getContributorsByStory(story.id);
        return { ...story, contributors };
      })
    );

    res.json(storiesWithContributors);
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ message: 'An error occurred while fetching stories.' });
  }
};

export const getStory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const storyId = parseInt(id, 10);

    if (isNaN(storyId)) {
      res.status(400).json({ message: 'Invalid story ID.' });
      return;
    }

    const story = await getStoryById(storyId);
    if (!story) {
      res.status(404).json({ message: 'Story not found.' });
      return;
    }

    const contributors = await getContributorsByStory(storyId);
    res.json({ ...story, contributors });
  } catch (error) {
    console.error('Get story error:', error);
    res.status(500).json({ message: 'An error occurred while fetching the story.' });
  }
};

export const createNewStory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Authentication required.' });
      return;
    }

    // Validate input
    const titleValidation = validateStoryTitle(title);
    if (!titleValidation.valid) {
      res.status(400).json({ message: titleValidation.message });
      return;
    }

    const contentValidation = validateStoryContent(content);
    if (!contentValidation.valid) {
      res.status(400).json({ message: contentValidation.message });
      return;
    }

    const story = await createStory(title.trim(), content.trim(), userId);
    res.status(201).json(story);
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ message: 'An error occurred while creating the story.' });
  }
};

export const updateExistingStory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user?.userId;
    const storyId = parseInt(id, 10);

    if (isNaN(storyId)) {
      res.status(400).json({ message: 'Invalid story ID.' });
      return;
    }

    if (!userId) {
      res.status(401).json({ message: 'Authentication required.' });
      return;
    }

    // Check if story exists
    const story = await getStoryById(storyId);
    if (!story) {
      res.status(404).json({ message: 'Story not found.' });
      return;
    }

    // Check authorization - must be author or contributor
    const canEdit = await isUserAuthorOrContributor(storyId, userId);
    if (!canEdit) {
      res.status(403).json({ message: 'You are not authorized to edit this story.' });
      return;
    }

    // Validate input if provided
    if (title !== undefined) {
      const titleValidation = validateStoryTitle(title);
      if (!titleValidation.valid) {
        res.status(400).json({ message: titleValidation.message });
        return;
      }
    }

    if (content !== undefined) {
      const contentValidation = validateStoryContent(content);
      if (!contentValidation.valid) {
        res.status(400).json({ message: contentValidation.message });
        return;
      }
    }

    const updatedStory = await updateStory(
      storyId,
      title?.trim(),
      content?.trim()
    );

    if (!updatedStory) {
      res.status(400).json({ message: 'No updates provided.' });
      return;
    }

    res.json(updatedStory);
  } catch (error) {
    console.error('Update story error:', error);
    res.status(500).json({ message: 'An error occurred while updating the story.' });
  }
};

export const deleteExistingStory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const storyId = parseInt(id, 10);

    if (isNaN(storyId)) {
      res.status(400).json({ message: 'Invalid story ID.' });
      return;
    }

    if (!userId) {
      res.status(401).json({ message: 'Authentication required.' });
      return;
    }

    // Check if story exists
    const story = await getStoryById(storyId);
    if (!story) {
      res.status(404).json({ message: 'Story not found.' });
      return;
    }

    // Check authorization - must be author
    const isAuthor = await isUserAuthor(storyId, userId);
    if (!isAuthor) {
      res.status(403).json({ message: 'Only the author can delete this story.' });
      return;
    }

    await deleteStory(storyId);
    res.json({ message: 'Story deleted successfully.' });
  } catch (error) {
    console.error('Delete story error:', error);
    res.status(500).json({ message: 'An error occurred while deleting the story.' });
  }
};
