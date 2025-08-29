# TODO: Modify Delete Podcast Functionality to Use Name Instead of ID

## Steps to Complete:

1. [x] Update `src/repositories/podcasts-repositories.ts`:
   - Add `repositoryDeletePodcastByName` function to delete by name
   - Keep existing `repositoryDeletePodcast` for backward compatibility if needed

2. [x] Update `src/services/delete-podcast-service.ts`:
   - Change parameter from `podcastId` to `podcastName`
   - Update validation messages to reference name
   - Call new repository function for name-based deletion

3. [x] Update `src/controllers/delete-podcast-controller.ts`:
   - Change URL parsing to extract podcast name instead of ID
   - Update error messages to reference name instead of ID
   - Add URL decoding for podcast names with special characters

4. [x] Update `README.md`:
   - Update documentation to reflect name-based deletion instead of ID-based

5. [ ] Test the functionality:
   - Verify deletion works with podcast names
   - Test error handling for non-existent names
   - Check URL encoding/decoding

## Completed:
- [x] Plan created and approved
- [x] Repository function `repositoryDeletePodcastByName` added
- [x] Service updated to use podcast name instead of ID
- [x] Controller updated to extract and decode podcast name from URL
- [x] README documentation updated
