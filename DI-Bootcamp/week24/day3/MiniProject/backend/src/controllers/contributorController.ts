import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import {
  getContributorsByStory,
  addContributor,
  removeContributor,
  getContributorById
} from '../models/contributorModel';
import { getStoryById, isUserAuthor } from '../models/storyModel';
import { findUserById } from '../models/userModel';

export const getContributors = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { story_id } = req.params;
    const storyId = parseInt(story_id, 10);

    if (isNaN(storyId)) {
      res.status(400).json({ message: 'Invalid story ID.' });
      return;
    }

    // Check if story exists
    const story = await getStoryById(storyId);
    if (!story) {
      res.status(404).json({ message: 'Story not found.' });
      return;
    }

    const contributors = await getContributorsByStory(storyId);
    res.json(contributors);
  } catch (error) {
    console.error('Get contributors error:', error);
    res.status(500).json({ message: 'An error occurred while fetching contributors.' });
  }
};

export const addNewContributor = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { story_id, user_id } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Authentication required.' });
      return;
    }

    if (!story_id || !user_id) {
      res.status(400).json({ message: 'Story ID and user ID are required.' });
      return;
    }

    const storyId = parseInt(story_id, 10);
    const contributorUserId = parseInt(user_id, 10);

    if (isNaN(storyId) || isNaN(contributorUserId)) {
      res.status(400).json({ message: 'Invalid story ID or user ID.' });
      return;
    }

    // Check if story exists
    const story = await getStoryById(storyId);
    if (!story) {
      res.status(404).json({ message: 'Story not found.' });
      return;
    }

    // Check if user is the author
    const isAuthor = await isUserAuthor(storyId, userId);
    if (!isAuthor) {
      res.status(403).json({ message: 'Only the author can add contributors.' });
      return;
    }

    // Check if the user to be added exists
    const userToAdd = await findUserById(contributorUserId);
    if (!userToAdd) {
      res.status(404).json({ message: 'User to add not found.' });
      return;
    }

    // Cannot add author as contributor
    if (contributorUserId === story.author_id) {
      res.status(400).json({ message: 'Author is already a collaborator.' });
      return;
    }

    const contributor = await addContributor(storyId, contributorUserId);
    if (!contributor) {
      res.status(409).json({ message: 'User is already a contributor.' });
      return;
    }

    res.status(201).json({
      ...contributor,
      user: userToAdd
    });
  } catch (error) {
    console.error('Add contributor error:', error);
    res.status(500).json({ message: 'An error occurred while adding contributor.' });
  }
};

export const removeExistingContributor = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const contributorId = parseInt(id, 10);

    if (isNaN(contributorId)) {
      res.status(400).json({ message: 'Invalid contributor ID.' });
      return;
    }

    if (!userId) {
      res.status(401).json({ message: 'Authentication required.' });
      return;
    }

    // Get contributor to find story_id
    const contributor = await getContributorById(contributorId);
    if (!contributor) {
      res.status(404).json({ message: 'Contributor not found.' });
      return;
    }

    // Check if user is the author
    const isAuthor = await isUserAuthor(contributor.story_id, userId);
    if (!isAuthor) {
      res.status(403).json({ message: 'Only the author can remove contributors.' });
      return;
    }

    await removeContributor(contributorId);
    res.json({ message: 'Contributor removed successfully.' });
  } catch (error) {
    console.error('Remove contributor error:', error);
    res.status(500).json({ message: 'An error occurred while removing contributor.' });
  }
};
