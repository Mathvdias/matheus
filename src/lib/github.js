// lib/github.js

import axios from 'axios';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const transformGitHubAssetUrl = (url) => {
  const match = url.match(/https:\/\/github\.com\/Mathvdias\/([^\/]+)\/assets\/(\d+)\/(\S+\.(?:png|jpg|jpeg|gif|mp4|webm|mov))/);
  if (match) {
    const userId = match[2];
    const assetId = match[3];
    return `https://github-production-user-asset-6210df.s3.amazonaws.com/${userId}/${assetId}`;
  }
  return url;
};

export const getGitHubRepos = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
      params: {
        per_page: 40,  
      },
    });
    const repos = response.data;

    const reposWithMedia = await Promise.all(repos.map(async (repo) => {
      try {
        const readmeResponse = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/readme`, {
          headers: {
            Accept: 'application/vnd.github.v3.raw',
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });
        const readmeContent = readmeResponse.data;

        console.log(`README content for ${repo.name}:\n`, readmeContent);

        const lines = readmeContent.split('\n');
        let firstImage = null;
        let firstVideo = null;

        for (const line of lines) {
          const imageMatch = line.match(/https:\/\/(?:user-images|private-user-images|github-production-user-asset-6210df).githubusercontent.com\/\S+\.(?:png|jpg|jpeg|gif)(\?[^ )]*)?/);
          const imgTagMatch = line.match(/<img\s+[^>]*src="(https:\/\/github\.com\/[^\/]+\/[^\/]+\/assets\/\S+\.(?:png|jpg|jpeg|gif))"[^>]*>/);
          const genericAssetMatch = line.match(/https:\/\/github\.com\/[^\/]+\/[^\/]+\/assets\/\S+\.(?:png|jpg|jpeg|gif|mp4|webm|mov)/);
          if (imageMatch && !firstImage) {
            firstImage = imageMatch[0];
          }
          if (imgTagMatch && !firstImage) {
            firstImage = transformGitHubAssetUrl(imgTagMatch[1]);
          }
          if (genericAssetMatch && !firstImage && !firstVideo) {
            const transformedUrl = transformGitHubAssetUrl(genericAssetMatch[0]);
            if (genericAssetMatch[0].match(/\.(mp4|webm|mov)$/)) {
              firstVideo = transformedUrl;
            } else {
              firstImage = transformedUrl;
            }
          }
          const videoMatch = line.match(/https:\/\/(?:user-images|private-user-images|github-production-user-asset-6210df).githubusercontent.com\/\S+\.(?:mp4|webm|mov)(\?[^ )]*)?/);
          const videoTagMatch = line.match(/<video\s+[^>]*src="(https:\/\/github\.com\/[^\/]+\/[^\/]+\/assets\/\S+\.(?:mp4|webm|mov))"[^>]*>/);
          if (videoMatch && !firstVideo) {
            firstVideo = videoMatch[0];
          }
          if (videoTagMatch && !firstVideo) {
            firstVideo = transformGitHubAssetUrl(videoTagMatch[1]);
          }
          if (firstImage && firstVideo) break;
        }

        console.log(`First media found for ${repo.name}: Image - ${firstImage}, Video - ${firstVideo}`);

        return { ...repo, readmeImage: firstImage, readmeVideo: firstVideo };
      } catch (error) {
        console.error(`Erro ao buscar README para o repositório ${repo.name}:`, error);
        return { ...repo, readmeImage: null, readmeVideo: null };
      }
    }));

    return reposWithMedia;
  } catch (error) {
    console.error('Erro ao buscar repositórios do GitHub:', error);
    return [];
  }
};
