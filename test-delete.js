import { repositoryDeletePodcastByName } from './src/repositories/podcasts-repositories.js';

// Test the delete function directly
async function testDelete() {
  try {
    console.log('Testing delete podcast by name...');
    const result = await repositoryDeletePodcastByName('flow');
    console.log('Delete result:', result);
    
    if (result) {
      console.log('Podcast "flow" was successfully deleted');
    } else {
      console.log('Podcast "flow" was not found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testDelete();
