import config, * as stories from './sbb-toggle-option.stories';
import { chromaticStoryConfig, combineStories } from '../../global/helpers/chromatic';

export const chromaticStories = combineStories(config, stories);

export default chromaticStoryConfig(config);